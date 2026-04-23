use clap::{Args, Parser, Subcommand, ValueEnum};

#[derive(Parser)]
#[command(name = "article-cli", version, about = "khlilo blog article scaffolding")]
pub struct Cli {
    #[command(subcommand)]
    pub command: Command,
}

#[derive(Subcommand)]
pub enum Command {
    /// Scaffold a new article (MDX + index registration)
    New(NewArgs),
}

#[derive(Args, Default, Clone)]
pub struct NewArgs {
    /// Chinese title
    pub title: Option<String>,

    /// Article kind
    #[arg(short = 't', long = "type", value_enum)]
    pub kind: Option<Kind>,

    /// Slug (lowercase kebab-case)
    #[arg(short = 's', long)]
    pub slug: Option<String>,

    /// Preview without touching files
    #[arg(long)]
    pub dry_run: bool,
}

#[derive(Clone, Copy, ValueEnum, Debug)]
pub enum Kind {
    Signal,
    Node,
}
