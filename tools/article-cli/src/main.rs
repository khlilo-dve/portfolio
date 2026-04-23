mod cli;
mod clock;
mod config;
mod indexer;
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
    // All date formatting downstream (frontmatter, index line, default
    // prompt values) is derived from this one instance.
    let clock = Clock::capture();

    let cli = Cli::parse();
    match cli.command {
        Command::New(args) => run_new(args, &clock),
    }
}

fn run_new(args: NewArgs, clock: &Clock) -> Result<()> {
    let cfg = ProjectPaths::discover()?;
    let spec = prompts::collect(args, clock)?;

    // 1) Write MDX files first. If this fails, the index is still pristine.
    let written = mdx::write_files(&cfg, &spec)?;

    // 2) Inject index. If this fails we still have the MDX files; surface
    //    the literal so the user can paste manually.
    match indexer::inject(&cfg, &spec) {
        Ok(outcome) => {
            let verb = if outcome.wrote { "已注入" } else { "预览" };
            println!("{} {} ({})", "✓".green(), verb, outcome.path.display());
        }
        Err(e) => {
            eprintln!("{} 索引注入失败: {}", "⚠".yellow(), e);
            eprintln!("请手动在对应 page.tsx 数组最前面添加以下字面量：");
            eprintln!("  {},", indexer::literal_for(&spec));
        }
    }

    for p in &written {
        println!("{} 写入 {}", "✓".green(), p.display());
    }

    if spec.dry_run {
        println!("{} dry-run 模式，磁盘未变化", "ℹ".blue());
    } else {
        println!(
            "\n{} npm run dev 预览，确认无误后再 git commit & push",
            "→".cyan()
        );
    }

    Ok(())
}
