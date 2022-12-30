import * as model from './model';
import RecipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import SearchView from './views/searchView';
import sResultView from './views/sResultView';
import PaginationView from './views/paginationView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
import addrecipeView from './views/addrecipeView';
import { TIMER_SEC_DELAY } from './config';

// const recipeContainer = document.querySelector('.recipe');
// const pagin = document.querySelector('.pagination');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // console.log(id);
    RecipeView.renderSpinner();

    sResultView.update(model.searchViewPage());
    // 1. load get recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    RecipeView.render(model.state.recipe);
    // bookmarkView.update(model.state.bookmark);

    //render recipe
  } catch (error) {
    RecipeView.renderError();
    console.log(error);
  }
};

const controlSearch = async function () {
  try {
    //get query item

    sResultView.renderSpinner();
    const query = SearchView.getQuery();
    if (!query) return;

    //search/load query item
    await model.loadSearcResult(query);

    //render query result
    console.log(model.state.search.results);
    // sResultView.render(model.state.search.results);
    sResultView.render(model.searchViewPage());
    PaginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
// controlSearch();

const controlPagination = function (pageno) {
  // render searchresult viewchange after pagination next/prev
  sResultView.render(model.searchViewPage(pageno));

  //render pagination  button change
  PaginationView.render(model.state.search);
  console.log('check if the pagination working');
};

const controlServings = function (newservings) {
  // add or remove from servings
  model.servingsChange(newservings);
  //update recipee view
  RecipeView.update(model.state.recipe);
  console.log('check if the serving working');
};

const controlbookmark = function () {
  //check if recipe is not bookmarked
  if (!model.state.recipe.bookmarked) {
    //add bookmark
    model.addBookmark(model.state.recipe);
  } else {
    //delete/remove bookmark
    model.deleteBookmark(model.state.recipe.id);
  }
  // update recipee view
  RecipeView.update(model.state.recipe);
  // render bookmark
  bookmarkView.render(model.state.bookmark);
};

const controlbookmarkload = function () {
  bookmarkView.render(model.state.bookmark);
};

const controlUploadrecipe = async function (newrecipe) {
  try {
    // render spinner
    addrecipeView.renderSpinner();

    //upload new recipee
    await model.uploadrecipe(newrecipe);
    console.log(model.state.recipe);

    // render recipee
    RecipeView.render(model.state.recipe);

    //render bookmark
    bookmarkView.render(model.state.bookmark);

    // change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // render success message
    addrecipeView.renderSuccessMess('recipee created Successfully');

    //timer to trigger the close modal method after some time
    setTimeout(() => {
      addrecipeView._togglemodal();
    }, TIMER_SEC_DELAY * 1000);
  } catch (error) {
    console.log('🔥', error);
    addrecipeView.renderError(error.message);
  }
};
const init = function () {
  bookmarkView.addHandlerloadbookmark(controlbookmarkload);
  RecipeView.addHandlerRender(controlRecipe);
  RecipeView.addHandlerServings(controlServings);
  RecipeView.addHandlerbookmark(controlbookmark);
  addrecipeView._handleUploadrecipe(controlUploadrecipe);
  SearchView.addsearchHandler(controlSearch);
  PaginationView._addHandlerPagination(controlPagination);
};

init();
console.log('www555');
console.log('w');

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
