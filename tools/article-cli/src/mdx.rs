use crate::cli::Kind;
use crate::config::ProjectPaths;
use crate::prompts::{ArticleSpec, BilingualExtras};
use anyhow::{bail, Result};
use std::path::PathBuf;

pub fn write_files(cfg: &ProjectPaths, spec: &ArticleSpec) -> Result<Vec<PathBuf>> {
    let dir = match spec.kind {
        Kind::Signal => cfg.signal_content_dir(),
        Kind::Node => cfg.node_content_dir(),
    };
    std::fs::create_dir_all(&dir)?;

    let zh_path = dir.join(format!("{}.mdx", spec.slug));
    if zh_path.exists() {
        bail!("目标文件已存在: {}", zh_path.display());
    }
    let zh_content = render_zh(spec);

    let en_path_content = match &spec.bilingual {
        Some(extras) => {
            let p = dir.join(format!("{}.en.mdx", spec.slug));
            if p.exists() {
                bail!("目标文件已存在: {}", p.display());
            }
            Some((p, render_en(spec, extras)))
        }
        None => None,
    };

    let mut written = Vec::new();

    if spec.dry_run {
        println!("--- dry-run: {} ---\n{}", zh_path.display(), zh_content);
        if let Some((p, c)) = &en_path_content {
            println!("--- dry-run: {} ---\n{}", p.display(), c);
        }
    } else {
        std::fs::write(&zh_path, zh_content)?;
        written.push(zh_path);
        if let Some((p, c)) = en_path_content {
            std::fs::write(&p, c)?;
            written.push(p);
        }
    }

    Ok(written)
}

fn render_zh(spec: &ArticleSpec) -> String {
    render_frontmatter_body(spec, &spec.title, &spec.summary, "<!-- 在这里开始正文 -->")
}

fn render_en(spec: &ArticleSpec, extras: &BilingualExtras) -> String {
    render_frontmatter_body(
        spec,
        &extras.title,
        &extras.summary,
        "<!-- English body starts here -->",
    )
}

fn render_frontmatter_body(spec: &ArticleSpec, title: &str, summary: &str, body: &str) -> String {
    let mut s = String::new();
    s.push_str("---\n");
    s.push_str(&format!("title: \"{}\"\n", escape(title)));
    s.push_str(&format!("date: \"{}\"\n", spec.date.frontmatter()));
    if matches!(spec.kind, Kind::Node) {
        let tags = spec
            .tags
            .iter()
            .map(|t| format!("\"{}\"", escape(t)))
            .collect::<Vec<_>>()
            .join(", ");
        s.push_str(&format!("tags: [{}]\n", tags));
    }
    s.push_str(&format!("summary: \"{}\"\n", escape(summary)));
    s.push_str("---\n\n");
    s.push_str(body);
    s.push('\n');
    s
}

fn escape(s: &str) -> String {
    s.replace('\\', "\\\\").replace('"', "\\\"")
}
