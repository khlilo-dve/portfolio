mod cli;
mod clock;
mod config;
mod mdx;
mod prompts;

use anyhow::Result;
use clap::Parser;
use cli::{Cli, Command, NewArgs};
use clock::Clock;
use colored::Colorize;
use config::ProjectPaths;

fn main() -> Result<()> {
    // Single authoritative timestamp for the entire command lifecycle.
    // All date formatting downstream (frontmatter, default prompt values)
    // is derived from this one instance.
    let clock = Clock::capture();

    let cli = Cli::parse();
    match cli.command {
        Command::New(args) => run_new(args, &clock),
    }
}

fn run_new(args: NewArgs, clock: &Clock) -> Result<()> {
    let cfg = ProjectPaths::discover()?;
    let spec = prompts::collect(args, clock)?;

    let written = mdx::write_files(&cfg, &spec)?;

    for p in &written {
        println!("{} 写入 {}", "✓".green(), p.display());
    }

    if spec.dry_run {
        println!("{} dry-run 模式，磁盘未变化", "ℹ".blue());
    } else {
        println!(
            "\n{} 部署时无需手动索引 — getAllArticles() 从文件系统动态读取",
            "ℹ".cyan()
        );
        println!(
            "{} git commit && git push 后 Vercel 自动部署",
            "→".cyan()
        );
    }

    Ok(())
}
