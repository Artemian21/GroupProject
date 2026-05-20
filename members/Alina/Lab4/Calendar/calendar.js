        // День народження
        const BIRTHDAY_MONTH = 1;
        const BIRTHDAY_DAY   = 10;

        const HOLIDAYS = {
            '1-1':  true,   // Новий рік
            '1-7':  true,   // Різдво
            '3-8':  true,   // 8 березня
            '5-1':  true,   // День праці
            '5-9':  true,   // День перемоги
            '6-28': true,   // День Конституції
            '8-24': true,   // День незалежності
            '10-14':true,   // День захисника
            '12-25':true,   // Різдво 
            '2-14': true,   // День Святого Валентина
        };

        const MONTHS = [
            'Січень','Лютий','Березень','Квітень',
            'Травень','Червень','Липень','Серпень',
            'Вересень','Жовтень','Листопад','Грудень'
        ];

        // Початковий - день народження
        let current = { year: 2026, month: BIRTHDAY_MONTH };

        function isHoliday(year, month, day) {
            return HOLIDAYS[`${month + 1}-${day}`] === true;
        }

        // Повертає день тижня Пн=0 … Нд=6
        function weekdayMon(date) {
            return (date.getDay() + 6) % 7;
        }

        function buildCalendar(year, month) {
            const tbody = document.getElementById('calendar-body');
            tbody.innerHTML = '';

            const firstDay   = new Date(year, month, 1);
            const lastDay    = new Date(year, month + 1, 0);
            const startOffset = weekdayMon(firstDay); // скільки днів з попереднього місяця
            const totalCells  = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;

            let date = new Date(year, month, 1 - startOffset);

            for (let row = 0; row < totalCells / 7; row++) {
                const tr = document.createElement('tr');

                for (let col = 0; col < 7; col++) {
                    const td = document.createElement('td');
                    const d  = date.getDate();
                    const m  = date.getMonth();
                    const y  = date.getFullYear();

                    td.textContent = d;

                    if (m !== month) {
                        // день іншого місяця
                        td.setAttribute('data-other', '');
                    } else {
                        if (isHoliday(y, m, d)) {
                            td.setAttribute('data-holiday', '');
                        }
                        if (m === BIRTHDAY_MONTH && d === BIRTHDAY_DAY) {
                            td.setAttribute('data-birthday', '');
                        }
                    }

                    tr.appendChild(td);
                    date.setDate(date.getDate() + 1);
                }

                tbody.appendChild(tr);
            }

            // Заголовок
            const label = `${MONTHS[month]} ${year}`;
            document.getElementById('month-title').textContent = label;
        }

        document.getElementById('prev').addEventListener('click', () => {
            current.month--;
            if (current.month < 0) { current.month = 11; current.year--; }
            buildCalendar(current.year, current.month);
        });

        document.getElementById('next').addEventListener('click', () => {
            current.month++;
            if (current.month > 11) { current.month = 0; current.year++; }
            buildCalendar(current.year, current.month);
        });

        buildCalendar(current.year, current.month);