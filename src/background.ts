import browser from 'webextension-polyfill';
import { parseRecipe } from './utils/scrape';
console = (browser.extension.getBackgroundPage() as any).console;

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
    return tabs[0].url;
  }).then((url) => {
    return parseRecipe(url ?? '');
  }).then((recipe) => {
    console.log(recipe);
  }).catch((error) => {
    console.log(error);
  });
});

