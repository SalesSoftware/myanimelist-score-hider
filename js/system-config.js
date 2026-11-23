/*
 * This file contains the constants that are used in the entire scope of the project
 * Therefore, it's of vital importance for it to be the first script to be run, so the other files can access the values present here
*/

const DEBUG_MODE = false; //indicates if the various logs in the system will actually be logged or not

/**
 * Takes one or more arguments and calls for console.log
 * ATTENTION: It only calls console.log ONCE, with EACH element of ...content
 * @param {...*} content - the elements that we want to log.
 */
const DEBUG_LOG = (...content) => {
    //only logs if the DEBUG_MODE constant is true.
    if(DEBUG_MODE)
        console.log(...content);
};

// Constant containing the classes of the elements that CONTAINS scores for us to hide.
const HIDDEN_SELECTORS = [
            ".stats-block", /*Where the stats in ANIME/MANGA page stays*/
            ".leftside",/*The left side of the ANIME/MANGA page, that has some scores*/
            "div[class*=review__header]", /*Element from the anime/manga page that has REVIEW NUMERICAL INFORMATION*/
            ".js-categories-seasonal:has(.seasonal-anime):not(.list, .tile-anime-list, :has([class=seasonal-anime-list]))", /*The ANIME SEASONAL VIEW*/
            "[class=seasonal-anime-list]", /*Still the ANIME SEASONAL VIEW (specifically for the anime/manga stack pages)*/
            ".js-categories-seasonal.list", /*ANIME LIST VIEW*/
            ".js-block-list.list", /*ANIME LIST VIEW (in manga/anime genres))*/
            ".tile-anime-list", /*ANIME TILE VIEW (in stacks and producer pages)*/
            ".content-left:has(.information [data-l-content-type=anime], .information [data-l-content-type=manga])" /*SEARCH RESULTS PAGE (/search/all)*/
];

//constant containing ALL the possible stats that we can hide
const SETTINGS_OPTIONS = [
            "recommended",
            "mixed",
            "not_recommended",
            "review_amount",
            "ratio_bar",
            "favorites",
            "members",
            "popularity",
            "rank",
            "users",
            "score"
];
