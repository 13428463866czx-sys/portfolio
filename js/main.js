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

    // 副标题点击播放/暂停背景视频
    initHeroSubtitle();
    
    // 主标题故障艺术效果
    initHeroTitleGlitch();
    
    // 视频轮播
    initVideoCarousel();

    // 初始化各功能模块
    initVideoModal();
    initSeriesPanel();
    initFilterTabs();
});

// 副标题点击弹出视频弹窗
function initHeroSubtitle() {
    const subtitle = document.querySelector('.hero-subtitle');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    
    if (!subtitle || !videoModal || !modalVideo) return;
    
    subtitle.style.cursor = 'pointer';
    subtitle.addEventListener('click', function() {
        // 使用背景视频作为弹窗视频源
        const bgVideo = document.querySelector('.bg-video');
        const videoSrc = bgVideo?.querySelector('source')?.src || 'video/showreel-placeholder.mp4';
        
        modalVideo.innerHTML = `<source src="${videoSrc}" type="video/mp4">`;
        modalTitle.textContent = 'SHOWREEL 2026';
        modalDesc.textContent = '一分钟了解我的视觉风格';
        
        videoModal.classList.add('active');
        modalVideo.load();
        modalVideo.muted = false; // 有声音
        modalVideo.play();
    });
}

// 视频轮播
function initVideoCarousel() {
    const thumbs = document.querySelectorAll('.carousel-thumbs .thumb');
    const videos = document.querySelectorAll('.carousel-main .carousel-video');
    
    if (!thumbs.length || !videos.length) return;
    
    // 缩略图点击切换
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = this.dataset.index;
            
            // 更新缩略图状态
            thumbs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 更新视频显示
            videos.forEach(v => v.classList.remove('active'));
            videos[index].classList.add('active');
        });
    });
    
    // 视频点击打开弹窗
    videos.forEach(video => {
        video.addEventListener('click', function() {
            const videoUrl = this.dataset.video;
            const title = this.dataset.title;
            const desc = this.dataset.desc;
            
            const videoModal = document.getElementById('videoModal');
            const modalVideo = document.getElementById('modalVideo');
            const modalTitle = document.getElementById('modalTitle');
            const modalDesc = document.getElementById('modalDesc');
            
            if (!videoModal || !modalVideo) return;
            
            modalVideo.innerHTML = `<source src="${videoUrl}" type="video/mp4">`;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            videoModal.classList.add('active');
            modalVideo.load();
            modalVideo.muted = false;
            modalVideo.play();
        });
    });
}

// 主标题故障艺术效果
function initHeroTitleGlitch() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    heroTitle.addEventListener('mouseenter', function() {
        this.classList.add('glitch');
    });
    
    heroTitle.addEventListener('mouseleave', function() {
        this.classList.remove('glitch');
    });
}

// 视频弹窗功能
function initVideoModal() {
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = videoModal?.querySelector('.modal-overlay');

    if (!videoModal || !modalVideo) return;

    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoUrl = this.dataset.video;
            const title = this.dataset.title;
            const desc = this.dataset.desc;

            modalVideo.innerHTML = `<source src="${videoUrl}" type="video/mp4">`;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            videoModal.classList.add('active');
            modalVideo.load();
            modalVideo.play();
        });
    });

    function closeModal() {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }

    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
}

// 系列展开面板功能
function initSeriesPanel() {
    const seriesCards = document.querySelectorAll('.series-card');
    const seriesPanel = document.getElementById('seriesPanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelDesc = document.getElementById('panelDesc');
    const panelGallery = document.getElementById('panelGallery');
    const panelClose = document.getElementById('panelClose');
    const panelOverlay = seriesPanel?.querySelector('.panel-overlay');

    if (!seriesPanel) return;

    // 模拟系列数据
    const seriesData = {
        'city-night': {
            title: '城市夜景',
            desc: '霓虹与建筑的交响曲',
            images: Array(12).fill('images/series/city-night/')
        },
        'cyber-portrait': {
            title: '赛博人像',
            desc: '青绿与品红的光影实验',
            images: Array(8).fill('images/series/cyber-portrait/')
        },
        'product-light': {
            title: '产品光影',
            desc: '商业静物摄影集',
            images: Array(15).fill('images/series/product-light/')
        },
        'tokyo-street': {
            title: '东京街头',
            desc: '赛博朋克圣地巡礼',
            images: Array(20).fill('images/series/tokyo-street/')
        },
        'nature-light': {
            title: '自然光',
            desc: '日出日落的光影记录',
            images: Array(10).fill('images/series/nature-light/')
        },
        'studio-light': {
            title: '棚拍人像',
            desc: '专业灯光下的质感',
            images: Array(6).fill('images/series/studio-light/')
        },
        'food-art': {
            title: '美食艺术',
            desc: '色彩与食欲的对话',
            images: Array(18).fill('images/series/food-art/')
        },
        'hongkong-night': {
            title: '香港夜行',
            desc: '密集城市的呼吸',
            images: Array(24).fill('images/series/hongkong-night/')
        }
    };

    seriesCards.forEach(card => {
        card.addEventListener('click', function() {
            const seriesKey = this.dataset.series;
            const data = seriesData[seriesKey];

            if (data) {
                panelTitle.textContent = data.title;
                panelDesc.textContent = data.desc;
                
                // 生成图片网格
                panelGallery.innerHTML = data.images.map((_, i) => `
                    <img src="${seriesKey}/img${i + 1}.jpg" alt="${data.title} ${i + 1}" loading="lazy">
                `).join('');

                seriesPanel.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closePanel() {
        seriesPanel.classList.remove('active');
        document.body.style.overflow = '';
    }

    panelClose?.addEventListener('click', closePanel);
    panelOverlay?.addEventListener('click', closePanel);

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && seriesPanel.classList.contains('active')) {
            closePanel();
        }
    });
}

// 筛选标签功能
function initFilterTabs() {
    const filterSections = document.querySelectorAll('.section');
    
    filterSections.forEach(section => {
        const tabs = section.querySelectorAll('.filter-tab');
        const items = section.querySelectorAll('[data-category]');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const filter = this.dataset.filter;

                // 更新标签状态
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // 筛选内容
                items.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    });
}
