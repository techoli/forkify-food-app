import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './View';

class sResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMmessage = 'Recipe  not found please try another';

  _generateMarkup() {
    return this._data.map(res => previewView.render(res, false)).join('');
  }
}

export default new sResultView();
