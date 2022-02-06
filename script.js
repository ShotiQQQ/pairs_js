document.addEventListener('DOMContentLoaded', () => {
  const getInfo = function () {
    const upperBlock = document.createElement('div');
    const h1 = document.createElement('h1');
    const span = document.createElement('span');
    const input = document.createElement('input');
    const button = document.createElement('button');

    upperBlock.classList.add('upper__block');

    h1.textContent = ('Добро пожаловать в увлекательную игру - Пары!');

    input.placeholder = 'Введите чётное число от 2 до 10';
    input.type = 'number';

    span.textContent = ('Введите чётное число от 2 до 10: ');

    button.classList.add('pairs__btn');
    button.classList.add('pairs__btn--is-active');
    button.textContent = ('Начать игру');

    document.body.append(h1, upperBlock);
    upperBlock.append(span, input, button);

    let infoCount;

    button.addEventListener('click', () => {
      if (input.value) {
        if((input.value < 2) && (input.value > 10) || (input.value % 2)) {
          infoCount = 4;
          while (document.body.lastChild) {
            document.body.lastChild.remove();
          }
          addVisual(infoCount)
        } else {
          infoCount = input.value;
          while (document.body.lastChild) {
            document.body.lastChild.remove();
          }
          addVisual(infoCount);
        }
      } else {
        alert('Вы ничего не ввели. Попробуйте снова');
      }
    });
  }

  getInfo();

  const addVisual = (infoCount) => {
    let countLenght = infoCount * infoCount;
    let amountBlocks = [];

    for (let i = 0; i < (countLenght / 2); i++) {
      amountBlocks.push(i);
      amountBlocks.push(i);
    }

    for (let i = amountBlocks.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [amountBlocks[i], amountBlocks[j]] = [amountBlocks[j], amountBlocks[i]];
    }
    const pairs = document.createElement('ul');
    const btn = document.createElement('button');
    const timer = document.createElement('span');

    let timerCount = 60;

    btn.textContent = ('Сыграть ещё раз');
    btn.classList.add('pairs__btn');
    btn.id = ('pairs__btn');
    pairs.classList.add('pairs');
    timer.textContent = `${timerCount}sec`;
    timer.classList.add('timer');
    timer.id = 'timer';
    document.body.append(pairs, btn, timer);

    let timerId = setInterval(() => {
      timerCount -= 1;
      timer.textContent = `${timerCount}sec`;
      if (timerCount === 0) {
        deleteAll();
      }
    }, 1000)

    let cardsCount = 0;

    for (key in amountBlocks) {
      cardsCount += 1;
      let pairsCard = document.createElement('li');
      let num = document.createElement('span');
      let br = document.createElement('br');
      num.textContent = amountBlocks[key]
      num.classList.add('card__number');
      pairsCard.classList.add('pairs__card');
      pairsCard.id = key;
      pairs.append(pairsCard);
      pairsCard.append(num);
      if (+cardsCount === +infoCount) {
        pairs.append(br);
        cardsCount = 0;
      }
    }

    let arrCards = []
    let count = 0;

    let penult;
    let last;

    document.querySelector('.pairs').addEventListener('click', (event) => {
      event.target.classList.add('pairs__card--is-active');
      let pairsCard = event.target.children[0];
      pairsCard.classList.add('card__number--is-active')
      arrCards.push(pairsCard)
      count += 1;
      penult = arrCards.length - 2;
      last = arrCards.length - 1;


      const deleteLast = () => {
        count = 0;
        arrCards[penult].classList.remove('card__number--is-active');
        arrCards[penult].parentNode.classList.remove('pairs__card--is-active');
        arrCards[last].classList.remove('card__number--is-active');
        arrCards[last].parentNode.classList.remove('pairs__card--is-active');
        arrCards.splice(penult, 2);
        if (arrCards.length === countLenght) {
          setTimeout(() => {
            document.getElementById('pairs__btn').classList.add('pairs__btn--is-active');
          }, 1000)
          document.getElementById('pairs__btn').addEventListener('click', deleteAll());
        }
    }

      if (count === 2) {
        if (arrCards[penult].textContent !== arrCards[last].textContent) {
          count = 0;
          setTimeout(deleteLast, 1000)
        }
      }
      if (count === 2) {
        count = 0;
        if (arrCards[last].offsetParent.id === arrCards[penult].offsetParent.id) {
          deleteLast();
        }
      }

      if (arrCards.length === amountBlocks.length) {
        setTimeout(() => {
          document.getElementById('pairs__btn').classList.add('pairs__btn--is-active');
        }, 1000)
        document.getElementById('pairs__btn').addEventListener('click', deleteAll)
      }
    })
    };

    const deleteAll = (infoCount) => {
      while (document.body.lastChild) {
        document.body.lastChild.remove();
      }
      arrCards = [];
      getInfo();
    }

});

