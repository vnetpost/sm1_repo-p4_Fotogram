import imagesList from "./data/imagesList.js";

const refDialog = document.getElementById("idDialog");

//// Activate OnClick for all images (beim Generieren) to open the Dialog-Element
// function openDialog(idThumb) {
//     refDialog.showModal();
//     adjustingDialogContents(idThumb);
// }

function closeDialog(idThumb) { refDialog.close(); }

//// Activate onClick => close() for close BTN in Dialog (idBtnCloseDlg)
document.getElementById("idBtnCloseDlg").addEventListener("click", () => {
    refDialog.classList.remove("opened");
    refDialog.close();
});

//// Using EventObject to close the Dialog
//// I click auf Backdrop => Dialog schliesst (backdrop belongs to dialog)
refDialog.addEventListener("click", (e) => {
    if (e.target == refDialog) {
        refDialog.classList.remove("opened");
        refDialog.close();
    };
});

// #region Dialog-Adjusting
//// Durch imagesList passe ich Dialog-Elemente an:
let currentIndex;
export function adjustingDialogContents(idThumb) {
    currentIndex = parseInt(idThumb.split("idThumb")[1], 10);
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

    adjustingDialogContents(`idThumb${currentIndex}`);
}

// #endregion