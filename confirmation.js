function editNav() {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
const modalAnimate = document.querySelector(".content");
// close confirmation page
function closeConfirm() {
    modalAnimate.style.animationName = "modal-close";
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 600)
}