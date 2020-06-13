const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');
const selectPlanButtons = document.querySelectorAll('.plan button');
const noButton = modal.querySelector('.modal__action--negative');

const hideShowModal = (show) => {
  const value = show ? 'block' : 'none';
  modal.style.display = value;
  backdrop.style.display = value;
};

// console.dir(backdrop);
for (var i = 0; i < selectPlanButtons.length; i++) {
  selectPlanButtons[i].addEventListener(
    'click',
    hideShowModal.bind(this, true)
  );
}

backdrop.addEventListener('click', hideShowModal.bind(this, false));
noButton.addEventListener('click', hideShowModal.bind(this, false));
