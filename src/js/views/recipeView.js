import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './View';
// console.log(fractional);

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMmessage = 'Something Happened, please check your network and retry';

  _message = '';

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;
      btn.dataset.serveto;
      console.log(btn.dataset.serveto);

      handler(+btn.dataset.serveto);
    });
  }

  addHandlerbookmark(handle) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--round');
      console.log(btn);
      handle();
    });
  }
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  _generateMarkup() {
    return `
  <figure class="recipe__fig">
    <img crossorigin="anonymous" src='${this._data.imageUrl}' alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingtime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button data-serveto = "${
          this._data.servings - 1
        }" class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button data-serveto = "${
          this._data.servings + 1
        }" class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
      <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
    </div>
    <button class="btn--round btn---anything">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(ings => this._renderMarkupIng(ings)).join('')}
      

      
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${this._data.publisher}. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
  _renderMarkupIng(ing) {
    return `<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${
    ing.quantity ? new Fraction(ing.quantity).toString() : ''
  }</div>
  <div class="recipe__description">
    <span class="recipe__unit">${ing.unit}</span>${ing.description}
  </div>
</li>`;
  }
}

export default new RecipeView();
