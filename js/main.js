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

    // 初始化页面转场
    initPageTransition();

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
    
    // 启用内容保护
    initContentProtection();
});

// 页面转场效果
function initPageTransition() {
    // 为所有导航链接添加转场效果
    document.querySelectorAll('.nav-links a[href$=".html"], .logo[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            const transition = document.querySelector('.page-transition');
            const body = document.body;
            
            // 排除当前页
            if (targetUrl === window.location.pathname.split('/').pop()) {
                return;
            }
            
            if (transition) {
                // 给body添加故障类，让整个页面内容故障化
                body.classList.add('glitching');
                
                // 激活转场遮罩
                setTimeout(() => {
                    transition.classList.add('active');
                }, 200);
                
                // 动画结束后跳转
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 700);
            } else {
                window.location.href = targetUrl;
            }
        });
    });
}

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
        // 弹窗使用OSS高清版（data-modal标记的source），背景使用本地压缩版
        const bgVideo = document.querySelector('.bg-video');
        const modalSource = bgVideo?.querySelector('source[data-modal]');
        const videoSrc = modalSource?.src || bgVideo?.querySelector('source')?.src || 'video/bg-showreel.mp4';
        
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
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    // 切换到指定索引
    function goToSlide(index) {
        currentIndex = index;
        
        // 更新缩略图状态
        thumbs.forEach(t => t.classList.remove('active'));
        thumbs[currentIndex].classList.add('active');
        
        // 更新视频显示
        videos.forEach(v => v.classList.remove('active'));
        videos[currentIndex].classList.add('active');
    }
    
    // 自动轮播
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % videos.length;
            goToSlide(nextIndex);
        }, 5000); // 5秒切换一次
    }
    
    // 停止自动轮播
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 缩略图点击切换
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay(); // 重置计时器
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
    
    // 鼠标悬停时暂停轮播
    const carousel = document.querySelector('.video-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // 开始自动轮播
    startAutoPlay();
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
    const galleryItems = document.querySelectorAll('.gallery-item');
    const seriesPanel = document.getElementById('seriesPanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelDesc = document.getElementById('panelDesc');
    const panelGallery = document.getElementById('panelGallery');
    const panelClose = document.getElementById('panelClose');
    const panelOverlay = seriesPanel?.querySelector('.panel-overlay');

    if (!seriesPanel) return;

    // 系列数据
    const seriesData = {
        'brand-collateral': {
            title: '品牌物料 Brand Collateral',
            desc: '海报、VI、包装 · 印刷品设计',
            images: [
                'images/series/brand-collateral/01_poster.jpg',
                'images/series/brand-collateral/02_manual_00.jpg',
                'images/series/brand-collateral/03_manual_01.jpg',
                'images/series/brand-collateral/04_manual_02.jpg',
                'images/series/brand-collateral/05_manual_03.jpg',
                'images/series/brand-collateral/06_manual_04.jpg',
                'images/series/brand-collateral/07_manual_05.jpg',
                'images/series/brand-collateral/08_manual_06.jpg',
                'images/series/brand-collateral/09_langcity_vi.jpg',
                'images/series/brand-collateral/10_led_packaging.png'
            ]
        },
        'beauty-makeup': {
            title: '美妆造型 Beauty Makeup',
            desc: '产品渲染 · 电商',
            images: [
                'images/series/beauty-makeup/01.jpg',
                'images/series/beauty-makeup/02.jpg',
                'images/series/beauty-makeup/03.jpg',
                'images/series/beauty-makeup/04.jpg',
                'images/series/beauty-makeup/05.jpg',
                'images/series/beauty-makeup/06.jpg',
                'images/series/beauty-makeup/07.jpg',
                'images/series/beauty-makeup/08.jpg',
                'images/series/beauty-makeup/09.jpg',
                'images/series/beauty-makeup/10.jpg',
                'images/series/beauty-makeup/11.jpg',
                'images/series/beauty-makeup/12.jpg',
                'images/series/beauty-makeup/13.jpg',
                'images/series/beauty-makeup/14_A2.jpg',
                'images/series/beauty-makeup/15_A3.jpg',
                'images/series/beauty-makeup/16_A4.jpg',
                'images/series/beauty-makeup/17_logo.jpg'
            ]
        },
        'atmosphere-light': {
            title: '氛围灯 Atmosphere Light',
            desc: '产品渲染 · 电商',
            images: [
                'images/series/atmosphere-light/01.png',
                'images/series/atmosphere-light/02.png',
                'images/series/atmosphere-light/03.png',
                'images/series/atmosphere-light/04.png',
                'images/series/atmosphere-light/05.png',
                'images/series/atmosphere-light/06.png',
                'images/series/atmosphere-light/07.png',
                'images/series/atmosphere-light/08.png',
                'images/series/atmosphere-light/09.jpg',
                'images/series/atmosphere-light/10.jpg',
                'images/series/atmosphere-light/11.jpg',
                'images/series/atmosphere-light/12.jpg',
                'images/series/atmosphere-light/13.jpg',
                'images/series/atmosphere-light/14.jpg',
                'images/series/atmosphere-light/15.jpg',
                'images/series/atmosphere-light/16.jpg',
                'images/series/atmosphere-light/17.jpg',
                'images/series/atmosphere-light/18.jpg',
                'images/series/atmosphere-light/19.jpg',
                'images/series/atmosphere-light/20.jpg',
                'images/series/atmosphere-light/21.jpg',
                'images/series/atmosphere-light/22.jpg',
                'images/series/atmosphere-light/23.jpg',
                'images/series/atmosphere-light/24.jpg',
                'images/series/atmosphere-light/25.jpg'
            ]
        },
        'scene-render': {
            title: '场景渲染 Scene Render',
            desc: '3D渲染 · 场景',
            images: [
                'images/series/scene-render/01.png',
                'images/series/scene-render/02.png',
                'images/series/scene-render/03.jpg',
                'images/series/scene-render/04.jpg',
                'images/series/scene-render/05.jpg',
                'images/series/scene-render/06.jpg'
            ]
        },
        'tool-set': {
            title: '工具套装 Tool Set',
            desc: '产品渲染 · 电商',
            images: [
                'images/series/tool-set/01.jpg',
                'images/series/tool-set/02.jpg',
                'images/series/tool-set/03.jpg',
                'images/series/tool-set/04.jpg',
                'images/series/tool-set/05.jpg'
            ]
        },
        'speaker': {
            title: '音箱 Speaker',
            desc: '产品摄影 · 静物',
            images: [
                'images/series/speaker/01.jpg',
                'images/series/speaker/02.jpg',
                'images/series/speaker/03.jpg'
            ]
        }
    };

    // 处理点击打开面板
    function openPanel(seriesKey) {
        const data = seriesData[seriesKey];
        if (!data) return;

        panelTitle.textContent = data.title;
        panelDesc.textContent = data.desc;
        
        // 生成图片网格
        panelGallery.innerHTML = data.images.map((src, i) => `
            <div class="panel-img-item" data-index="${i}">
                <img src="${src}" alt="${data.title} ${i + 1}">
            </div>
        `).join('');
        
        console.log('Panel opened:', seriesKey, 'Images:', data.images);

        seriesPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
        seriesPanel.scrollTo(0, 0);
    }

    // 绑定系列卡片点击
    seriesCards.forEach(card => {
        card.addEventListener('click', function() {
            openPanel(this.dataset.series);
        });
    });

    // 绑定首页画廊项点击
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openPanel(this.dataset.series);
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

// 内容保护 - 禁用右键、拖拽、选择
function initContentProtection() {
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG' || e.target.closest('.video-thumbnail') || e.target.closest('.gallery-item')) {
            e.preventDefault();
        }
    });
    
    // 禁用图片拖拽
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });
    
    // 禁用复制（可选，可能会影响体验）
    // document.addEventListener('copy', function(e) {
    //     e.preventDefault();
    // });
}
