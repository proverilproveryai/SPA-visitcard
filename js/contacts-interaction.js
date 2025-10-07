function initContactsInteraction() {
    console.log('Инициализация интерактива контактов...');
    
    // Добавляем эффект копирования при клике на email и телефон
    const contactValues = document.querySelectorAll('.contact-value');
    
    contactValues.forEach(value => {
        if (value.href && (value.href.startsWith('mailto:') || value.href.startsWith('tel:'))) {
            value.addEventListener('click', function(e) {
                e.preventDefault();
                
                const textToCopy = this.textContent.trim();
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Скопировано!';
                    this.style.color = '#4CAF50';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '';
                    }, 1500);
                }).catch(() => {
                    window.location.href = this.href;
                });
            });
        }
    });
}

// Экспортируем в глобальную область
window.initContactsInteraction = initContactsInteraction;