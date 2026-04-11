# KSCMerror 作品集网站 - 交接文档

## 📁 文件位置
`F:\portfolio\`

---

## 🌐 网站结构

```
portfolio/
├── index.html              # 首页
├── dynamic.html            # 动态作品页（视频）
├── static.html             # 静态作品页（摄影系列）
├── css/
│   ├── style.css           # 首页样式
│   ├── subpage.css         # 子页面通用样式
│   └── static.css          # 静态页专用样式
├── js/
│   ├── main.js             # 首页脚本
│   ├── subpage.js          # 子页面通用脚本
│   └── static.js           # 静态页专用脚本
├── images/                 # 图片资源
│   └── logo.png            # 网站Logo
└── video/
    └── showreel-placeholder.mp4  # 首页背景视频
```

---

## 🚀 部署到 Gitee Pages

### 步骤 1：创建 Gitee 仓库
1. 登录 [gitee.com](https://gitee.com)
2. 点击右上角「+」→ 新建仓库
3. 仓库名称：`kscmerror-portfolio`（或你的用户名）
4. 选择「公开」
5. **不要**勾选「初始化仓库」
6. 点击「创建」

### 步骤 2：初始化 Git 并推送
在 `F:\portfolio\` 文件夹地址栏输入 `cmd` 回车，执行：

```bash
git init
git add .
git commit -m "Initial commit: portfolio website"
git remote add origin https://gitee.com/你的用户名/仓库名.git
git push -u origin master
```

### 步骤 3：开启 Gitee Pages
1. 进入仓库页面
2. 点击「服务」→「Gitee Pages」
3. 部署目录选择 `/`（根目录）
4. 点击「启动」
5. 等待几分钟，访问生成的链接

---

## 📝 后续修改指南

### 1. 首页视频更换
文件：`index.html` 第 28 行
```html
<source src="video/showreel-placeholder.mp4" type="video/mp4">
```
替换为新的视频文件名，或直接替换 `video/` 文件夹内的文件。

### 2. 动态作品页添加视频
文件：`dynamic.html`

在 `<div class="video-grid">` 内添加：
```html
<div class="video-card" data-video="阿里云视频链接" data-title="作品标题">
    <div class="video-thumbnail">
        <img src="images/视频封面.jpg" alt="作品标题">
        <div class="play-overlay">
            <div class="play-icon">▶</div>
        </div>
    </div>
    <div class="video-info">
        <h3 class="video-title">作品标题</h3>
        <p class="video-meta">剪辑 · 2024</p>
    </div>
</div>
```

### 3. 静态作品页添加系列
文件：`static.html` + `js/static.js`

**HTML 部分**：在 `<div class="series-grid">` 内添加
```html
<div class="series-card" data-series="系列ID" data-category="分类">
    <div class="series-cover">
        <img src="images/系列封面.jpg" alt="系列名称">
    </div>
    <div class="series-info">
        <h3 class="series-title">系列名称</h3>
        <p class="series-count">8 张</p>
    </div>
</div>
```

**JS 部分**：在 `static.js` 的 `seriesData` 对象中添加
```javascript
'seriesID': {
    title: '系列名称',
    desc: '系列描述',
    images: [
        'images/series/seriesID/01.jpg',
        'images/series/seriesID/02.jpg',
        // ...更多图片
    ]
}
```

### 4. 修改配色
文件：`css/style.css` 第 4-9 行
```css
:root {
    --cyan: #00FFD0;        /* 青绿色 */
    --magenta: #FF00A0;     /* 品红色 */
    --black: #0a0a0a;       /* 背景黑 */
    --white: #ffffff;
    --dark-gray: #1a1a1a;
}
```

---

## ☁️ 视频托管方案

### 推荐：阿里云 OSS
1. 登录 [阿里云控制台](https://oss.console.aliyun.com)
2. 创建 Bucket（地域选国内，权限「公共读」）
3. 上传视频文件
4. 获取视频 URL：`https://bucket-name.oss-cn-region.aliyuncs.com/video.mp4`
5. 将 URL 填入 `dynamic.html` 的 `data-video` 属性

### 费用参考
- 存储：约 0.12元/GB/月
- 流量：约 0.24元/GB
- 40GB 存储 + 100GB 流量 ≈ 30元/月

---

## 📱 响应式断点

| 设备 | 宽度 | 布局 |
|------|------|------|
| 桌面 | >1024px | 4列网格 |
| 平板 | 768-1024px | 3列网格 |
| 手机 | <768px | 2列 → 1列 |

---

## 🔧 常见问题

**Q：视频在 Gitee Pages 上播放不了？**
A：Gitee Pages 限制单文件 50MB，建议视频托管到阿里云 OSS。

**Q：如何更新网站？**
A：修改文件后执行：
```bash
git add .
git commit -m "更新描述"
git push
```
然后到 Gitee Pages 服务页面点击「更新」。

**Q：Logo 怎么换？**
A：替换 `images/logo.png` 文件，保持相同文件名。

---

## 📂 素材准备清单

- [ ] 首页背景视频（建议 <20MB 或放阿里云）
- [ ] Logo 图片（PNG，透明背景）
- [ ] 动态作品：视频文件 + 封面图（16:9）
- [ ] 静态作品：系列封面 + 系列内图片

---

**创建日期**：2026-04-11  
**版本**：v1.0
