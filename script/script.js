document.addEventListener('DOMContentLoaded', function() {
  // 'use strict';

  const btnOpenModal = document.querySelector('.btn-outline-danger');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');


  const questions = [
    {
      question: 'Какого цвета бургер вы хотите?',
      answers: [
        {
          id: 0,
          title: 'Стандарт',
          url: './image/burger.png'
        },
        {
          id: 1,
          title: 'Черный',
          url: './image/burgerBlack.png'
        }
      ],
      type: 'radio'
    },
    {
      question: 'Из какого мяса котлета?',
      answers: [
        {
          id: 0,
          title: 'Курица',
          url: './image/chickenMeat.png'
        },
        {
          id: 1,
          title: 'Говядина',
          url: './image/beefMeat.png'
        },
        {
          id: 2,
          title: 'Свинина',
          url: './image/porkMeat.png'
        }
      ],
      type: 'radio'
    },
    {
      question: 'Дополнительные игнредиенты?',
      answers: [
        {
          id: 0,
          title: 'Помидор',
          url: './image/tomato.png'
        },
        {
          id: 1,
          title: 'Огурец',
          url: './image/cucumber.png'
        },
        {
          id: 2,
          title: 'Салат',
          url: './image/salad.png'
        },
        {
          id: 3,
          title: 'Лук',
          url: './image/onion.png'
        }
      ],
      type: 'checkbox'
    },
    {
      question: 'Добавить соус?',
      answers: [
        {
          id: 0,
          title: 'Чесночный',
          url: './image/sauce1.png'
        },
        {
          id: 1,
          title: 'Томатный',
          url: './image/sauce2.png'
        },
        {
          id: 2,
          title: 'Горчичный',
          url: './image/sauce3.png'
        }
      ],
      type: 'radio'
    }
  ];

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

    let numberQuestion = 0;

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');

        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

        answerItem.innerHTML = `
        <input type="${questions[index].type}" id="${answer.id}" name="answer" class="d-none">
        <label for="${answer.id}" class="d-flex flex-column justify-content-between">
          <img class="answerImg" src="${answer.url}" alt="burger">
          <span>${answer.title}</span>
        </label>
        `;
        formAnswers.appendChild(answerItem);
      })
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = '';

      if (numberQuestion <= 0) {
        prevBtn.style.display = 'none';
      } else {
        prevBtn.style.display = '';
      }

      if (numberQuestion >= (questions.length-1)) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = '';
      }

      questionTitle.textContent = `${questions[indexQuestion].question}`;

      renderAnswers(indexQuestion);
    }
    renderQuestions(numberQuestion);

    nextBtn.onclick = () => {
      numberQuestion++;
      renderQuestions(numberQuestion);
    }
    
    prevBtn.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    }
  }
  // console.dir(btnOpenModal);
})