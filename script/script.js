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
  const sendBtn = document.getElementById('send');


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

    const finalAnswers = [];

    let numberQuestion = 0;

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');

        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');

        answerItem.innerHTML = `
        <input type="${questions[index].type}" id="${answer.id}" name="answer" class="d-none" value="${answer.title}">
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

      switch (true) {
        case (numberQuestion >= 0 && numberQuestion <= questions.length - 1):
        // if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion);
          nextBtn.classList.remove('d-none');
          prevBtn.classList.remove('d-none');
          sendBtn.classList.add('d-none');
          break;
          // }
          // if (numberQuestion === 0) {
        case (numberQuestion === 0):
          prevBtn.classList.add('d-none');
          break;
        // }
        // if (numberQuestion === questions.length) {
        case (numberQuestion === questions.length):
          prevBtn.classList.add('d-none');
          nextBtn.classList.add('d-none');
          sendBtn.classList.remove('d-none');
          questionTitle.textContent= '';
          formAnswers.innerHTML= `
          <div class="form-group">
          <label for="numberPhone">Ввеите свой номер телефона</label>
          <input type="tel" class="form-control" id="numberPhone" placeholder="+7(xxx)xxx-xx-xx" required>
          </div>
          `;
          break;
        // }
        // if (numberQuestion === questions.length+1) {
        case (numberQuestion === questions.length+1):
          formAnswers.textContent= 'Спасибо!';
          sendBtn.classList.add('d-none');
          setTimeout(() => {
            modalBlock.classList.remove('d-block');
          }, 2000);
          break;
        // }
        default: 
          break;
      }
        
    }

    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
      
      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          obj[`Номер телефона: `] = input.value;
        }
      })

      finalAnswers.push(obj);
    }

    nextBtn.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    }
    
    prevBtn.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    }
    sendBtn.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    }
  }
  // console.dir(btnOpenModal);
})