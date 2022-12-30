import View from './View';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const gotopage = +btn.dataset.goto;
      handler(gotopage);
      // console.log(+btn.dataset.goto);
      // console.log('pagination man');
    });
  }

  _generateMarkup() {
    const searchData = this._data;

    const divPage = Math.ceil(
      searchData.results.length / searchData.resPerpage
    );
    if (searchData.page === 1) {
      return `</button>
        <button data-goto ="${
          searchData.page + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${searchData.page + 1}</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </button>`;
    }
    if (searchData.page === divPage) {
      return `<button data-goto ="${
        searchData.page - 1
      }"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${searchData.page - 1}</span>
      </button>`;
    }
    if (searchData.page > 1 && searchData.page < divPage) {
      return `<button data-goto ="${
        searchData.page - 1
      }"class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-left"></use>
        </svg>
        <span>Page ${searchData.page - 1}</span>
      </button>
      <button data-goto ="${
        searchData.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${searchData.page + 1}</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    console.log(divPage);
  }
}
export default new PaginationView();
