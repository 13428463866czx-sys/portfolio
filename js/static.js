// 静态作品页面功能
document.addEventListener('DOMContentLoaded', function() {
    initSeriesPanel();
    initSeriesFilter();
});

// 系列展开面板功能
function initSeriesPanel() {
    const seriesCards = document.querySelectorAll('.series-card');
    const seriesPanel = document.getElementById('seriesPanel');
    const panelClose = document.getElementById('panelClose');
    const panelOverlay = seriesPanel.querySelector('.panel-overlay');
    const panelTitle = document.getElementById('panelTitle');
    const panelDesc = document.getElementById('panelDesc');
    const panelGallery = document.getElementById('panelGallery');

    if (!seriesCards.length || !seriesPanel) return;

    // 模拟系列数据（实际使用时从后端或JSON加载）
    const seriesData = {
        'city-night': {
            title: '城市夜景',
            desc: '霓虹与建筑的交响曲',
            images: [
                'images/series/city-night/01.jpg',
                'images/series/city-night/02.jpg',
                'images/series/city-night/03.jpg',
                'images/series/city-night/04.jpg',
                'images/series/city-night/05.jpg',
                'images/series/city-night/06.jpg',
                'images/series/city-night/07.jpg',
                'images/series/city-night/08.jpg',
                'images/series/city-night/09.jpg',
                'images/series/city-night/10.jpg',
                'images/series/city-night/11.jpg',
                'images/series/city-night/12.jpg',
            ]
        },
        'cyber-portrait': {
            title: '赛博人像',
            desc: '青绿与品红的光影实验',
            images: [
                'images/series/cyber-portrait/01.jpg',
                'images/series/cyber-portrait/02.jpg',
                'images/series/cyber-portrait/03.jpg',
                'images/series/cyber-portrait/04.jpg',
                'images/series/cyber-portrait/05.jpg',
                'images/series/cyber-portrait/06.jpg',
                'images/series/cyber-portrait/07.jpg',
                'images/series/cyber-portrait/08.jpg',
            ]
        },
        'product-light': {
            title: '产品光影',
            desc: '商业静物摄影集',
            images: [
                'images/series/product-light/01.jpg',
                'images/series/product-light/02.jpg',
                'images/series/product-light/03.jpg',
                'images/series/product-light/04.jpg',
                'images/series/product-light/05.jpg',
            ]
        },
        'tokyo-street': {
            title: '东京街头',
            desc: '赛博朋克圣地巡礼',
            images: [
                'images/series/tokyo-street/01.jpg',
                'images/series/tokyo-street/02.jpg',
                'images/series/tokyo-street/03.jpg',
                'images/series/tokyo-street/04.jpg',
                'images/series/tokyo-street/05.jpg',
            ]
        },
        'nature-light': {
            title: '自然光',
            desc: '日出日落的光影记录',
            images: [
                'images/series/nature-light/01.jpg',
                'images/series/nature-light/02.jpg',
                'images/series/nature-light/03.jpg',
            ]
        },
        'studio-light': {
            title: '棚拍人像',
            desc: '专业灯光下的质感',
            images: [
                'images/series/studio-light/01.jpg',
                'images/series/studio-light/02.jpg',
                'images/series/studio-light/03.jpg',
            ]
        },
        'food-art': {
            title: '美食艺术',
            desc: '色彩与食欲的对话',
            images: [
                'images/series/food-art/01.jpg',
                'images/series/food-art/02.jpg',
                'images/series/food-art/03.jpg',
            ]
        },
        'hongkong-night': {
            title: '香港夜行',
            desc: '密集城市的呼吸',
            images: [
                'images/series/hongkong-night/01.jpg',
                'images/series/hongkong-night/02.jpg',
                'images/series/hongkong-night/03.jpg',
            ]
        }
    };

    // 打开面板
    seriesCards.forEach(card => {
        card.addEventListener('click', function() {
            const seriesId = this.dataset.series;
            const series = seriesData[seriesId];

            if (!series) return;

            panelTitle.textContent = series.title;
            panelDesc.textContent = series.desc;

            // 生成画廊
            panelGallery.innerHTML = series.images.map((img, index) => `
                <div class="gallery-item" data-index="${index}">
                    <img src="${img}" alt="${series.title} ${index + 1}">
                </div>
            `).join('');

            // 添加图片点击事件
            const galleryItems = panelGallery.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => openLightbox(series.images, index));
            });

            seriesPanel.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭面板
    function closePanel() {
        seriesPanel.classList.remove('active');
        document.body.style.overflow = '';
    }

    panelClose.addEventListener('click', closePanel);
    panelOverlay.addEventListener('click', closePanel);

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.querySelector('.lightbox.active')) {
                closeLightbox();
            } else if (seriesPanel.classList.contains('active')) {
                closePanel();
            }
        }
    });
}

// Lightbox 大图查看器
let currentLightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(images, startIndex) {
    currentLightboxImages = images;
    currentLightboxIndex = startIndex;

    // 创建lightbox元素
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">×</button>
            <button class="lightbox-nav lightbox-prev">‹</button>
            <button class="lightbox-nav lightbox-next">›</button>
            <img class="lightbox-img" src="" alt="">
        `;
        document.body.appendChild(lightbox);

        // 绑定事件
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
        lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    updateLightboxImage();
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = currentLightboxImages.length - 1;
    } else if (currentLightboxIndex >= currentLightboxImages.length) {
        currentLightboxIndex = 0;
    }
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightbox = document.querySelector('.lightbox');
    const img = lightbox.querySelector('.lightbox-img');
    img.src = currentLightboxImages[currentLightboxIndex];
}

// 系列筛选功能
function initSeriesFilter() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const seriesCards = document.querySelectorAll('.series-card');

    if (!filterTabs.length || !seriesCards.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 切换active状态
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // 筛选系列卡片
            seriesCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}
