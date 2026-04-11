// 导航栏滚动效果
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 视频缩略图切换功能
    initVideoSwitcher();
});

// 视频切换功能
function initVideoSwitcher() {
    const mainVideo = document.getElementById('mainVideo');
    const videoTitle = document.getElementById('videoTitle');
    const videoDesc = document.getElementById('videoDesc');
    const thumbnailItems = document.querySelectorAll('.thumbnail-item');

    if (!mainVideo || thumbnailItems.length === 0) return;

    thumbnailItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有active状态
            thumbnailItems.forEach(t => t.classList.remove('active'));
            // 添加当前active状态
            this.classList.add('active');

            // 获取视频信息
            const videoUrl = this.dataset.video;
            const title = this.dataset.title;
            const desc = this.dataset.desc;
            const cover = this.dataset.cover;

            // 切换视频
            mainVideo.pause();
            mainVideo.innerHTML = `<source src="${videoUrl}" type="video/mp4">`;
            mainVideo.poster = cover;
            mainVideo.load();

            // 更新标题和描述
            if (videoTitle) videoTitle.textContent = title;
            if (videoDesc) videoDesc.textContent = desc;
        });
    });
}
