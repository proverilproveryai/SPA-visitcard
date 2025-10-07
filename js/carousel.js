// Переменные для работы с проектами
let currentProject = 0;
let currentImageIndex = 0;
let totalProjects = 0;

// DOM элементы
let mainProjectImage = null;
let projectThumbnails = null;
let indicators = null;
let prevProjectBtn = null;
let nextProjectBtn = null;

// Инициализация новой логики проектов
function initCarousel() {
    console.log('=== Инициализация Projects ===');
    
    // Получаем DOM элементы
    mainProjectImage = document.getElementById('mainProjectImage');
    projectThumbnails = document.getElementById('projectThumbnails');
    indicators = document.getElementById('indicators');
    prevProjectBtn = document.getElementById('prevProjectBtn');
    nextProjectBtn = document.getElementById('nextProjectBtn');
    
    // Проверяем наличие данных
    if (typeof portfolioData === 'undefined' || !portfolioData.works) {
        console.warn('Данные portfolioData.works не найдены');
        return;
    }
    
    totalProjects = portfolioData.works.length;
    
    // Создаем индикаторы проектов
    createProjectIndicators();
    
    // Показываем первый проект
    if (totalProjects > 0) {
        showProject(0);
    }
    
    // Навешиваем обработчики на стрелки проектов
    if (prevProjectBtn) {
        prevProjectBtn.addEventListener('click', prevProject);
    }
    
    if (nextProjectBtn) {
        nextProjectBtn.addEventListener('click', nextProject);
    }
    
    // Touch события для проектов
    setupTouchEvents();

    initMobileInfoOverlay();
    
    console.log('Проекты успешно инициализированы, всего проектов:', totalProjects);
}

// Создание индикаторов проектов
function createProjectIndicators() {
    if (!indicators) return;
    
    indicators.innerHTML = '';
    for (let i = 0; i < totalProjects; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => showProject(i));
        indicators.appendChild(indicator);
    }
}

// Показать конкретный проект
function showProject(projectIndex) {
    if (projectIndex < 0 || projectIndex >= totalProjects) return;
    
    currentProject = projectIndex;
    currentImageIndex = 0; // Сбрасываем на первое изображение
    
    const project = portfolioData.works[currentProject];
    
    // Обновляем основное изображение
    updateMainImage();
    
    // Создаем thumbnails для дополнительных изображений
    createThumbnails();
    
    // Обновляем информацию о проекте
    updateProjectInfo();
    
    // Обновляем индикаторы проектов
    updateProjectIndicators();
}

// Обновление основного изображения
function updateMainImage() {
    if (!mainProjectImage) return;
    
    const project = portfolioData.works[currentProject];
    const currentImages = project.images || [project.src]; // Fallback на старый формат
    
    if (currentImages && currentImages[currentImageIndex]) {
        mainProjectImage.src = currentImages[currentImageIndex];
        mainProjectImage.alt = project.title;
        
        // Плавная анимация смены изображения
        mainProjectImage.style.opacity = '0';
        setTimeout(() => {
            mainProjectImage.style.opacity = '1';
        }, 150);
    }
}

// Создание thumbnails для дополнительных изображений проекта
function createThumbnails() {
    if (!projectThumbnails) return;
    
    const project = portfolioData.works[currentProject];
    const projectImages = project.images || [project.src]; // Fallback на старый формат
    
    projectThumbnails.innerHTML = '';
    
    // Создаем thumbnails только если изображений больше одного
    if (projectImages.length > 1) {
        projectImages.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'project-thumbnail';
            if (index === currentImageIndex) {
                thumbnail.classList.add('active');
            }
            
            thumbnail.innerHTML = `<img src="${imageSrc}" alt="${project.title} - изображение ${index + 1}">`;
            
            thumbnail.addEventListener('click', () => {
                selectImage(index);
            });
            
            projectThumbnails.appendChild(thumbnail);
        });
    }
}

// Выбор конкретного изображения в рамках проекта
function selectImage(imageIndex) {
    const project = portfolioData.works[currentProject];
    const projectImages = project.images || [project.src];
    
    if (imageIndex < 0 || imageIndex >= projectImages.length) return;
    
    currentImageIndex = imageIndex;
    updateMainImage();
    updateThumbnailsState();
}

// Обновление состояния thumbnails (активный элемент)
function updateThumbnailsState() {
    const thumbnails = projectThumbnails.querySelectorAll('.project-thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Обновление информации о проекте
function updateProjectInfo() {
    const project = portfolioData.works[currentProject];
    
    const workTitle = document.getElementById('workTitle');
    if (workTitle) {
        workTitle.textContent = project.title;
    }
    
    const workDescription = document.getElementById('workDescription');
    if (workDescription) {
        workDescription.innerHTML = project.description;
    }
    
    const workTags = document.getElementById('workTags');
    if (workTags) {
        workTags.innerHTML = '';
        if (project.tags) {
            project.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'work-tag';
                tagElement.textContent = tag;
                workTags.appendChild(tagElement);
            });
        }
    }
}

// Обновление индикаторов проектов
function updateProjectIndicators() {
    if (!indicators) return;
    
    const allIndicators = indicators.querySelectorAll('.indicator');
    allIndicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentProject);
    });
}

// Переход к следующему проекту
function nextProject() {
    const nextIndex = (currentProject + 1) % totalProjects;
    showProject(nextIndex);
}

// Переход к предыдущему проекту
function prevProject() {
    const prevIndex = (currentProject - 1 + totalProjects) % totalProjects;
    showProject(prevIndex);
}

// Настройка touch событий
function setupTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('.carousel-square');
    if (!carousel) return;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        e.stopPropagation();
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchStartX - touchEndX;
        
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                nextProject();
            } else {
                prevProject();
            }
        }
        e.stopPropagation();
    });
}

// Инициализация мобильного overlay
function initMobileInfoOverlay() {
    const toggleBtn = document.getElementById('mobileInfoToggle');
    const overlay = document.getElementById('mobileInfoOverlay');
    const closeBtn = document.getElementById('mobileInfoClose');
    
    if (!toggleBtn || !overlay) return;
    
    // Открытие overlay
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showMobileInfo();
    });
    
    // Закрытие по кнопке
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMobileInfo();
        });
    }
    
    // Закрытие по клику на фон
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeMobileInfo();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeMobileInfo();
        }
    });
}

// Показать информацию о проекте в overlay
function showMobileInfo() {
    const project = portfolioData.works[currentProject];
    const overlay = document.getElementById('mobileInfoOverlay');
    
    // Заполняем контент
    document.getElementById('mobileInfoTitle').textContent = project.title;
    document.getElementById('mobileInfoDescription').innerHTML = project.description;
    
    // Заполняем теги
    const tagsContainer = document.getElementById('mobileInfoTags');
    tagsContainer.innerHTML = '';
    if (project.tags) {
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'work-tag';
            tagElement.textContent = tag;
            tagsContainer.appendChild(tagElement);
        });
    }
    
    // Блокируем скролл body
    document.body.style.overflow = 'hidden';
    
    // Показываем overlay
    overlay.classList.add('active');
    
    // Скроллим содержимое overlay в начало
    const scrollContainer = document.querySelector('.mobile-info-scroll');
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
}

// Закрыть overlay
function closeMobileInfo() {
    const overlay = document.getElementById('mobileInfoOverlay');
    overlay.classList.remove('active');
    
    // Разблокируем скролл body
    document.body.style.overflow = '';
}

// Экспортируем функции в глобальную область
window.initCarousel = initCarousel;
window.showProject = showProject;
window.nextProject = nextProject;
window.prevProject = prevProject;