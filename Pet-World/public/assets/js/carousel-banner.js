document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.carousel-slide');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const btnStartPause = document.getElementById('btnStartPause');
  const imgStartPause = document.getElementById('imgStartPause');

  let isTransitioning = false;

  nextBtn.addEventListener('click', () => {
    if (!isTransitioning) {
      isTransitioning = true;
      slider.style.transition = 'transform 900ms';
      slider.style.transform = 'translate(-25%)';
    }
  });

  prevBtn.addEventListener('click', () => {
    if (!isTransitioning) {
      isTransitioning = true;
      slider.insertBefore(slider.lastElementChild, slider.firstElementChild);
      slider.style.transition = 'none';
      slider.style.transform = 'translate(-25%)';
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
      if (slider.style.transform === 'translate(-25%)') {
        slider.appendChild(slider.firstElementChild);
      }
      slider.style.transform = 'translate(0)';
      setTimeout(() => {
        slider.style.transition = 'transform 900ms';
        isTransitioning = false;
      });
    }
  });

  function autoAdvanceSlide() {
    nextBtn.click();
  }

  var intervalId;
  var isPaused = false;

  function startAutoAdvance() {
    clearTimeout(intervalId);

    if (!isPaused) {
      intervalId = setTimeout(function () {
        autoAdvanceSlide();
        startAutoAdvance();
      }, 5000);
    }
  }

  startAutoAdvance();

  slider.addEventListener('mouseenter', function () {
    clearTimeout(intervalId);
  });

  slider.addEventListener('mouseleave', function () {
    startAutoAdvance();
  });

  prevBtn.addEventListener('mouseenter', function () {
    clearTimeout(intervalId);
  });

  prevBtn.addEventListener('mouseleave', function () {
    startAutoAdvance();
  });

  nextBtn.addEventListener('mouseenter', function () {
    clearTimeout(intervalId);
  });

  nextBtn.addEventListener('mouseleave', function () {
    startAutoAdvance();
  });

  btnStartPause.addEventListener('click', function () {
    isPaused = !isPaused;
    btnStartPause.classList.toggle('paused', isPaused);
    imgStartPause.src = './assets/img/play_circle.svg';

    if (!isPaused) {
      imgStartPause.src = './assets/img/pause_circle.svg';
      startAutoAdvance();
    }
  });
});
