// Анимация смены шрифтов для заголовка

// Массив шрифтов
const allfonts = [
    "'Alegreya', serif",
    "'Anonymous Pro', monospace",
    "'Comfortaa', cursive",
    "'Cormorant Garamond', serif",
    "'Cormorant SC', serif",
    "'Didact Gothic', sans-serif",
    "'Jost', sans-serif",
    "'Merriweather', serif",
    "'Montserrat Alternates', sans-serif",
    "'Playfair Display', serif",
    "'Poiret One', cursive",
    "'Prosto One', cursive",
    "'Roboto', sans-serif",
    "'Roboto Slab', serif",
    "'Russo One', sans-serif",
    "'Unbounded', cursive"
];

let animateInterval = null;

// Функция смены шрифта
function variablefonts() {
    const animatetitle = document.getElementById('animate-title');
    
    if (!animatetitle) {
        console.warn('Элемент animate-title не найден');
        return;
    }
    
    let randomfont = Math.floor(Math.random() * allfonts.length);
    animatetitle.style.fontFamily = allfonts[randomfont];
}

// Функция инициализации анимации
function initTitleAnimation() {
    console.log('Инициализация анимации заголовка...');
    
    // Очищаем предыдущий интервал если есть
    if (animateInterval) {
        clearInterval(animateInterval);
    }
    
    const animatetitle = document.getElementById('animate-title');
    
    if (animatetitle) {
        console.log('Элемент animate-title найден, запускаем анимацию');
        // Сразу применяем первый шрифт
        variablefonts();
        // Меняем шрифт каждые 500мс
        animateInterval = setInterval(variablefonts, 100);
    } else {
        console.warn('Элемент animate-title не найден при инициализации');
    }
}

// Экспортируем в глобальную область
window.initTitleAnimation = initTitleAnimation;