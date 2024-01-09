function compareInit(compare) {
  const wrap = compare.querySelector('.compare__img--wrap.before');

  let clicked = 0;
  let h = compare.offsetHeight;
  let w = compare.offsetWidth;

  const slider = document.createElement('DIV');
  slider.setAttribute('class', 'compare__slider');
  slider.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <g filter="url(#filter0_dd_166_1760)">
      <path d="M17.7266 23.182L9.54474 15.0002L17.7266 6.81836" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <filter id="filter0_dd_166_1760" x="5.04297" y="2.31836" width="17.1836" height="26.3638" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="-1" dy="-1"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_166_1760"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="1" dy="2"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
      <feBlend mode="normal" in2="effect1_dropShadow_166_1760" result="effect2_dropShadow_166_1760"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_166_1760" result="shape"/>
      </filter>
      </defs>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <g filter="url(#filter0_dd_166_1759)">
      <path d="M12.2734 6.81801L20.4553 14.9998L12.2734 23.1816" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
      <defs>
      <filter id="filter0_dd_166_1759" x="7.77344" y="2.31787" width="17.1836" height="26.3638" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="-1" dy="-1"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_166_1759"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="1" dy="2"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
      <feBlend mode="normal" in2="effect1_dropShadow_166_1759" result="effect2_dropShadow_166_1759"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_166_1759" result="shape"/>
      </filter>
      </defs>
      </svg>
    `;

  wrap.parentElement.insertBefore(slider, wrap);

  slider.style.top = `${(h / 2) - (slider.offsetHeight / 2)}px`;
  slider.style.left = `${(w / 2) - (slider.offsetWidth / 2)}px`;

  function setWidth() {
    wrap.style.width = '';

    w = compare.offsetWidth;
    h = compare.offsetHeight;

    wrap.querySelector('img').style.width = `${w}px`;

    wrap.style.width = `${w / 2}px`;

    slider.style.top = `${(h / 2) - (slider.offsetHeight / 2)}px`;
    slider.style.left = `${(w / 2) - (slider.offsetWidth / 2)}px`;
  }
  setWidth();

  function getCursorPos(event) {
    let x = 0;
    let e = event;
    e = (e.changedTouches) ? e.changedTouches[0] : e;
    const a = wrap.getBoundingClientRect();
    x = e.pageX - a.left;
    x -= window.scrollX;
    console.info(e.target);
    return x;
  }

  function slide(x) {
    wrap.style.width = `${x}px`;
    slider.style.left = `${wrap.offsetWidth - (slider.offsetWidth / 2)}px`;
  }

  function slideMove(e) {
    e.stopPropagation();
    console.info(e.target);

    let pos;
    if (clicked === 0) {
      return false;
    }
    pos = getCursorPos(e);
    if (pos < 0) pos = 0;
    if (pos > w) pos = w;
    slide(pos);
    return true;
  }

  function slideReady(e) {
    e.preventDefault();
    clicked = 1;
    compare.addEventListener('mousemove', slideMove);
    compare.addEventListener('touchmove', slideMove);
  }

  function slideFinish() {
    /* ползунок больше не нажимается: */
    clicked = 0;
  }

  slider.addEventListener('mousedown', slideReady);
  window.addEventListener('mouseup', slideFinish);
  slider.addEventListener('touchstart', slideReady);
  window.addEventListener('touchend', slideFinish);

  window.addEventListener('resize', setWidth);
}

document.addEventListener('DOMContentLoaded', () => {
  const compareAll = document.querySelectorAll('.compare');
  compareAll.forEach((compare) => {
    compareInit(compare);
  });
}, false);
