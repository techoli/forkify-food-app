import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './View';

class addrecipeView extends View {
  //   _parentElement = document.querySelector('.results');

  _openModal = document.querySelector('.nav__btn');
  _closeModal = document.querySelector('.btn--close-modal');
  _overLay = document.querySelector('.overlay');
  _recWindow = document.querySelector('.add-recipe-window');
  _parentElement = document.querySelector('.upload');

  constructor() {
    super();
    this._handleOpenModal();
    this._handleCloseModal();
    // this._handleUploadrecipe(handle);
  }

  _handleOpenModal() {
    this._openModal.addEventListener('click', this._togglemodal.bind(this));
  }
  _handleCloseModal() {
    this._closeModal.addEventListener('click', this._togglemodal.bind(this));
    this._overLay.addEventListener('click', this._togglemodal.bind(this));
  }

  _togglemodal() {
    this._recWindow.classList.toggle('hidden');
    this._overLay.classList.toggle('hidden');
  }

  _handleUploadrecipe(handle) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      console.log(data);
      handle(data);
    });
  }
}

export default new addrecipeView();
