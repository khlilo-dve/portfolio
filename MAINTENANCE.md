# 个人网站运维手册

> 站点地址：https://khlilo.xyz

---

## 目录结构速查

```
my-website/
├── app/
│   ├── layout.tsx                  # 全局布局（网站标题、字体）
│   ├── page.tsx                    # 首页（引用 Hero 组件）
│   ├── components/
│   │   ├── header.tsx              # 导航栏（品牌名、路由、社交图标）
│   │   ├── footer.tsx              # 页脚（版权、社交图标、公众号弹窗）
│   │   ├── hero.tsx                # 首页宣言文案
│   │   ├── section-wrapper.tsx     # 通用页面容器
│   │   ├── article-layout.tsx      # 文章详情页布局（含双语支持）
│   │   ├── bilingual-body.tsx      # 双语切换交互组件
│   │   └── mdx-content.tsx         # MDX 渲染器
│   ├── signal/
│   │   ├── page.tsx                # Signal 文章列表页
│   │   └── [slug]/page.tsx         # Signal 文章详情页（动态路由）
│   ├── node/
│   │   ├── page.tsx                # Node 笔记列表页
│   │   └── [slug]/page.tsx         # Node 笔记详情页（动态路由）
│   ├── pow/page.tsx                # PoW 项目展示页
│   └── beacon/page.tsx             # Beacon 个人信标页
├── content/
│   ├── signal/                     # Signal 文章 MDX 文件
│   └── node/                       # Node 笔记 MDX 文件
├── public/
│   └── wechat-qrcode.png           # 微信公众号二维码
├── lib/
│   └── mdx.ts                      # MDX 解析工具库
└── tools/
    └── article-cli/                # Rust CLI：自动化创建新文章（见下文）
```

---

## 自动化工具：article-cli（推荐流程）

> 覆盖「二、发布 Signal」「三、发布 Node」「四、添加双语版本」里创建新文章的全部动作。只修改站点标题/链接等场景不需要它。

`tools/article-cli/` 是站点仓库自带的 Rust CLI，一条命令完成：

1. 生成 `content/<signal|node>/<slug>.mdx`，带标准 frontmatter
2. 可选生成 `<slug>.en.mdx` 英文版（共用日期/标签，标题与摘要独立）
3. 在 `app/<signal|node>/page.tsx` 的索引数组首位登记条目（列表日期自动转 `YYYY.MM.DD`）

### 首次构建

```bash
cd tools/article-cli
cargo build --release
# 产物：tools/article-cli/target/release/article-cli
```

### 交互模式

在工程任意目录下运行：

```bash
./tools/article-cli/target/release/article-cli new
```

按提示依次填写：文章类型（Signal/Node）→ slug → 中文标题 → 一句话摘要 → tags（仅 Node 会问）→ 日期（回车默认今天）→ 是否同时创建英文版。

### 快速模式（带参数）

```bash
./tools/article-cli/target/release/article-cli new -t signal -s my-new-article "我的文章标题"
```

| 参数 | 含义 |
|---|---|
| `-t, --type <signal\|node>` | 文章类型 |
| `-s, --slug <SLUG>` | slug，规则 `^[a-z0-9][a-z0-9-]*$` |
| `TITLE`（位置参数） | 中文标题 |
| `--dry-run` | 仅预览生成的 mdx 与索引注入效果，不落盘 |

未通过参数提供的字段会进入交互式补齐。

### 失败兜底

若因 `page.tsx` 结构被大幅改动而无法定位索引数组锚点，工具**不会触碰源文件**，会打印出应追加的字面量，手动粘贴到数组最前面即可。

### 工具不覆盖的场景

- 修改已有文章内容 → 直接编辑对应 `.mdx`
- 删除文章 → 参考「二、删除文章」手动清理
- 修改站点标题、品牌、邮箱、社交链接 → 参见下文「一、修改个人信息」

---

## 一、修改个人信息

### 网站标题（浏览器标签页）

文件：`app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "khlilo — Builder & Observer",  // ← 改这里
};
```

### 导航栏左上角品牌名

文件：`app/components/header.tsx`

```typescript
khlilo    // ← 搜索这个文字，改成你想要的
```

### 首页三行宣言

文件：`app/components/hero.tsx`

```typescript
const lines = [
  "第一行宣言。",   // ← 改成你的内容
  "第二行宣言。",
  "第三行宣言。",
];
```

### GitHub / X 链接

文件：`app/components/header.tsx` 和 `app/components/footer.tsx`

搜索 `github.com/khlilo-dve` 和 `x.com/khlilo_`，替换为你的地址。

### 邮箱

文件：`app/components/footer.tsx`

搜索 `ferkasybilla312@gmail.com`，替换。

### 版权名字

文件：`app/components/footer.tsx`

搜索 `khlilo`，替换。

### 更换公众号二维码

将新的二维码图片命名为 `wechat-qrcode.png`，覆盖 `public/wechat-qrcode.png`。

---

## 二、发布 Signal 认知文章

> 推荐：使用上方「article-cli 自动化工具」一键完成。以下为手动步骤 / 理解底层模板用。

### 步骤 1：创建 MDX 文件

在 `content/signal/` 下新建文件。文件名使用英文、数字和短横线，例如：

```
content/signal/my-new-article.mdx
```

文件内容格式：

```markdown
---
title: "你的文章标题"
date: "2026-03-08"
summary: "一句话摘要"
---

正文内容使用 Markdown 语法。

## 二级标题

- 列表项
- **加粗**
- `行内代码`

> 引用块

（代码块、表格、图片等 Markdown 语法均支持）
```

### 步骤 2：在列表页注册文章

打开 `app/signal/page.tsx`，在 `articles` 数组最前面添加一条：

```typescript
const articles = [
  { slug: "my-new-article", date: "2026.03.08", title: "你的文章标题" },
  // ... 已有文章
];
```

> **slug 必须与文件名一致**（不含 `.mdx` 后缀）。

### 删除文章

1. 从 `articles` 数组中删掉对应条目
2. 删除 `content/signal/` 下对应的 `.mdx` 文件（以及 `.en.mdx` 如果有）

---

## 三、发布 Node 技术笔记

> 推荐：使用上方「article-cli 自动化工具」一键完成。以下为手动步骤 / 理解底层模板用。

### 步骤 1：创建 MDX 文件

在 `content/node/` 下新建文件，例如 `content/node/my-tech-note.mdx`：

```markdown
---
title: "技术笔记标题"
date: "2026-03-08"
tags: ["Rust", "Systems"]
summary: "一句话摘要"
---

正文内容...
```

### 步骤 2：在列表页注册

打开 `app/node/page.tsx`，在 `notes` 数组最前面添加：

```typescript
{
  slug: "my-tech-note",
  title: "技术笔记标题",
  tags: ["Rust", "Systems"],
  date: "2026.03.08",
  preview: "前两行摘要文字……",
},
```

---

## 四、添加双语版本

> 推荐：使用 `article-cli` 创建新文章时，在交互式提问「同时创建英文版?」处选 y 即可自动生成 `.en.mdx` 骨架。以下说明为手动补英文版（给已有中文文章加英文版）时使用。

在同一目录创建 `.en.mdx` 后缀的文件，例如：

```
content/signal/my-new-article.mdx       ← 中文版（必须）
content/signal/my-new-article.en.mdx    ← 英文版（可选）
```

英文版文件格式：

```markdown
---
title: "English Title"
date: "2026-03-08"
summary: "One line summary"
---

English content here...
```

系统会自动检测英文版是否存在：
- **有** `.en.mdx` → 文章详情页右上角出现 `[ EN | ZH ]` 切换按钮
- **没有** → 不显示切换按钮，正常展示中文

无需修改任何代码，只需要添加文件。

---

## 五、添加 PoW 项目

打开 `app/pow/page.tsx`，在 `projects` 数组中添加：

```typescript
{
  name: "项目名称",
  description: "一句话描述",
  stack: ["Rust", "TypeScript"],
  github: "https://github.com/khlilo-dve/项目名",
  demo: "https://demo.example.com",   // 没有就写 null
},
```

---

## 六、填写 Beacon 个人信标

打开 `app/beacon/page.tsx`，填写 `beaconData` 对象：

```typescript
const beaconData = {
  currentStatus: {
    role: "你的角色定位",              // 如 "Independent Builder"
    focus: "你的专注领域",             // 如 "Systems Programming · ZK"
    location: "你的位置",              // 如 "Earth / Internet"
    availability: "当前状态",          // 如 "Open to collaborations"
  },
  techStack: {
    primary: ["Rust", "TypeScript"],   // 主力语言
    frameworks: ["Next.js", "Tokio"],  // 框架
    infrastructure: ["Linux", "Docker"], // 基建
    interests: ["ZK", "WASM"],         // 兴趣方向
  },
  principles: [
    "第一条运行原则",
    "第二条运行原则",
    // 可以添加任意多条
  ],
};
```

留空的字段不会显示。全部为空时页面显示 `>_ initializing beacon...`。

---

## 七、部署上线

每次修改完成后，在 `my-website` 目录执行：

```bash
git add .
git commit -m "简要描述改了什么"
git push
```

Vercel 会自动重新构建和部署，约 1-2 分钟后线上更新。

### 本地预览（推荐先预览再推送）

```bash
npm run dev
```

浏览器打开 `http://localhost:3000` 确认无误后再 `git push`。

---

## 八、常见问题

### 文章点进去 404

- 检查 `slug` 值是否与文件名完全一致（不含 `.mdx`）
- 文件名只能用英文字母、数字、短横线，不要用中文或特殊字符
- 确认 `.mdx` 文件存在于正确的目录（`content/signal/` 或 `content/node/`）

### 文件名规范

| 正确 | 错误 |
|---|---|
| `why-not-tutoring.mdx` | `我为什么不推荐家教？.mdx` |
| `rust-ownership.mdx` | `Rust 所有权.mdx` |
| `zk-intro.en.mdx` | `zk-intro-EN.mdx` |

### 页面样式异常

确保 `npm run dev` 没有报错。如有报错信息，根据提示修复后重新启动。

### 推送失败

如果 `git push` 提示需要认证，使用 GitHub Personal Access Token 作为密码：
https://github.com/settings/tokens/new （勾选 `repo` 权限）
