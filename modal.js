function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
let modalBg = null;
let modalBtn = null;
let formData = null;
let modalBtnClose = null;
let modalAnimate = null;
let submitButton = null;
let inputElement = null;
let checkBoxCgu = null;
let errorCheckBoxCgu = null;
let spanErrorElement = null;

if (typeof document !== 'undefined') {
  // will run in client's browser only
  modalBg = document.querySelector(".bGround");
  modalBtn = document.querySelectorAll(".modal-btn");
  formData = document.querySelectorAll(".formData");
  modalBtnClose = document.querySelector(".close");
  modalAnimate = document.querySelector(".content");
  submitButton = document.querySelector(".btn-submit");
  inputElement = document.querySelectorAll(".text-control");
  checkBoxCgu = document.querySelector("#checkbox1");
  errorCheckBoxCgu = document.querySelector(".error-checked");
  spanErrorElement = document.createElement("span");

  let cguSelected = true;
  let submitButtonTest = false;

  function switchSubmitButton() {
    const submitButtonTxtValid = "c'est parti !!";
    const submitButtonTxtInvalid = "en attente !!";
    if(submitButtonTest === false){
      submitButton.value = submitButtonTxtInvalid;
    }
    else{
      submitButton.value = submitButtonTxtValid;
    }
  }

  checkBoxCgu.addEventListener("click", checkBoxCguValidity);
  function checkBoxCguValidity(){
    let cguChecked = checkBoxCgu.checkValidity();
    // Si non coché j'active la balise erreur :
    console.log(cguChecked);
    if(cguChecked === true){
      errorCheckBoxCgu.style.display = "none";
      cguSelected = true;
    }
    else {
      errorCheckBoxCgu.style.display = "block";
      cguSelected = false;
      submitButton.setAttribute('disabled', 'true');
      submitButtonTest = false;
      switchSubmitButton();
    }
  }

// fonction pour activer ou désactiver le bouton submit
  formData.forEach((inputTxt) => inputTxt.addEventListener("change", inputValidityCheck));
  function inputValidityCheck() {
    let totalTrue = 0;
    for(let i = 0; i < inputElement.length; i++) {
      let elementInput = inputElement[i].checkValidity();
      if((elementInput === false) || (cguSelected === false)){
        submitButtonTest = false;
      }
      else{
        totalTrue += 1;
      }
    }
    if((totalTrue === inputElement.length)){
      if(cguSelected === true){
        submitButton.removeAttribute('disabled');
        submitButtonTest = true;
      }
      else{
        submitButton.setAttribute('disabled', 'true');
        submitButtonTest = false;
      }
      switchSubmitButton();
    }
  }

// launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// launch modal form
  function launchModal() {
    submitButton.setAttribute('disabled' , 'true');
    modalAnimate.style.animationName = "modal-open";
    modalBg.style.display = "block";
  }

// close modal event
  modalBtnClose.addEventListener("click", (modalClose));
// launch modal form
  function modalClose() {
    modalAnimate.style.animationName = "modal-close";
    setTimeout(() => {
      modalBg.style.display = "none";
    }, 600)
  }

// function add multiple attributes
  function setAttributes(el, attrs) {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }
//  launch form event
  formData.forEach(( txtControl) => txtControl.addEventListener("change", launchFormData));
// fonction contrôle du validity state
  function launchFormData(event) {
    const inputRef = event.target;
    const inputRefValidity = inputRef.checkValidity();
    if(inputRef.className === "text-control"){
      if(inputRefValidity === false) {
        // Si le test échoue j'ajoute l'attribut [data-error-visible] sur l'élément parent, ainsi que sa valeur true
        inputRef.parentElement.setAttribute('data-error-visible', 'true');
        setAttributes(spanErrorElement, {
          'data-error': 'true',
          'data-error-message' : inputRef.validationMessage + " " + inputRef.title,
          'data-correct' : 'false'
        });
        spanErrorElement.innerHTML = spanErrorElement.getAttribute('data-error-message');
        // Je récupère l'élément parent de l'input et affiche la balise span error
        inputRef.parentElement.appendChild(spanErrorElement);
        // Et j'ajoute l'attribut data-error à l'input
        inputRef.setAttribute('data-error', 'true');
        submitButton.setAttribute('disabled', 'true');
        switchSubmitButton();
      }
      else {
        const spanError= inputRef.nextElementSibling;
        // je supprime les attributs data
        inputRef.parentElement.removeAttribute('data-error-visible');
        inputRef.removeAttribute('data-error');
        inputRef.setAttribute('data-correct', "true");
        inputRef.parentElement.removeAttribute('data-error');
        // Si l'élément suivant l'input existe et que la balise est bien ma balise 'span':
        if((spanError !== null) && (spanError.nodeName.toLowerCase() === "span")){
          // Je supprime la balise span, de l'élément parent, contenant le message d'erreur
          inputRef.parentElement.removeChild(spanErrorElement);
        }
      }
    }
  }
}





