/**
 * Завантажує HTML-компонент у вказаний елемент,
 * потім викликає callback після вставки.
 */
function loadComponent(elementId, filePath, callback) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Помилка завантаження: ${filePath}`);
            return response.text();
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
            highlightActiveNav();
            if (typeof callback === 'function') callback();
        })
        .catch(err => {
            console.error(err);
            document.getElementById(elementId).innerHTML =
                `<p style="color:red;text-align:center;">Помилка завантаження компонента</p>`;
        });
}

//Підсвічує активний пункт навігації.
function highlightActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === current) link.classList.add('active');
    });
}

// Ініціалізація при завантаженні DOM
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');

    // Логіка сторінки "Забронювати"
    const locationFilter = document.querySelector('.location-filter');
    if (locationFilter) {
        initLocationFilter();
    }

    // Логіка зірочок (обране)
    document.addEventListener('click', e => {
        if (e.target.closest('.star-icon')) {
            e.target.closest('.star-icon').classList.toggle('active');
        }
    });

    // Лічильники для сторінки деталей
    document.querySelectorAll('.counter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input[type="number"]');
            const step = parseInt(input.step) || 1;
            const min  = parseInt(input.min) ?? 0;
            const max  = parseInt(input.max) ?? 99;
            let val = parseInt(input.value) || 0;

            if (btn.dataset.dir === 'up')   val = Math.min(max, val + step);
            if (btn.dataset.dir === 'down') val = Math.max(min, val - step);
            input.value = val;
        });
    });
});

// Фільтр місцерозташування на сторінці booking.html
function initLocationFilter() {
    const filter   = document.querySelector('.location-filter');
    const dropdown = document.querySelector('.location-dropdown');
    const cards    = document.querySelectorAll('.booking-card');

    if (!filter || !dropdown) return;

    // Відкрити/закрити список
    filter.addEventListener('click', () => {
        filter.classList.toggle('open');
        dropdown.classList.toggle('visible');
    });

    // Вибір пункту
    dropdown.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const selected = item.dataset.location;

            // Оновити текст фільтра
            filter.querySelector('span:first-child').textContent = item.textContent;
            dropdown.querySelectorAll('li').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');

            // Закрити список
            filter.classList.remove('open');
            dropdown.classList.remove('visible');

            // Фільтрувати картки
            cards.forEach(card => {
                if (!selected || selected === 'all' || card.dataset.location === selected) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Закрити при кліку поза фільтром
    document.addEventListener('click', e => {
        if (!filter.contains(e.target) && !dropdown.contains(e.target)) {
            filter.classList.remove('open');
            dropdown.classList.remove('visible');
        }
    });
}