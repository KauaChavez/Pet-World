document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.content-product');
  const prevBtn = document.querySelector('.prevBtnProducts');
  const nextBtn = document.querySelector('.nextBtnProducts');

  let isTransitioning = false;
  let cardWidth = 268; // Largura fixa do card
  let gap = 30; // Espaçamento entre os cards

  nextBtn.addEventListener('click', () => {
    if (!isTransitioning) {
      isTransitioning = true;
      slider.style.transition = 'transform 900ms';
      slider.style.transform = `translate(-${cardWidth + gap}px)`;
    }
  });

  prevBtn.addEventListener('click', () => {
    if (!isTransitioning) {
      isTransitioning = true;
      slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
      slider.style.transition = 'none';
      slider.style.transform = `translate(-${cardWidth + gap}px)`;
      setTimeout(() => {
        slider.style.transition = 'transform 900ms';
        slider.style.transform = 'translate(0)';
        isTransitioning = false;
      }, 0);
    }
  });

  slider.addEventListener('transitionend', () => {
    slider.style.transition = 'none';
    if (isTransitioning) {
      if (slider.style.transform === `translate(-${cardWidth + gap}px)`) {
        slider.appendChild(slider.firstElementChild);
      }
      slider.style.transform = 'translate(0)';
      setTimeout(() => {
        slider.style.transition = 'transform 900ms';
        isTransitioning = false;
      });
    }
  });

  updateSliderWidth();

  window.addEventListener('resize', updateSliderWidth);

  function updateSliderWidth() {
    const numCards = document.querySelectorAll('.product-card').length;

    const sliderWidth = (cardWidth + gap) * numCards;
    slider.style.width = `${sliderWidth}px`;
  }
});
