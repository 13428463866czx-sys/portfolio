// 子页面通用功能
document.addEventListener('DOMContentLoaded', function() {
    initVideoModal();
    initFilterTabs();
    initPagination();
});

// 视频弹窗功能
function initVideoModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const videoCards = document.querySelectorAll('.video-card');

    if (!modal || !videoCards.length) return;

    // 打开弹窗
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            const videoUrl = this.dataset.video;
            const title = this.dataset.title;
            const desc = this.dataset.desc;

            modalVideo.innerHTML = `<source src="${videoUrl}" type="video/mp4">`;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // 自动播放
            modalVideo.load();
            modalVideo.play().catch(e => console.log('自动播放被阻止'));
        });
    });

    // 关闭弹窗
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// 筛选标签功能
function initFilterTabs() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const videoCards = document.querySelectorAll('.video-card');

    if (!filterTabs.length || !videoCards.length) return;

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 切换active状态
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // 筛选视频卡片
            videoCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// 分页功能（基础框架，可扩展）
function initPagination() {
    const pageBtns = document.querySelectorAll('.page-num');
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');

    if (!pageBtns.length) return;

    let currentPage = 1;
    const totalPages = pageBtns.length;

    // 页码点击
    pageBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            currentPage = index + 1;
            updatePagination();
        });
    });

    // 上一页
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updatePagination();
            }
        });
    }

    // 下一页
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updatePagination();
            }
        });
    }

    function updatePagination() {
        // 更新页码按钮状态
        pageBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === currentPage);
        });

        // 更新上一页/下一页按钮状态
        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;

        // TODO: 这里可以添加加载对应页面数据的逻辑
        console.log('切换到第', currentPage, '页');
    }
}
