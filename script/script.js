document.addEventListener('DOMContentLoaded', function() {
  // 'use strict';

  const btnOpenModal = document.querySelector('.btn-outline-danger');
  const modalBlock = document.querySelector('#modalBlock');
  const modalWrap = document.querySelector('.modal');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');

  let clientWidth = document.documentElement.clientWidth;

  if (!(clientWidth < 768)) {
    burgerBtn.style.display = 'none';
  }
  window.addEventListener('resize', function() {
    clientWidth = document.documentElement.clientWidth;
    if (clientWidth < 768) {
      burgerBtn.style.display = '';
    } else {
      burgerBtn.style.display = 'none';
    }
  })
  
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.add('active');
    modalBlock.classList.add('d-block');
    playTest();
  })
  btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    playTest();
  })
  
  closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  })
  
  document.addEventListener('click', function(event) {
    if (
      !event.target.closest('.modal-dialog') &&
      !event.target.closest('.openModalButton') &&
      !event.target.closest('.burger') 
    ) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');
    }
  })

  const playTest = () => {
    const renderQuestions = () => {
      questionTitle.textContent = 'Какого цвета бургер вы хотите?';
      const name = 'Стандарт';
      // const name1 = 'Черный';
      const img = './image/burger.png';
      // const img1 = './image/burgerBlack.png';

      formAnswers.innerHTML = `
      <div class="answers-item d-flex flex-column">
        <input type="radio" id="answerItem1" name="answer" class="d-none">
        <label for="answerItem1" class="d-flex flex-column justify-content-between">
          <img class="answerImg" src="${img}" alt="burger">
          <span>${name}</span>
        </label>
      </div>
      `;
    }
    renderQuestions();
  }
  

  // console.dir(btnOpenModal);
  
})