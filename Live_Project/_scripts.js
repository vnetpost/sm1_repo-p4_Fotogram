
// #region Generate img-Element `idImgEl${index}`
import imagesList from "./src/data/imagesList.js";
// console.log(imagesList.length);

//// Durch imagesList generiere ich img-Elemente
const refSecAlbum = document.getElementById("idSecAlbum");
imagesList.forEach((item, index) => {
    const newThumb = document.createElement("img"); // <img src="" alt="" style=""></img>

    newThumb.id = `idImgEl${index}`;
    newThumb.className = "shapeImgs";
    newThumb.src = item.url;
    newThumb.alt = item.altName;

    // newThumb.onclick = `openDialog(${newThumb.id})`; // Falsch! onclick erwartet eine Funktion, nicht einen String.
    // newThumb.onclick = openDialog(newThumb.id); // dann wird sofort beim Erstellen des Elements ausgeführt.
    // newThumb.onclick = () => openDialog(newThumb.id); // Wrap-Function
    newThumb.addEventListener("click", () => {
        console.log(newThumb.id);
        refDialog.showModal();
        adjustingDialogContents(newThumb.id);
    });

    // Beispiel: Inline style
    // newThumb.style = "width:20rem;height:20rem;"; // Inline style (rem wird referenziert zu font-size in css)
    // newThumb.style = "width:200px;height:200px;"; // Inline style
    // OR
    // newThumb.width = "300"; // Inline width
    // newThumb.height = "300"; // Inline height
    // OR    
    // newThumb.style.width = "400px"; // Inline width
    // newThumb.style.height = "400px"; // Inline height

    refSecAlbum.appendChild(newThumb); // Add my new <img> to secAlbum 
});
// #endregion

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

// #region Dialog (idDialog)
const refDialog = document.getElementById("idDialog");

//// Activate OnClick for all images (beim Generieren) to open the Dialog-Element
// function openDialog(idImgEl) {
//     console.log(idImgEl);
//     refDialog.showModal();
//     adjustingDialogContents(idImgEl);
// }

function closeDialog(idImgEl) {
    // console.log(idImgEl);
    refDialog.close();
    // adjustingDialogContents(idImgEl);
}

//// Activate onClick => close() for close BTN in Dialog (idBtnCloseDlg)
document.getElementById("idBtnCloseDlg").addEventListener("click", () => {
    refDialog.close();
});

//// I click auf Backdrop => Dialog schliesst (backdrop belongs to dialog)
refDialog.addEventListener("click", (e) => {
    if (e.target == refDialog) refDialog.close(0);
});

// #region Dialog-Adjusting
//// Durch imagesList passe ich Dialog-Elemente an:
let currentIndex;
function adjustingDialogContents(idImgEl) {
    currentIndex = parseInt(idImgEl.split("idImgEl")[1], 10);
    const imgListItem = imagesList[currentIndex];
    ////////////////////////////
    document.getElementById("dialogTitle").innerHTML = "";
    document.getElementById("dialogTitle").innerHTML = imgListItem.fileName;
    ////////////////////////////
    const newImgEl = document.createElement("img");
    newImgEl.src = imgListItem.url;
    newImgEl.alt = imgListItem.altName;

    const refDivImgDialog = document.getElementById("idDialogImg");
    refDivImgDialog.innerHTML = ""; // altes Bild löschen
    refDivImgDialog.appendChild(newImgEl);
    ////////////////////////////
    document.getElementById("idImgPos").innerText = "";
    document.getElementById("idImgPos").innerText = currentIndex + 1;
    ////////////////////////////
    document.getElementById("idImgQty").innerText = "";
    document.getElementById("idImgQty").innerText = imagesList.length;
}

//// Activate OnClick for Arrow-BTNs (idBtnGoLeft & idBtnGoRight)
document.querySelectorAll("#idBtnGoLeft, #idBtnGoRight")
    .forEach(btnEl => {
        btnEl.addEventListener("click", () => {
            goToNextImg(btnEl);
        });
    });
//// The Function 
function goToNextImg(btnEl) {
    console.log("hallooooo");
    if (btnEl.id == "idBtnGoLeft") {
        if (currentIndex === 0) {
            currentIndex = imagesList.length - 1;
        }
        else {
            currentIndex -= 1;
        };
        // console.log(currentIndex);
    };

    if (btnEl.id == "idBtnGoRight") {
        if (currentIndex === (imagesList.length - 1)) {
            currentIndex = 0;
        }
        else {
            currentIndex += 1;
        };
        // console.log(currentIndex);
    };

    adjustingDialogContents(`idImgEl${currentIndex}`);
}

// #endregion

// #endregion