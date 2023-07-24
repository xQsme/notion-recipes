import browser from 'webextension-polyfill';

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.executeScript({ file: 'index.js' });
});
