import imagesList from "./data/imagesList.js";
console.log(imagesList.length);
import { adjustingDialogContents } from "./dialog.js";

//// Durch imagesList generiere ich Thumb-Elemente for Gallery
export function mountGallery(targetContainer) {
    const refTargetContainer = document.getElementById(targetContainer);
    imagesList.forEach((item, index) => {
        const newThumb = document.createElement("img"); // <img src="" alt="" style=""></img>

        newThumb.id = `idThumb${index}`;
        newThumb.className = "shapeImgs";
        newThumb.src = item.url;
        newThumb.alt = item.altName;

        // newThumb.onclick = `openDialog(${newThumb.id})`; // Falsch! onclick erwartet eine Funktion, nicht einen String.
        // newThumb.onclick = openDialog(newThumb.id); // dann wird sofort beim Erstellen des Elements ausgeführt.
        // newThumb.onclick = () => openDialog(newThumb.id); // Wrap-Function
        newThumb.addEventListener("click", () => {
            console.log(newThumb.id);
            document.getElementById("idDialog").showModal();
            document.getElementById("idDialog").classList.add("opened");
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

        refTargetContainer.appendChild(newThumb); // Add my new <img> to secAlbum 
    });
}