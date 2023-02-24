import {SoundBank} from "./audio.js"

const inputButton = document.getElementById("summit")
console.log(inputButton);
const fListener = ()=>{
    console.log("COUCOY");
    const cert = document.getElementById("cert");
    const name = document.getElementById("name");
    const p = document.createElement("p");
    p.innerText = name.value;
    p.id = name.id;
    p.style.top = "48%";
    cert.removeChild(name);
    cert.appendChild(p);
    setTimeout(capture, 400, cert);
    // inputButton.removeEventListener("click", fListener);
}
inputButton.addEventListener("click", fListener)

function capture(element) {
// utiliser html2canvas pour capturer l'élément
html2canvas(element).then(function(canvas) {
// convertir le canvas en une image
var image = canvas.toDataURL('image/png');

const downloadLink = document.createElement('a');
    downloadLink.download = 'Trivial_SEO_Certificat.png';
    downloadLink.href = image;

      // Ajouter le lien de téléchargement à la page
    document.body.appendChild(downloadLink);

      // Cliquer sur le lien de téléchargement pour déclencher le téléchargement
    downloadLink.click();

      // Supprimer le lien de téléchargement de la page
    document.body.removeChild(downloadLink);
    window.location.href = "index.html";  
});}
SoundBank.applaudissement.play();
