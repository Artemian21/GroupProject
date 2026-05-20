(function () {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    // Отримуємо відносний шлях з атрибута
    const root = placeholder.dataset.root ?? './';

    // --- ДОДАНО: Автоматичне підключення файлу стилів ---
    // Вкажіть правильний шлях до вашого CSS відносно кореня проєкту
    const stylePath = root + 'css/header.css'; 
    
    // Перевіряємо, чи не підключений цей файл стилів раніше, щоб не дублювати
    if (!document.querySelector(`link[href="${stylePath}"]`)) {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = stylePath;
        document.head.appendChild(linkElement);
    }
    // -----------------------------------------------------

    fetch(root + 'header.html')
        .then(res => {
            if (!res.ok) throw new Error('Не вдалося завантажити header.html');
            return res.text();
        })
        .then(html => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const header = doc.querySelector('header');
            
            if (header) {
                // Оновлюємо посилання на головну сторінку, щоб воно працювало звідусіль
                const homeLink = header.querySelector('a[href="/index.html"], a[href="../../index.html"]');
                if (homeLink) {
                    homeLink.href = root + 'index.html'; 
                }

                placeholder.replaceWith(header);
            } else {
                console.warn('header.js: тег <header> не знайдено у header.html');
            }
        })
        .catch(err => console.error('header.js:', err));
})();