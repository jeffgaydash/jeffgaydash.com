(function () {
  const items    = Array.from(document.querySelectorAll('.gallery-item'));
  const overlay  = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbCap    = document.getElementById('lb-caption');
  const lbCount  = document.getElementById('lb-counter');
  const btnClose = document.getElementById('lb-close');
  const btnPrev  = document.getElementById('lb-prev');
  const btnNext  = document.getElementById('lb-next');

  let current = 0;

  function open(index) {
    current = index;
    show();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function show() {
    const item  = items[current];
    const img   = item.querySelector('img');
    const cap   = item.querySelector('.gallery-item-caption span');
    lbImg.src   = img.dataset.full || img.src;
    lbImg.alt   = img.alt;
    lbCap.textContent   = cap ? cap.textContent : '';
    lbCount.textContent = (current + 1) + ' / ' + items.length;
  }

  function prev() { current = (current - 1 + items.length) % items.length; show(); }
  function next() { current = (current + 1) % items.length; show(); }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i); });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });
}());
