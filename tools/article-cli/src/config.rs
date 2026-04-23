use anyhow::{bail, Result};
use std::path::{Path, PathBuf};

pub struct ProjectPaths {
    pub root: PathBuf,
}

impl ProjectPaths {
    /// Walk up from CWD until we find the my-website root
    /// (identified by `content/signal/` and `app/signal/page.tsx`).
    pub fn discover() -> Result<Self> {
        let start = std::env::current_dir()?;
        let mut cur: Option<&Path> = Some(start.as_path());
        while let Some(p) = cur {
            if p.join("content/signal").is_dir() && p.join("app/signal/page.tsx").is_file() {
                return Ok(Self {
                    root: p.to_path_buf(),
                });
            }
            cur = p.parent();
        }
        bail!(
            "未能在 {} 或其上层找到 my-website 工程根 (需含 content/signal/ 与 app/signal/page.tsx)",
            start.display()
        );
    }

    pub fn signal_content_dir(&self) -> PathBuf {
        self.root.join("content/signal")
    }
    pub fn node_content_dir(&self) -> PathBuf {
        self.root.join("content/node")
    }
    pub fn signal_index(&self) -> PathBuf {
        self.root.join("app/signal/page.tsx")
    }
    pub fn node_index(&self) -> PathBuf {
        self.root.join("app/node/page.tsx")
    }
}
