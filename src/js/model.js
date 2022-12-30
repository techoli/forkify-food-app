import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
// import { getJSON, sendJSON } from './helpers';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resPerpage: RES_PER_PAGE,
    page: 1,
  },
  bookmark: [],
};

const createRecipeeObject = function (data) {
  const { recipe } = data.data;
  return {
    cookingtime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    id: recipe.id,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const res = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeeObject(res);

    // console.log(recipe);
    state.bookmark.some(el => el.id === state.recipe.id)
      ? (state.recipe.bookmarked = true)
      : (state.recipe.bookmarked = false);
    //   console.log(recipe.imageUrl);
  } catch (error) {
    // console.error(`hey error ${error}`);
    throw error;
  }
};

export const loadSearcResult = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    // const recipes = data.data;
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        imageUrl: rec.image_url,
        id: rec.id,
        publisher: rec.publisher,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchViewPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resPerpage;
  const end = page * state.search.resPerpage;
  return state.search.results.slice(start, end);
};

export const servingsChange = function (newServing) {
  // console.log(state.recipe.ingredients);

  state.recipe.ingredients.forEach(ing =>
    ing.quantity
      ? (ing.quantity = (ing.quantity * newServing) / state.recipe.servings)
      : ''
  );
  console.log(state.recipe.ingredients);
  state.recipe.servings = newServing;
};

const saveTostorage = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
};
export const addBookmark = function (recp) {
  state.bookmark.push(recp);
  if (recp.id === state.recipe.id) state.recipe.bookmarked = true;
  console.log(state);
  saveTostorage();
};
export const deleteBookmark = function (id) {
  const ind = state.bookmark.findIndex(el => el.id === id);
  state.bookmark.splice(ind, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  saveTostorage();
};

export const uploadrecipe = async function (newrec) {
  try {
    // console.log(newrec);
    const ingredients = Object.entries(newrec)
      .filter(ing => ing[0].startsWith('ingredient') && ing[1] !== '')
      .map(ing2 => {
        const ingArr = ing2[1].replace(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong Ingredient FormatS, please use the correct format'
          );
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    // console.log(ingredients);

    const recipe = {
      title: newrec.title,
      source_url: newrec.sourceUrl,
      image_url: newrec.image,
      publisher: newrec.publisher,
      cooking_time: +newrec.cookingTime,
      servings: +newrec.servings,
      ingredients,
    };
    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // console.log(data);
    state.recipe = createRecipeeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

const init = function () {
  const storage = JSON.parse(localStorage.getItem('bookmark'));
  if (storage) state.bookmark = storage;
  console.log(state.bookmark);
};
init();

// loadSearcResult('pizza');
// console.log(state)
