import icons from 'url:../../img/icons.svg';
import View from './View';
import previewView from './previewView';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMmessage = 'No bookmarks yet. Find a nice recipe1111';

  addHandlerloadbookmark(handler) {
    window.addEventListener('load', function (e) {
      handler();
    });
  }

  _generateMarkup() {
    console.log(` this prev${this._data}`);
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}

export default new bookmarkView();
