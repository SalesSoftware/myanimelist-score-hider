# This README is still a work in progress
# MyAnimeList Score Hider

![](img/demo_3.gif)


#### A browser extension that hides the anime/manga scores, rank, members, and other ratings across multiple MyAnimeList pages. 

MyAnimeList scorehider is a browser extension that aims to hide the scores of anime and manga across multiple pages in MyAnimelist, replacing each 
value with "?" OR another placeholder that is defined by the user on the popup's control panel. 

The ratings can be toggled as the user sees fit via the popup's control panel. 
Currently it's possible to hide the following ratings:

* Score
* Users
* Rank
* Popularity
* Members
* Favorites (specifically anime/manga marked as favorites. Characters, studios, mangaka, and other non-anime/manga favorites remain unchanged)

RATINGS SPECIFIC FOR THE ANIME/MANGA PAGES:

* "Recommend" reviews amount
* "Not Recommend" reviews amount
* "Mixed" reviews amount
* Total amount of reviews
* Review Ratio Bar


## Video demonstrating the extension
COMING SOON


## Pages mapped by the extension
Here's a list of every MyAnimeList page that this extension affects. (The links are for you to test the extension yourself). 

1. Anime/Manga page ([https://myanimelist.net/anime/20/Naruto](https://myanimelist.net/anime/20/Naruto))
2. Search Results page ([https://myanimelist.net/search/all?q=Naruto](https://myanimelist.net/search/all?q=Naruto))
3. Anime/Manga lists (Seasonal anime, Genre, Manga magazines, etc.)([https://myanimelist.net/anime/season/2010/summer](https://myanimelist.net/anime/season/2010/summer))
4. Anime stacks (P.S Only for view_style=tile or view_style=seasonal.[https://myanimelist.net/stacks/93985](https://myanimelist.net/stacks/93985))
5. Company/Producer/Studio anime lists ([https://myanimelist.net/anime/producer/18/Toei_Animation](https://myanimelist.net/anime/producer/18/Toei_Animation))
6. People page (As long as there's anime/manga entries)([https://myanimelist.net/people/1881/Eiichiro_Oda](https://myanimelist.net/people/1881/Eiichiro_Oda))
7. Search bar suggestions (Typying in the search bar opens a dropdown of suggestions, each one showing a score. This extension can hide these scores).
8. Hovering Popups (Some pages has hovering popups that shows all rating of an anime/manga. This extension can hide these ratings too)


## Installing
I am currently working on making the extension accessible in Chrome's and Firefox's official add-ons stores. 
Nevertheless, it's possible to install the project on each browser by following these instructions:


### Firefox
**DISCLAIMER:** This installation method is **TEMPORARY**, which means that if you close your browser the extension will be removed, and you'll need to follow these steps again.

1. Download/Clone this repository.
2. Go to `about:debugging`.
3. Select "This Firefox.
4. Open "Temporary Extensions" (If it isn't already open) and click in "Load Temporary Add-on...".
5. Go to the folder you downloaded/cloned this repository at and select the "manifest.json" file.
6. You have successfully installed the extension in Firefox.

### Chrome
1. Download/Clone this repository.
2. Go to `chrome://extensions/`.
3. Turn on "Developer mode" on the top-right side of the page.
4. A "Load Unpacked" option should appear on the top-left side of the page, click it.
5. Select the **FOLDER** that has this project's files. 
6. You have successfully installed the extension in Chrome.

## For developers

Instead of installing the extension through the Chrome/Firefox add-on store, you are expected to follow 
the installation guide for [Firefox](#firefox) or [Chrome](#chrome). 
This is because these installation guides also make it possible to properly debug the extension.

Any errors the extension gets will be shown in the console as a `console.error`;

Also make sure to, in the`js/system-config.js` file, set the `DEBUG_MODE` constant to `true`. This will make various logs show up in the console as
you use the extension.

### Debugging in Chrome
1. Make your changes.
2. Go to the `chrome://extensions/` page and look for the "Myanimelist score Hider" that you installed,**Making sure that you're in developer mode**.
3. Click on the reload button on the bottom-right side of the Myanimelist Score Hider tab.
4. **REFRESH ALL MYANIMELIST PAGES**.
5. Your changes should now be reflected on the extension.

### Debugging in Firefox
1. Make your changes.
2. Go to `about:debugging` > "This Firefox", and look for the "Myanimelist Score Hider" tab in the "Temporary Extensions toggle". 
3. Click on "Reload" on the bottom-right side of the extension's tab.
4. **REFRESH ALL MYANIMELIST PAGES.**
5. Your changes should now be reflected on the extension.


### Opening the extension's popup console

#### Chrome
Simply right click the extension's icon in the extension's tool bar and select "Inspect popup". This will both open the inspector and the popup.
**DISCLAIMER:** As soon as you close the popup, the inspector will also close.

#### Firefox
Go to `about:debugging` > "This Firefox", and look for the "Myanimelist Score Hider" tab in the "Temporary Extensions toggle". 
Then click "Inspect" in the top-right side of the tab. 
Firefox's popup inspector remains open, even if the popup is closed. 
_Long live the fox_.


## Known Issues
**Issue 1** 
The entire extension is highly dependent on MyAnimeList's page layout. A significant page redesign on their end may break this extension.

**Issue 2**
The pre-load hide is not applied to the "people" page. This means that in pages like [Oda's page](https://myanimelist.net/people/1881/Eiichiro_Oda?q=oda&cat=person) will "flash" the scores for a few milliseconds before hiding them.

**Issue 3**
The `debounce` function in `storageSync.class.js` is currently using a "global" variable `this.debounceTimeout` for timeout storage. 
This means that the debounce is applied to every single `setInStorage` request, creating a situation where, if the user changes the scoreplaceholder, and before the timeout executes they toggle a rating in the popup,the score placeholder request would be cleared in favor of the most recent rating toggle.
Which would in turn make the score placeholder input show a value that isn't reflected on the pages since the request was never sent. 

I hardly think that any user would run into this non-intentionally, since that would require them to make a "placeholder" and then "rating" request
in less than 100ms (That is the limit I set in `setInStorage()`), but an issue is an issue nevertheless.



## If this project helps you, please star the repository!
I'll be honest, I'm looking for a job and it's been pretty tough. 
Starring this project would be a great help to make my profile more interesting for recruiters. 
So, If you like my work, please consider starring this repository.
Thank you! ☺️

