// import icons from 'url:../../img/icons.svg';
import icons from '../../img/icons.svg';
export default class View {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const message = this._generateMarkup();
    if (!render) return message;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', message);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   return this.renderError();
    this._data = data;
    const newMessage = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMessage);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curElemet = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(curElemet);
    // console.log(newElement);

    newElement.forEach((newel, i) => {
      const curel = curElemet[i];
      // console.log(curel, newel.isEqualNode(curel));

      //update change TEXT
      if (
        !newel.isEqualNode(curel) &&
        newel.firstChild?.nodeValue.trim() !== ''
      ) {
        curel.textContent = newel.textContent;
      }
      //update change attribute
      if (!newel.isEqualNode(curel))
        Array.from(newel.attributes).forEach(attr =>
          curel.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const html = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }

  renderError(message = this._errorMmessage) {
    console.log(message);
    const html = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
  renderSuccessMess(message = this._message) {
    const html = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
