const monthTitle = document.getElementById("monthTitle");
const calendarBody = document.getElementById("calendarBody");

const months = [
    "Січень", "Лютий", "Березень", "Квітень",
    "Травень", "Червень", "Липень", "Серпень",
    "Вересень", "Жовтень", "Листопад", "Грудень"
];

let currentDate = new Date(2026, 2, 1);

const holidays = new Set(["3-8"]);
const purpleDays = new Set(["3-21"]);

function renderCalendar() {
    calendarBody.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthTitle.textContent = `${months[month]} ${year} рік`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startDay = firstDay.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const daysInMonth = lastDay.getDate();

    const prevMonthLastDay = new Date(year, month, 0).getDate();

    let date = 1;
    let nextMonthDate = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < startDay) {
                cell.textContent =
                    prevMonthLastDay - startDay + j + 1;
                cell.classList.add("other-month");
            }

            else if (date > daysInMonth) {
                cell.textContent = nextMonthDate++;
                cell.classList.add("other-month");
            }

            else {
                cell.textContent = date;

                const key = `${month + 1}-${date}`;

                if (j >= 5) {
                    cell.classList.add("weekend");
                }
                if (holidays.has(key)) {
                    cell.classList.add("holiday");
                }
                if (purpleDays.has(key)) {
                    cell.classList.add("birthday");
                }

                const today = new Date();

                if (
                    date === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                ) {
                    cell.classList.add("today");
                }

                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

document.getElementById("prevMonth")
    .addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

document.getElementById("nextMonth")
    .addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

renderCalendar();
