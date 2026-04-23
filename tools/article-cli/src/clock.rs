use chrono::{Local, NaiveDate};

/// Captured once at program start. All downstream date derivations MUST
/// obtain their "today" from this instance.
pub struct Clock {
    today: NaiveDate,
}

impl Clock {
    pub fn capture() -> Self {
        Self {
            today: Local::now().date_naive(),
        }
    }

    pub fn today(&self) -> NaiveDate {
        self.today
    }
}

/// Wraps the chosen article date and exposes the two formats the
/// blog uses: frontmatter (YYYY-MM-DD) and index listing (YYYY.MM.DD).
pub struct ArticleDate(NaiveDate);

impl ArticleDate {
    pub fn new(date: NaiveDate) -> Self {
        Self(date)
    }

    pub fn frontmatter(&self) -> String {
        self.0.format("%Y-%m-%d").to_string()
    }

    pub fn index(&self) -> String {
        self.0.format("%Y.%m.%d").to_string()
    }
}
