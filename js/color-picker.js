// Color Picker функционал
document.addEventListener('DOMContentLoaded', function() {
    const colorSquare = document.getElementById('colorSquare');
    const colorValue = document.getElementById('colorValue');
    
    if (!colorSquare || !colorValue) {
        console.warn('Color picker elements not found');
        return;
    }
    
    let isPickerActive = true;
    
    // Функция для получения цвета под курсором
    function getColorAtPoint(x, y) {
        const element = document.elementFromPoint(x, y);
        if (!element) return null;
        
        const computed = window.getComputedStyle(element);
        
        // Пробуем разные свойства в порядке приоритета
        let color = computed.backgroundColor;
        
        // Если фон прозрачный, ищем родителя с цветом
        if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
            let parent = element.parentElement;
            while (parent && parent !== document.body) {
                const parentStyle = window.getComputedStyle(parent);
                if (parentStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
                    parentStyle.backgroundColor !== 'transparent') {
                    color = parentStyle.backgroundColor;
                    break;
                }
                parent = parent.parentElement;
            }
        }
        
        // Если всё ещё нет цвета, берем цвет body
        if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
            color = window.getComputedStyle(document.body).backgroundColor || 'rgb(255, 255, 255)';
        }
        
        return color;
    }
    
    // Конвертация RGB в HEX
    function rgbToHex(rgb) {
        if (!rgb) return '#FFFFFF';
        
        const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return '#FFFFFF';
        
        const hex = (x) => {
            const h = parseInt(x).toString(16);
            return h.length === 1 ? '0' + h : h;
        };
        
        return '#' + hex(match[1]) + hex(match[2]) + hex(match[3]).toUpperCase();
    }
    
    // Обработчик движения мыши
    document.addEventListener('mousemove', function(e) {
        if (!isPickerActive) return;
        
        // Игнорируем сам color picker
        if (e.target === colorSquare || e.target === colorValue || 
            e.target.closest('.global-color-picker')) {
            return;
        }
        
        const color = getColorAtPoint(e.clientX, e.clientY);
        if (color) {
            const hexColor = rgbToHex(color);
            colorSquare.style.backgroundColor = color;
            colorValue.textContent = hexColor;
        }
    });
    
    // Клик на квадрат для вкл/выкл
    colorSquare.addEventListener('click', function() {
        isPickerActive = !isPickerActive;
        colorSquare.style.opacity = isPickerActive ? '1' : '0.5';
    });
});