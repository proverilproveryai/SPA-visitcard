// Загрузчик шаблонов
async function loadTemplates() {
    const templates = [
        'templates/section-hero.html',
        'templates/section-about.html',
        'templates/section-works.html',
        'templates/section-contacts.html'
    ];
    
    const sectionsWrapper = document.getElementById('sectionsWrapper');
    const loader = document.getElementById('loader');
    
    try {
        // Загружаем все шаблоны параллельно
        const templatePromises = templates.map(async (templatePath, index) => {
            try {
                const response = await fetch(templatePath);
                
                if (!response.ok) {
                    console.error(`Ошибка загрузки ${templatePath}: ${response.status}`);
                    // Возвращаем заглушку вместо ошибки
                    return `<section class="section" id="section${index + 1}">
                        <div style="color: white; text-align: center;">
                            <h2>Секция ${index + 1}</h2>
                            <p>Ошибка загрузки шаблона: ${templatePath}</p>
                        </div>
                    </section>`;
                }
                
                const html = await response.text();
                console.log(`Шаблон ${templatePath} загружен успешно`);
                return html;
                
            } catch (error) {
                console.error(`Ошибка при загрузке ${templatePath}:`, error);
                // Возвращаем заглушку
                return `<section class="section" id="section${index + 1}">
                    <div style="color: white; text-align: center;">
                        <h2>Секция ${index + 1}</h2>
                        <p>Ошибка загрузки</p>
                    </div>
                </section>`;
            }
        });
        
        const loadedTemplates = await Promise.all(templatePromises);
        
        // Вставляем все шаблоны
        sectionsWrapper.innerHTML = '';

        // Вставляем каждый шаблон отдельно через insertAdjacentHTML
            loadedTemplates.forEach((template, index) => {
                // Создаем временный контейнер для правильного парсинга
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = template;
                
                // Извлекаем section элемент
                const section = tempDiv.querySelector('.section');
                if (section) {
                    sectionsWrapper.appendChild(section);
                    console.log(`Секция ${index + 1} добавлена, содержит works-right:`, 
                                section.querySelector('.works-right') ? 'ДА' : 'НЕТ');
                }
            });
        
        // Инициализируем компоненты:
        initNavigation();
        initTitleAnimation();
        updateContactsData();
        initCarousel();
        initContactsInteraction();
        initHeroGradient();
        
        // Скрываем лоадер
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        }
        
    } catch (error) {
        console.error('Критическая ошибка загрузки шаблонов:', error);
        sectionsWrapper.innerHTML = `
            <section class="section" style="background: #1a1a2e;">
                <div class="error-message">
                    <h2>Ошибка загрузки сайта</h2>
                    <p>Не удалось загрузить содержимое.</p>
                    <p style="font-size: 0.9em; opacity: 0.7;">Детали: ${error.message}</p>
                </div>
            </section>
        `;
        
        if (loader) {
            loader.classList.add('hidden');
        }
    }
}

// Обновление данных контактов из data.js
function updateContactsData() {
    // Обновляем email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        if (portfolioData.contacts && portfolioData.contacts.email) {
            link.href = `mailto:${portfolioData.contacts.email}`;
            const valueEl = link.querySelector('.contact-value');
            if (valueEl) valueEl.textContent = portfolioData.contacts.email;
        }
    });
}

// Запускаем загрузку при старте
document.addEventListener('DOMContentLoaded', loadTemplates);