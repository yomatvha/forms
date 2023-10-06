import Tooltip from './tooltip';

const form = document.querySelector('.form');

const errors = {
  login: {
    valueMissing: 'Представьтесь, пожалуйста!',
  },
  email: {
    valueMissing: 'Нам потребуется электропочта...',
    typeMismatch: 'А это точно электропочта?',
  },
  'credit-card': {
    valueMissing: 'Предоставьте нам данные своей кредитной карты, это безопасно, честно',
    patternMismatch: 'Не удалось снять данные с вашей кредитной карты :(',
  },
};

const tooltipFactory = new Tooltip();
let actualMessages = [];

const showTooltip = (message, el) => {
  actualMessages.push({
    name: el.name,
    id: tooltipFactory.showTooltip(message, el),
  });
};

const getError = (el) => {
  const errorKey = Object.keys(ValidityState.prototype).find((key) => {
    if (!el.name) return;
    if (key === 'valid') return;

    return el.validity[key];
  });

  if (!errorKey) return;

  return errors[el.name][errorKey];
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  actualMessages.forEach((message) => tooltipFactory.removeTooltip(message.id));
  actualMessages = [];

  const { elements } = form;

  [...elements].some((elem) => {
    const error = getError(elem);

    if (error) {
      showTooltip(error, elem);
      return true;
    }
  });
});

document.addEventListener('click', () => {
  // e.preventDefault();

  actualMessages.forEach((message) => tooltipFactory.removeTooltip(message.id));
  actualMessages = [];
});
