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
    let savedScrollPosition = 0;

    if (!seriesCards.length || !seriesPanel) return;

    // 系列数据
    const seriesData = {
        'brand-collateral': {
            title: 'Brand Collateral',
            desc: '海报、VI、包装与产品说明书设计',
            images: [
                { src: 'images/series/brand-collateral/01_poster.jpg', label: '海报 (排版、ps)' },
                { src: 'images/series/brand-collateral/02_manual_00.jpg', label: '说明书 (OC)' },
                { src: 'images/series/brand-collateral/03_manual_01.jpg', label: '' },
                { src: 'images/series/brand-collateral/04_manual_02.jpg', label: '' },
                { src: 'images/series/brand-collateral/05_manual_03.jpg', label: '' },
                { src: 'images/series/brand-collateral/06_manual_04.jpg', label: '' },
                { src: 'images/series/brand-collateral/07_manual_05.jpg', label: '' },
                { src: 'images/series/brand-collateral/08_manual_06.jpg', label: '' },
                { src: 'images/series/brand-collateral/09_langcity_vi.jpg', label: 'langcityVI (logo设计)' },
                { src: 'images/series/brand-collateral/10_led_packaging.png', label: 'LED_Packaging (设计)' },
            ]
        },
        'nasal-spray': {
            title: 'Nasal Spray',
            desc: '鼻腔喷雾产品渲染与电商设计',
            images: [
                { src: 'images/series/nasal-spray/01_render.jpg', label: '0 (OC)' },
                { src: 'images/series/nasal-spray/02_render_raw.png', label: '0 (OC原生)' },
                { src: 'images/series/nasal-spray/03_render.jpg', label: '1 (OC)' },
                { src: 'images/series/nasal-spray/04_render.jpg', label: '2 (OC)' },
                { src: 'images/series/nasal-spray/05_render.jpg', label: '3 (OC)' },
                { src: 'images/series/nasal-spray/06_render.jpg', label: '4 (OC)' },
                { src: 'images/series/nasal-spray/07_detail_page.jpg', label: '详情页 (OC、排版)' },
                { src: 'images/series/nasal-spray/08_other.jpg', label: 'OTHER+ (排版)' },
            ]
        },
        'beauty-makeup': {
            title: 'Beauty Makeup',
            desc: '美妆造型产品渲染与电商设计',
            images: [
                { src: 'images/series/beauty-makeup/01.jpg', label: '1 (白底图、OC)' },
                { src: 'images/series/beauty-makeup/02.jpg', label: '2 (排版、OC)' },
                { src: 'images/series/beauty-makeup/03.jpg', label: '3 (排版、OC)' },
                { src: 'images/series/beauty-makeup/04.jpg', label: '4 (白底图、mockup、oc)' },
                { src: 'images/series/beauty-makeup/05.jpg', label: '5 (白底图、oc)' },
                { src: 'images/series/beauty-makeup/06.jpg', label: '6 (oc)' },
                { src: 'images/series/beauty-makeup/07.jpg', label: '7 (OC、mockup)' },
                { src: 'images/series/beauty-makeup/08.jpg', label: '8 (OC、mockup)' },
                { src: 'images/series/beauty-makeup/09.jpg', label: '9 (OC)' },
                { src: 'images/series/beauty-makeup/10.jpg', label: '10 (OC)' },
                { src: 'images/series/beauty-makeup/11.jpg', label: '11 (OC、A+)' },
                { src: 'images/series/beauty-makeup/12.jpg', label: '12 (OC、A+)' },
                { src: 'images/series/beauty-makeup/13.jpg', label: '12 (OC)' },
                { src: 'images/series/beauty-makeup/14_A2.jpg', label: '' },
                { src: 'images/series/beauty-makeup/15_A3.jpg', label: '' },
                { src: 'images/series/beauty-makeup/16_A4.jpg', label: '' },
                { src: 'images/series/beauty-makeup/17_logo.jpg', label: '' },
            ]
        },
        'atmosphere-light': {
            title: 'Atmosphere Light',
            desc: '氛围灯产品渲染与电商设计',
            images: [
                { src: 'images/series/atmosphere-light/01.png', label: '1 (OC、渲染原型)' },
                { src: 'images/series/atmosphere-light/02.png', label: '2 (OC、渲染原型)' },
                { src: 'images/series/atmosphere-light/03.png', label: '3 (OC、mockup)' },
                { src: 'images/series/atmosphere-light/04.png', label: '4 (OC)' },
                { src: 'images/series/atmosphere-light/05.png', label: '5' },
                { src: 'images/series/atmosphere-light/06.png', label: '6 (OC)' },
                { src: 'images/series/atmosphere-light/07.png', label: '7 (OC)' },
                { src: 'images/series/atmosphere-light/08.png', label: '8 (OC)' },
                { src: 'images/series/atmosphere-light/09.jpg', label: '9 (OC、A+、户外模拟)' },
                { src: 'images/series/atmosphere-light/10.jpg', label: '10 (白底图、OC)' },
                { src: 'images/series/atmosphere-light/11.jpg', label: '11 (OC)' },
                { src: 'images/series/atmosphere-light/12.jpg', label: '12 (OC、mockup)' },
                { src: 'images/series/atmosphere-light/13.jpg', label: '13 (appMOCKUP)' },
                { src: 'images/series/atmosphere-light/14.jpg', label: '14 (OC)' },
                { src: 'images/series/atmosphere-light/15.jpg', label: '15 (OC)' },
                { src: 'images/series/atmosphere-light/16.jpg', label: '16 (OC、A+)' },
                { src: 'images/series/atmosphere-light/17.jpg', label: '17 (OC、A+)' },
                { src: 'images/series/atmosphere-light/18.jpg', label: '18 (OC、mockup)' },
                { src: 'images/series/atmosphere-light/19.jpg', label: '19 (OC、白底图)' },
                { src: 'images/series/atmosphere-light/20.jpg', label: '20 (OC)' },
                { src: 'images/series/atmosphere-light/21.jpg', label: '21 (拍摄)' },
                { src: 'images/series/atmosphere-light/22.jpg', label: '22 (oc)' },
                { src: 'images/series/atmosphere-light/23.jpg', label: '23 (oc)' },
                { src: 'images/series/atmosphere-light/24.jpg', label: '24 (oc)' },
                { src: 'images/series/atmosphere-light/25.jpg', label: '25 (oc)' },
            ]
        },
        'scene-render': {
            title: 'Scene Render',
            desc: '3D场景渲染作品',
            images: [
                { src: 'images/series/scene-render/01.png', label: '场景 1' },
                { src: 'images/series/scene-render/02.png', label: '场景 2' },
                { src: 'images/series/scene-render/03.jpg', label: '场景 3' },
                { src: 'images/series/scene-render/04.jpg', label: '场景 4' },
                { src: 'images/series/scene-render/05.jpg', label: '场景 5' },
                { src: 'images/series/scene-render/06.jpg', label: '场景 6' },
            ]
        },
        'tool-set': {
            title: 'Tool Set',
            desc: '工具套装产品渲染与电商设计',
            images: [
                { src: 'images/series/tool-set/01.jpg', label: '1 (OC、白底图)' },
                { src: 'images/series/tool-set/02.jpg', label: '2 (OC、mockup)' },
                { src: 'images/series/tool-set/03.jpg', label: '3 (OC、mockup)' },
                { src: 'images/series/tool-set/04.jpg', label: '4 (OC)' },
                { src: 'images/series/tool-set/05.jpg', label: '5 (OC)' },
            ]
        },
        'speaker': {
            title: 'Speaker',
            desc: '音箱产品静物摄影',
            images: [
                { src: 'images/series/speaker/01.jpg', label: '1 (棚拍)' },
                { src: 'images/series/speaker/02.jpg', label: '2 (棚拍、场景搭建)' },
                { src: 'images/series/speaker/03.jpg', label: '3 (棚拍)' },
                { src: 'images/series/speaker/04.jpg', label: '4 (棚拍)' },
                { src: 'images/series/speaker/05.jpg', label: '5 (棚拍)' },
                { src: 'images/series/speaker/06.jpg', label: '6 (棚拍、场景搭建)' },
            ]
        },
        'bird-feeder': {
            title: 'Bird Feeder',
            desc: '喂鸟器产品静物摄影',
            images: [
                { src: 'images/series/bird-feeder/01.jpg', label: '1 (棚拍)' },
                { src: 'images/series/bird-feeder/02.jpg', label: '2 (棚拍)' },
            ]
        },
        'smart-bidet': {
            title: 'Smart Bidet',
            desc: '智能马桶盖产品渲染与电商设计',
            images: [
                { src: 'images/series/smart-bidet/01.jpg', label: '1 (OC)' },
                { src: 'images/series/smart-bidet/02.jpg', label: '1C' },
                { src: 'images/series/smart-bidet/03.jpg', label: '2A' },
                { src: 'images/series/smart-bidet/04.jpg', label: '2C' },
                { src: 'images/series/smart-bidet/05.jpg', label: '详情页 (970x600)' },
                { src: 'images/series/smart-bidet/06.jpg', label: '详情页 (970x600)' },
                { src: 'images/series/smart-bidet/07.jpg', label: '场景图 1' },
                { src: 'images/series/smart-bidet/08.jpg', label: '场景图 2' },
                { src: 'images/series/smart-bidet/09.jpg', label: '场景图 4' },
                { src: 'images/series/smart-bidet/10.jpg', label: '场景图 5' },
                { src: 'images/series/smart-bidet/11.jpg', label: '场景图 6' },
            ]
        },
        'bike-light': {
            title: 'Bike Light',
            desc: '自行车转向灯产品渲染与电商设计',
            images: [
                { src: 'images/series/bike-light/01.jpg', label: '主图 (OC)' },
                { src: 'images/series/bike-light/02.jpg', label: 'A+ 1 (OC)' },
                { src: 'images/series/bike-light/03.jpg', label: 'A+ 2 (OC)' },
                { src: 'images/series/bike-light/04.jpg', label: 'A+ 3 (OC)' },
                { src: 'images/series/bike-light/05.jpg', label: 'B+ 1 (OC)' },
                { src: 'images/series/bike-light/06.jpg', label: 'B+ 2 (OC)' },
                { src: 'images/series/bike-light/07.jpg', label: 'B+ 3 (OC)' },
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
            panelGallery.innerHTML = series.images.map((img, index) => {
                // 解析标签：主标题 + 括号内的标签
                let mainLabel = '';
                let tags = [];
                if (img.label) {
                    const match = img.label.match(/^(.+?)\s*\((.*)\)$/);
                    if (match) {
                        mainLabel = match[1].trim();
                        tags = match[2].split(/[,、]/).map(t => t.trim()).filter(Boolean);
                    } else {
                        mainLabel = img.label;
                    }
                }
                
                return `
                <div class="gallery-item" data-index="${index}">
                    <div class="gallery-img-wrap">
                        <img src="${img.src}" alt="${series.title} ${index + 1}" loading="lazy">
                    </div>
                    ${img.label ? `
                    <div class="gallery-label">
                        <div class="label-title">${mainLabel}</div>
                        ${tags.length ? `
                        <div class="label-tags">
                            ${tags.map(tag => `<span class="label-tag">${tag}</span>`).join('')}
                        </div>` : ''}
                    </div>` : ''}
                </div>
            `}).join('');

            // 添加图片点击事件
            const galleryItems = panelGallery.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                item.addEventListener('click', () => openLightbox(series.images.map(i => i.src), index));
            });

            savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            seriesPanel.classList.add('active');
            document.body.style.overflow = 'hidden';
            seriesPanel.scrollTo(0, 0);
        });
    });

    // 关闭面板
    function closePanel() {
        seriesPanel.classList.remove('active');
        document.body.style.overflow = '';
        window.scrollTo(0, savedScrollPosition);
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
