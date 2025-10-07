// Переменные для управления скроллом
let currentSection = 1;
const totalSections = 4;
let isScrolling = false;
const scrollDelay = 30;

// Элементы DOM
let sectionsWrapper = null;
let navDots = null;

// Функция перехода к секции
function goToSection(sectionNumber) {
    if (sectionNumber < 1 || sectionNumber > totalSections || isScrolling) return;
    
    isScrolling = true;
    currentSection = sectionNumber;
    
    // Обновляем позицию
    const translateY = -(sectionNumber - 1) * 100;
    sectionsWrapper.style.transform = `translateY(${translateY}vh)`;
    
    // Обновляем навигационные точки
    navDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === sectionNumber - 1);
    });
    
    // Снимаем блокировку скролла
    setTimeout(() => {
        isScrolling = false;
    }, scrollDelay);
}

// ВАЖНО: Добавляем функцию initNavigation
function initNavigation() {
    // Получаем элементы DOM
    sectionsWrapper = document.querySelector('.sections-wrapper');
    navDots = document.querySelectorAll('.nav-dot');
    
    if (!sectionsWrapper || !navDots.length) {
        console.error('Не найдены необходимые элементы DOM');
        return;
    }
    
    console.log('Навигация инициализирована. Найдено секций:', document.querySelectorAll('.section').length);
    
    // Обработка скролла колесом мыши
    let scrollTimeout;
    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        if (isScrolling) return;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                goToSection(currentSection + 1);
            } else {
                goToSection(currentSection - 1);
            }
        }, 50);
    }, { passive: false });
    
    // Обработка клавиш
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            goToSection(currentSection + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            goToSection(currentSection - 1);
        }
    });
    
    // Навигация по точкам
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSection(index + 1);
        });
    });
    
    // Touch события для мобильных устройств
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        const swipeDistance = touchStartY - touchEndY;
        
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                goToSection(currentSection + 1);
            } else {
                goToSection(currentSection - 1);
            }
        }
    });

    initTickerNavigation();
}

function initTickerNavigation() {
    const tickerButtons = document.querySelectorAll('.ticker-nav-btn');
    const tickerContent = document.getElementById('tickerContent');
    
    // Тексты для каждой секции
    const tickerTexts = {
        1: 'MAIN • ГЛАВНАЯ • MAIN • ГЛАВНАЯ • MAIN • ГЛАВНАЯ • ',
        2: 'ABOUT • О СЕБЕ • ABOUT • О СЕБЕ • ABOUT • О СЕБЕ • ',
        3: 'WORKS • РАБОТЫ • WORKS • РАБОТЫ • WORKS • РАБОТЫ • ',
        4: 'CONTACTS • КОНТАКТЫ • CONTACTS • КОНТАКТЫ • CONTACTS • КОНТАКТЫ • '
    };
    
    // Функция обновления текста бегущей строки
    function updateTickerText(sectionNumber) {
        const newText = tickerTexts[sectionNumber];
        // Создаем больше копий для непрерывности
        let repeatedText = '';
        for(let i = 0; i < 10; i++) {
            repeatedText += `<span>${newText}</span>`;
        }
        tickerContent.innerHTML = repeatedText;
        
        // Перезапускаем анимацию
        tickerContent.style.animation = 'none';
        setTimeout(() => {
            tickerContent.style.animation = 'ticker 25s linear infinite';
        }, 10);
    }
    
    // Обработчики для кнопок в бегущей строке
    tickerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionNumber = parseInt(button.dataset.section);
            goToSection(sectionNumber);
        });
    });
    
    // Обновляем активную кнопку при смене секции
    const originalGoToSection = window.goToSection;
    window.goToSection = function(sectionNumber) {
        if (sectionNumber < 1 || sectionNumber > totalSections || isScrolling) return;
        
        // Вызываем оригинальную функцию
        originalGoToSection(sectionNumber);
        
        // Обновляем кнопки в бегущей строке
        tickerButtons.forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.section) === sectionNumber);
        });
        
        // Обновляем текст бегущей строки
        updateTickerText(sectionNumber);
    };
}

// Интерактивный градиент на hero-секции
function initHeroGradient() {
    const gradientOverlay = document.querySelector('.hero-gradient-overlay');
    if (!gradientOverlay) return;
    
    // Для десктопа - следует за курсором
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            gradientOverlay.style.background = `radial-gradient(
                circle at ${x}% ${y}%,
                rgba(102, 126, 234, 0.15) 0%,
                rgba(118, 75, 162, 0.1) 30%,
                rgba(232, 232, 232, 0) 70%
            )`;
        });
    } else {
        // Для мобильных - случайное плавное перемещение
        let currentX = 50;
        let currentY = 50;
        let targetX = 50;
        let targetY = 50;
        
        function animateGradient() {
            // Плавно приближаемся к целевой позиции
            currentX += (targetX - currentX) * 0.05;
            currentY += (targetY - currentY) * 0.05;
            
            gradientOverlay.style.background = `radial-gradient(
                circle at ${currentX}% ${currentY}%,
                rgba(102, 126, 234, 0.15) 0%,
                rgba(118, 75, 162, 0.1) 30%,
                rgba(232, 232, 232, 0) 70%
            )`;
            
            requestAnimationFrame(animateGradient);
        }
        
        // Генерируем новую случайную точку каждые 3 секунды
        function setNewTarget() {
            targetX = Math.random() * 100; // 0-100%
            targetY = Math.random() * 100; // 0-100%
        }
        
        // Запускаем анимацию
        animateGradient();
        setNewTarget();
        setInterval(setNewTarget, 3000); // Новая точка каждые 3 секунды
    }
}

// Вызов функции
window.addEventListener('DOMContentLoaded', initHeroGradient);


// // Color Picker функционал
// document.addEventListener('DOMContentLoaded', function() {
//     const colorSquare = document.getElementById('colorSquare');
//     const colorValue = document.getElementById('colorValue');
    
//     if (colorSquare && colorValue) {
//         // Создаем canvas для захвата цвета
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d', { willReadFrequently: true });
//         canvas.width = 1;
//         canvas.height = 1;
        
//         document.addEventListener('mousemove', function(e) {
//             // Используем простой метод - берем computed style элемента под курсором
//             const element = document.elementFromPoint(e.clientX, e.clientY);
//             if (element) {
//                 const styles = window.getComputedStyle(element);
//                 const bgColor = styles.backgroundColor;
                
//                 if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
//                     // Конвертируем rgb в hex
//                     const rgb = bgColor.match(/\d+/g);
//                     if (rgb) {
//                         const hex = '#' + rgb.slice(0, 3).map(x => {
//                             const hex = parseInt(x).toString(16);
//                             return hex.length === 1 ? '0' + hex : hex;
//                         }).join('').toUpperCase();
                        
//                         colorSquare.style.backgroundColor = bgColor;
//                         colorValue.textContent = hex;
//                     }
//                 }
//             }
//         });
//     }
// });

// Экспортируем функцию в глобальную область
window.goToSection = goToSection;
window.initNavigation = initNavigation;
window.addEventListener('DOMContentLoaded', initHeroGradient);