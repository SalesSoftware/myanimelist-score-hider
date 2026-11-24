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
//Taking every value that we defined in the array earlier and setting in a <style> element, which will set all of these elements to visibility:hidden
//then we attach this <style> into the document's root

//think of it like:
/**
 :is({list of selectors in HIDDEN_SELECTORS}){
    visibility: hidden;
 }
 */
const style = document.createElement("style");
style.id = "preload-hide"; //setting the id so it can be removed by the preload-hiding reversal
//ATTENTION HIDDEN_SELECTORS is from the "system-config.js" file
style.textContent = `:is(${HIDDEN_SELECTORS.join(", ")}) {
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
    <b> MAL SCORE HIDER is temporarily hiding this content. If you're stuck <a class="revert-hide" role="button"> CLICK HERE TO REVEAL IT </a> </b>
</span>`;


let hiddenElements;
document.addEventListener("DOMContentLoaded", () => {
    //In case scorehider.class.js hides the elements first.
    if(!document.getElementById("preload-hide"))
        return undefined;
    //waiting for the DOM to load and then getting every element that we hid
    hiddenElements = document.querySelectorAll(`:is(${HIDDEN_SELECTORS.join(", ")})`);

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
const revertHide = () => {
    style.remove(); //removing the <style> element, thus reverting all visibility changes we made
    for (let element of hiddenElements)
        element.querySelector(":scope .mal-hider-cover-container")?.remove(); //removing the covers from DOM
};



