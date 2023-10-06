export default class Tooltip {
  constructor() {
    this.tooltips = [];
  }

  showTooltip(message, element) {
    const tooltipElement = document.createElement('DIV');

    tooltipElement.classList.add('form-error');

    const id = performance.now();

    this.tooltips.push({
      id,
      element: tooltipElement,
    });

    document.body.appendChild(tooltipElement);

    const { left, top } = element.getBoundingClientRect();

    const tooltipTitle = document.createElement('DIV');
    tooltipTitle.classList.add('form-error-title');
    tooltipTitle.textContent = 'ОШИБКА!';
    tooltipElement.appendChild(tooltipTitle);

    const tooltipText = document.createElement('DIV');
    tooltipText.classList.add('form-error-text');
    tooltipText.textContent = message;
    tooltipElement.appendChild(tooltipText);

    tooltipElement.style.left = `${left + element.offsetWidth / 2 - tooltipElement.offsetWidth / 2}px`;
    tooltipElement.style.top = `${top - 8 - tooltipElement.offsetHeight}px`;

    const tooltipArrow = document.createElement('DIV');
    tooltipArrow.classList.add('form-error-arrow');
    tooltipElement.appendChild(tooltipArrow);

    return id;
  }

  removeTooltip(id) {
    const tooltip = this.tooltips.find((t) => t.id === id);

    tooltip.element.remove();

    this.tooltips = this.tooltips.filter((t) => t.id !== id);
  }
}
