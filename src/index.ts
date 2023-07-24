import { parseRecipe } from './utils/scrape';

parseRecipe(document.URL).then((recipe) => console.log(recipe));
