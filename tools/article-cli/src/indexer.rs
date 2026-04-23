use crate::cli::Kind;
use crate::config::ProjectPaths;
use crate::prompts::ArticleSpec;
use anyhow::{anyhow, Result};
use regex::Regex;
use std::path::PathBuf;

pub struct InjectionOutcome {
    pub path: PathBuf,
    pub wrote: bool,
}

pub fn inject(cfg: &ProjectPaths, spec: &ArticleSpec) -> Result<InjectionOutcome> {
    let path = match spec.kind {
        Kind::Signal => cfg.signal_index(),
        Kind::Node => cfg.node_index(),
    };
    let src = std::fs::read_to_string(&path)?;

    let anchor = match spec.kind {
        Kind::Signal => Regex::new(r"const\s+articles\s*:[^=]*=\s*\[").unwrap(),
        Kind::Node => Regex::new(r"const\s+notes\s*:[^=]*=\s*\[").unwrap(),
    };

    let m = anchor
        .find(&src)
        .ok_or_else(|| anyhow!("未能在 {} 中找到索引数组锚点", path.display()))?;

    let literal = literal_for(spec);
    let insert_at = m.end();

    let mut new_src = String::with_capacity(src.len() + literal.len() + 8);
    new_src.push_str(&src[..insert_at]);
    new_src.push_str("\n  ");
    new_src.push_str(&literal);
    new_src.push(',');
    new_src.push_str(&src[insert_at..]);

    if spec.dry_run {
        println!(
            "--- dry-run: 索引注入预览 ({}) ---",
            path.display()
        );
        // Print only the anchor + 400 chars around it to stay readable.
        let start = insert_at.saturating_sub(80);
        let end = (insert_at + literal.len() + 80).min(new_src.len());
        println!("...\n{}\n...", &new_src[start..end]);
        Ok(InjectionOutcome { path, wrote: false })
    } else {
        std::fs::write(&path, new_src)?;
        Ok(InjectionOutcome { path, wrote: true })
    }
}

pub fn literal_for(spec: &ArticleSpec) -> String {
    match spec.kind {
        Kind::Signal => format!(
            "{{ slug: \"{}\", date: \"{}\", title: \"{}\" }}",
            spec.slug,
            spec.date.index(),
            escape(&spec.title)
        ),
        Kind::Node => {
            let tags = spec
                .tags
                .iter()
                .map(|t| format!("\"{}\"", escape(t)))
                .collect::<Vec<_>>()
                .join(", ");
            format!(
                "{{ slug: \"{}\", title: \"{}\", tags: [{}], date: \"{}\", preview: \"{}\" }}",
                spec.slug,
                escape(&spec.title),
                tags,
                spec.date.index(),
                escape(&spec.summary),
            )
        }
    }
}

fn escape(s: &str) -> String {
    s.replace('\\', "\\\\").replace('"', "\\\"")
}

#[cfg(test)]
mod tests {
    use super::*;

    const SIGNAL_FIXTURE: &str = r#"const articles: { slug: string; date: string; title: string }[] = [
  { slug: "stop-learning-start-building", date: "2026.04.16", title: "..." },
];"#;

    const NODE_FIXTURE: &str = r#"const notes: {
  slug: string;
  title: string;
  tags: string[];
  date: string;
  preview: string;
}[] = [
  // empty
];"#;

    #[test]
    fn signal_anchor_hits_real_shape() {
        let re = Regex::new(r"const\s+articles\s*:[^=]*=\s*\[").unwrap();
        let m = re.find(SIGNAL_FIXTURE).expect("signal anchor must match");
        assert_eq!(&SIGNAL_FIXTURE[m.end()..m.end() + 1], "\n");
    }

    #[test]
    fn node_anchor_hits_multiline_shape() {
        let re = Regex::new(r"const\s+notes\s*:[^=]*=\s*\[").unwrap();
        let m = re.find(NODE_FIXTURE).expect("node anchor must match across newlines");
        assert!(&NODE_FIXTURE[m.end()..].starts_with("\n"));
    }
}

