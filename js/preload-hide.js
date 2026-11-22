/**
 * ATTENTION preload-hide.js and preload-hide.css are non-essential systems that must act independently from the other functions.
 *
 * This file has two purposes
 * 1) Hide the elements that has scores in them. This is done because, before the stats gets hidden they show up for some milliseconds, which can
 *    show the stat to the user against their will.
 *
 * 2) In case the elements stay hidden for a long period of time, present the user with an option to revert the visibility status of the elements
 */

//(1) HIDING THE ELEMENTS ===========================================================================================================================
// array with the selectors of every element that we want to hide
const elementsToHide = [
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

//Taking every value that we defined in the array earlier and setting in a <style> element, which will set all of these elements to visibility:hidden
//then we attach this <style> into the document's root

//think of it like:
/**
 :is({list of selectors in elementsToHide}){
    visibility: hidden;
 }
 */
const style = document.createElement("style");
style.textContent = `:is(${elementsToHide.join(", ")}) {
   visibility: hidden;
}`;

//appending the <style> to the document's root root
document.documentElement.appendChild(style);

//(2) USER REVERTING THE PRE-LOAD HIDING ===========================================================================================================

//creating the revert button that will be attached to each element we hid
//P.S: The stylying of these buttons are defined in css/preload-hide.css
let coverSpan = document.createElement("div");
coverSpan.classList.add("mal-hider-cover-container");
coverSpan.innerHTML =
`<span class="mal-hider-cover">
    <b> Content hidden by MAL SCORE HIDER. If you still can't see it <a class="revert-hide" role="button"> CLICK HERE </a> <b>
</span>`;


let hiddenElements;
document.addEventListener("DOMContentLoaded", ()=>{
    //waiting for the DOM to load and then getting every element that we hid
    hiddenElements = document.querySelectorAll(`:is(${elementsToHide.join(", ")}`);

    //iterating through each hidden element and attaching the "mal-hider-cover-container" and its children.
    for(let element of hiddenElements){
        //clones the coverSpan object, since attaching "coverSpan" directly would just result in one single "coverSpan" being attached into the
        //last element of hiddenElements.
        const coverClone = coverSpan.cloneNode(true); //the "true" makes coverSpan's children also be cloned.

        //the <span> had very little width, which made the content "spill" to the bottom
        //So in preload-hide.css we set the width to "max-content", but then this made the text "spill" to the right
        //so the solution was to make it have the "max-width" equal to the computed width of the element we're hiding
        coverClone.firstChild.style.maxWidth = getComputedStyle(element)["width"];

        //adding the event listener to the "revert-hide" button. (":scope" makes sure querySelector will only search within coverClone's scope)
        //the function revertHide() FROM THIS FILE is called.
        coverClone.querySelector(":scope .revert-hide").addEventListener("click", () => revertHide());

        //PREPENDING coverClone into the hidden element. (That is, adding it to the element's children as the FIRST CHILD)
        //the reason why we're PREPENDING instead of APPENDING is because by making coverClone the FIRST child we can align it to the top-left side
        //of the hidden element, which's the desired outcome
        element.prepend(coverClone);
    }
});

/**
 * Makes every hidden element visible again, and removes all the .mal-hider-cover-container elements from the DOM.
 */
const revertHide = ()=>{
    for (let element of hiddenElements){
        element.style.visibility = "visible"; //making the element visible again
        element.querySelector(":scope .mal-hider-cover-container").remove(); //removing the covers from DOM
    }
};



