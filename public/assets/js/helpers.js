function initDragToScroll(slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  function onMouseDown(e) {
    isDown = true;
    slider.classList.add('active');
    startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }

  slider.addEventListener('mousedown', onMouseDown);
  slider.addEventListener('touchstart', onMouseDown);

  function onMouseLeave() {
    isDown = false;
    slider.classList.remove('active');
  }

  slider.addEventListener('mouseleave', onMouseLeave);

  function onMouseUp() {
    isDown = false;
    slider.classList.remove('active');
  }

  slider.addEventListener('mouseup', onMouseUp);
  slider.addEventListener('touchend', onMouseUp);

  function onMouseMove(e) {
    if(!isDown) return;
    e.preventDefault();
    const x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  }

  slider.addEventListener('mousemove', onMouseMove);
  slider.addEventListener('touchmove', onMouseMove);
}