## 1. 架构设计

纯前端单页应用，无需后端服务，可直接部署于任何静态托管平台。

```mermaid
flowchart TD
    "浏览器" --> "静态资源 (HTML/CSS/JS)"
    "静态资源 (HTML/CSS/JS)" --> "CDN / 静态托管"
```

- 前端：HTML5 + CSS3 + Vanilla JavaScript（纯静态）
- 部署：可直接通过 GitHub Pages / Vercel / Netlify 部署

## 2. 技术选型

| 层次 | 技术 | 说明 |
|------|------|------|
| 结构 | HTML5 | 语义化标签 |
| 样式 | CSS3 | 自定义属性 + Flexbox/Grid + 动画 |
| 交互 | Vanilla JavaScript (ES6+) | 滚动动画、导航交互、特效 |
| 图标 | Font Awesome 6 | 社交/联系方式图标 |
| 字体 | Google Fonts | 衬线字体 (展示) + 无衬线字体 (正文) |

## 3. 路由设计

单页应用，使用锚点导航实现页面内滚动定位。

| 锚点 | 对应模块 | 说明 |
|------|---------|------|
| `#hero` | Hero 首屏 | 默认初始位置 |
| `#about` | 关于我 | 个人简介与统计 |
| `#experience` | 工作经历 | 时间线展示 |
| `#projects` | 实战经验 | 项目卡片网格 |
| `#skills` | 技能专长 | 分类技能展示 |
| `#contact` | 联系我 | 联系方式 |

## 4. 项目结构

```
/
├── index.html              # 主页面
├── styles/
│   └── main.css            # 全局样式（Apple 风格）
├── scripts/
│   ├── main.js             # 交互逻辑
│   └── mouse-effect.js     # 鼠标粒子特效
├── assets/
│   ├── hero-bg.png         # Hero 背景图
│   ├── project-ecommerce.png
│   ├── project-douyin.png
│   ├── project-pcb.png
│   └── project-support.png
└── .trae/documents/
    ├── PRD.md
    └── technical-architecture.md
```

## 5. 数据模型

纯展示型网站，无需数据库。所有内容数据直接写在 HTML 模板中。

## 6. 样式架构

使用 CSS 自定义属性管理设计 Token，全局统一：

| Token | 值 | 用途 |
|-------|----|------|
| `--color-bg` | `#000000` | 页面背景 |
| `--color-bg-secondary` | `#1d1d1f` | 区块分隔背景 |
| `--color-text` | `#f5f5f7` | 主文字色 |
| `--color-text-secondary` | `#86868b` | 次要文字色 |
| `--color-accent` | `#d4a853` | 金色强调色 |
| `--font-display` | 衬线字体 | 大标题展示 |
| `--font-body` | 无衬线字体 | 正文内容 |
| `--nav-height` | `64px` | 导航栏高度 |
| `--section-padding` | `140px 0` | 区块间距 |

## 7. 性能优化

- 使用 CSS `will-change` 提示浏览器优化动画
- 图片使用 WebP 格式（如支持）
- 滚动事件使用 `passive` 监听器提升性能
- 动画使用 CSS `transform` 和 `opacity` 以触发 GPU 加速
