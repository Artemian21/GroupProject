(function () {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    const root = placeholder.dataset.root ?? './';

    // Підключаємо єдиний CSS проєкту
    const cssPath = root + 'css/style.css';
    if (!document.querySelector(`link[href="${cssPath}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
    }

    fetch(root + 'header.html')
        .then(res => {
            if (!res.ok) throw new Error('Не вдалося завантажити header.html');
            return res.text();
        })
        .then(html => {
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const header = doc.querySelector('header');
            if (!header) return;
            // Виправляємо посилання на головну незалежно від глибини вкладеності
            const homeLink = header.querySelector('a');
            if (homeLink) homeLink.href = root + 'index.html';
            placeholder.replaceWith(header);
        })
        .catch(err => console.error('header.js:', err));
})();