
import { mountGallery } from "./gallery.js";

// Dialog initial schließen
document.getElementById("idDialog").close();
mountGallery("idSecAlbum");

// #region .content
//// Add .content to all Sections:
// document.getElementById("idHeader").classList.add("content")
// document.getElementById("idSecTitle").classList.add("content")
// document.getElementById("idSecAlbum").classList.add("content")
// document.getElementById("idFooter").classList.add("content")
//// OR kurzer
document.querySelectorAll("#idHeader, #idSecTitle, #idSecAlbum, #idFooter")
    .forEach((el) => el.classList.add("content"));
// #endregion

// #region Styling Arrows Button (wenn Arrow-img in button-Tags sind!)
document.querySelectorAll("#idBtnGoLeft img, #idBtnGoRight img")
    .forEach(el => {
        el.classList.add("dialogImgArrows")
        //// I rotate now the left arrow
        //// Find im DOM vom img nach oben next button (its parent button’s ID)
        if (el.closest("button").id === "idBtnGoLeft") {
            el.style.transform = 'rotate(180deg)';
        }
    });
// #endregion

