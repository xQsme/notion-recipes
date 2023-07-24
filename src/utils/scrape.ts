import { getBaseRecipe, Recipe } from '../types/recipe';

import request from 'request';
import cheerio from 'cheerio';

export const parseRecipe = async (url: string): Promise<Recipe> => {
  if (!url.match(/https:\/\/www.bbcgoodfood.com/)) {
    throw new Error('Not a valid BBC Good Food URL');
  }
  const recipe = getBaseRecipe();
  const html: string = await new Promise(function (resolve) {
    request(url, (_, __, html) => resolve(html));
  });
  const $ = cheerio.load(html);
  recipe.title = $('h1').text();
  if (!recipe.title || recipe.title.length < 1) {
    throw new Error('Not a valid BBC Good Food URL');
  } else {
    $('.recipe__ingredients ul li.list-item').each((_, element) => {
      const lineBreak = $(element).text().indexOf('\n');
      if (lineBreak > 0) {
        recipe.ingredients.push($(element).text().substring(0, lineBreak));
      } else {
        recipe.ingredients.push($(element).text());
      }
    });
    $('.recipe__method-steps ul .list-item p').each((_, element) => {
      recipe.method.push($(element).text());
    });
    recipe.time = {
      prep: $('.cook-and-prep-time .list').find('time').first().text(),
      cook: $('.cook-and-prep-time .list').find('time').last().text(),
    };
    recipe.serves = $('.post-header__servings').children().last().text();
    recipe.image = $('.post-header__image-container img').attr('src') ?? '';
    return recipe;
  }
};
