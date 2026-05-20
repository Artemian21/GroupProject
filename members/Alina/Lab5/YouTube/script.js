/* перемикає міні-режим бокової панелі */
document.getElementById('menuToggle').addEventListener('click', () => {
  document.body.classList.toggle('mini-sidebar');
});

/* кнопки прокрутки ліво/право */
const chipsScroll = document.getElementById('chipsScroll');
const btnPrev     = document.getElementById('chipsPrev');
const btnNext     = document.getElementById('chipsNext');
const SCROLL_STEP = 260;

/* Показує/ховає кнопки залежно від поточної позиції прокрутки */
function syncChipsBtns() {
  const { scrollLeft, scrollWidth, clientWidth } = chipsScroll;
  btnPrev.classList.toggle('hidden', scrollLeft <= 2);
  btnNext.classList.toggle('hidden', scrollLeft + clientWidth >= scrollWidth - 2);
}

btnPrev.addEventListener('click', () => chipsScroll.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' }));
btnNext.addEventListener('click', () => chipsScroll.scrollBy({ left:  SCROLL_STEP, behavior: 'smooth' }));
chipsScroll.addEventListener('scroll', syncChipsBtns, { passive: true });
window.addEventListener('resize', syncChipsBtns);
syncChipsBtns(); /* початковий стан */

/* виділяє активний Фільтр */
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});