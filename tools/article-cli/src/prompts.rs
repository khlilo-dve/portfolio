use crate::cli::{Kind, NewArgs};
use crate::clock::{ArticleDate, Clock};
use anyhow::{anyhow, bail, Result};
use chrono::NaiveDate;
use dialoguer::{Confirm, Input, Select};
use regex::Regex;

pub struct ArticleSpec {
    pub kind: Kind,
    pub slug: String,
    pub title: String,
    pub summary: String,
    pub tags: Vec<String>, // only populated for Node
    pub date: ArticleDate,
    pub bilingual: Option<BilingualExtras>,
    pub dry_run: bool,
}

pub struct BilingualExtras {
    pub title: String,
    pub summary: String,
}

pub fn collect(args: NewArgs, clock: &Clock) -> Result<ArticleSpec> {
    let kind = match args.kind {
        Some(k) => k,
        None => {
            let idx = Select::new()
                .with_prompt("文章类型")
                .items(&["Signal (认知沉淀)", "Node (技术笔记)"])
                .default(0)
                .interact()?;
            if idx == 0 { Kind::Signal } else { Kind::Node }
        }
    };

    let slug = match args.slug {
        Some(s) => s,
        None => Input::<String>::new()
            .with_prompt("slug (英文小写，短横线分隔)")
            .interact_text()?,
    };
    validate_slug(&slug)?;

    let title = match args.title {
        Some(t) => t,
        None => Input::<String>::new()
            .with_prompt("中文标题")
            .interact_text()?,
    };

    let summary: String = Input::new()
        .with_prompt("一句话摘要")
        .interact_text()?;

    let tags: Vec<String> = if matches!(kind, Kind::Node) {
        let raw: String = Input::new()
            .with_prompt("tags（逗号分隔，可留空）")
            .allow_empty(true)
            .interact_text()?;
        raw.split(',')
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .collect()
    } else {
        vec![]
    };

    // Default is derived from the single Clock instance captured at program
    // start - never re-read from the OS here.
    let default_today = clock.today().format("%Y-%m-%d").to_string();
    let raw_date: String = Input::new()
        .with_prompt("日期 YYYY-MM-DD")
        .default(default_today)
        .interact_text()?;
    let parsed = NaiveDate::parse_from_str(raw_date.trim(), "%Y-%m-%d")
        .map_err(|_| anyhow!("日期格式必须为 YYYY-MM-DD"))?;
    let date = ArticleDate::new(parsed);

    let bilingual = if Confirm::new()
        .with_prompt("同时创建英文版?")
        .default(false)
        .interact()?
    {
        let en_title: String = Input::new()
            .with_prompt("English title")
            .interact_text()?;
        let en_summary: String = Input::new()
            .with_prompt("English summary")
            .interact_text()?;
        Some(BilingualExtras {
            title: en_title,
            summary: en_summary,
        })
    } else {
        None
    };

    Ok(ArticleSpec {
        kind,
        slug,
        title,
        summary,
        tags,
        date,
        bilingual,
        dry_run: args.dry_run,
    })
}

fn validate_slug(s: &str) -> Result<()> {
    let re = Regex::new(r"^[a-z0-9][a-z0-9-]*$").unwrap();
    if !re.is_match(s) {
        bail!("slug 非法：必须以小写字母/数字开头，只允许小写字母、数字和短横线");
    }
    Ok(())
}
