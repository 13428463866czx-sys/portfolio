# KSCMerror 作品集网站

> 赛博朋克风格的视觉设计师个人作品集 — Cyberpunk Portfolio for Motion Designer

---

## 🌐 网站预览

**技术栈：** 纯 HTML / CSS / JavaScript（无框架）

**页面结构：**

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | `index.html` | Hero 背景视频 + 视觉风格弹窗 + 作品轮播 + 关于我卡片 |
| 动态作品 | `dynamic.html` | 17 个视频作品（分类筛选 + 弹窗播放） |
| 静态作品 | `static.html` | 16 个摄影/设计系列（瀑布流 + Lightbox） |
| 关于 | `about.html` | 个人介绍 + Rina AI 项目展示 |

```
portfolio/
├── index.html              # 首页
├── dynamic.html            # 动态作品页
├── static.html             # 静态作品页
├── about.html              # 关于页
├── css/
│   ├── style.css           # 全局 + 首页样式（含响应式）
│   ├── subpage.css         # 子页面通用样式
│   ├── about.css           # 关于页专用样式
│   └── static.css          # 静态页专用样式
├── js/
│   ├── main.js             # 首页脚本（轮播、弹窗、导航）
│   ├── subpage.js          # 子页面通用脚本
│   └── static.js           # 静态页脚本（系列数据）
├── images/                 # 图片资源（WebP 格式优化）
│   ├── video-cover-*.webp  # 17 张视频封面（已转 WebP）
│   ├── logo.png            # 网站 Logo
│   └── zcool/              # 站酷封面图
└── video/
    └── bg-showreel-audio.mp4  # 首页背景+弹窗视频 (28MB, 1080p, 含音频)
```

---

## 🚀 部署方式

### 当前部署：Cloudflare Pages（推荐）

**为什么选 Cloudflare Pages：**
- ✅ 国内可访问（有国内节点）
- ✅ 完全免费，无限带宽
- ✅ 自定义域名 + 自动 HTTPS
- ✅ 连接 Git 仓库，push 即自动部署
- ⚠️ 单文件限制 25MB（背景视频已压缩至 28MB，需确认或进一步压缩）

### 备选方案

| 平台 | 国内速度 | 免费额度 | 备注 |
|------|---------|---------|------|
| Cloudflare Pages | ✅ 快 | 无限带宽 | **当前使用** |
| Vercel | ⚠️ 慢 | 100GB/月 | 体验最好 |
| Netlify | ⚠️ 慢 | 100GB/月 | 功能丰富 |
| GitHub Pages | ⚠️ 慢 | 100GB/月 | 简单稳定 |

> Gitee Pages 已停止服务（2026年起），不再使用。

---

## 🎬 视频方案

### 首页背景视频
- 文件：`video/bg-showreel-audio.mp4`
- 大小：**28 MB**（原版 52.9MB → CRF24 压缩 -47%）
- 规格：1080p, H.264, AAC 音频保留
- 用途：首页背景循环播放 + "一分钟了解我的视觉风格"弹窗播放（有声音）

### 作品展示视频
- 托管在 **阿里云 OSS**（外链引用）
- Bucket：`kscmerror-showreel`
- 数量：17 个视频文件
- dynamic.html 和 index.html 轮播通过 `data-video` 属性引用 OSS URL

---

## 📱 响应式断点

| 设备 | 宽度 | 关键变化 |
|------|------|---------|
| 桌面 | >1024px | 完整布局，4 列网格 |
| 平板 | 768-1024px | 缩小间距，3 列网格 |
| 手机 | <768px | 纵向堆叠，2→1列，字体缩小 |
| 超小屏 | <480px | 进一步精简 |

---

## ⚡ 性能优化（已完成）

| 优化项 | 详情 | Commit |
|--------|------|--------|
| JS defer | 4 页面 script 加 defer，不阻塞渲染 | `ec201c8` |
| 图片懒加载 | 58 张非首屏图片加 `loading="lazy"` | `ec201c8` |
| GPU 合成 | will-change 覆盖所有核心动画元素 | `ec201c8` |
| WebP 转换 | 17 张 PNG → WebP (58MB → 1.57MB, -97.3%) | `b438d8c` |
| 视频压缩 | 背景视频 52.9MB → 28MB (-47%)，保留音频 | 待提交 |

---

## 📝 后续修改指南

### 更换首页背景视频
1. 将新视频放入 `video/` 目录
2. 修改 `index.html` 第 47 行：
```html
<source src="video/你的视频.mp4" type="video/mp4">
```
3. **建议用 FFmpeg 压缩**（保留音频）：
```bash
ffmpeg -i 原始.mp4 -c:v libx264 -crf 24 -preset slow -c:a aac -b:a 128k 输出.mp4
```

### 添加动态作品
编辑 `dynamic.html`，在 `<div class="video-grid">` 内添加：
```html
<div class="video-card" data-category="分类" data-video="OSS链接" data-title="标题" data-desc="描述" data-duration="00:30">
    <img src="images/video-cover-封面.webp" alt="标题">
</div>
```
同时上传视频到阿里云 OSS，封面图转 WebP 放入 `images/`。

### 添加静态作品系列
- HTML：`static.html` 的 `.series-grid` 内添加 series-card
- JS：`js/static.js` 的 `seriesData` 对象中添加图片数组

---

## 🔧 本地开发

```bash
# 直接浏览器打开
# 或用 VS Code Live Server 插件（推荐，支持 hot reload）
```

**更新网站流程：**
```bash
git add .
git commit -m "更新描述"
git push
# Cloudflare Pages 会自动构建部署
```

---

## 📅 更新日志

### v2.0 (2026-04-14)
- 移动端全站响应式适配
- 性能优化：JS defer、懒加载、GPU合成、WebP转换、视频压缩
- 视频封面 PNG → WebP（体积缩减 97%）
- 背景视频压缩并保留弹窗音频

### v1.2 (2026-04-12)
- 首页"关于我+莉娜"卡片区域缝合优化
- 统一各页面视觉风格一致性

### v1.1 (2026-04-11~12)
- 首页视频轮播功能
- 静态作品瀑布流布局
- 导航栏简化为"动态/静态/关于"
- 16 个静态作品系列

### v1.0 (2026-04-10)
- 初始版本上线
- 赛博朋克视觉风格基础框架
