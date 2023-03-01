"use strict";

function showFeedBack(input, valid, message) {
  let validClass = (valid) ? 'is-valid' : 'is-invalid';
  let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
  input.nextAll('div').removeClass('d-block');
  div.removeClass('d-none').addClass('d-block');
  input.removeClass('is-valid is-invalid').addClass(validClass);
  if (message) {
    div.empty();
    div.append(message);
  }
}

function newCategoryValidation(handler){
    let form = document.forms.fNewCategory;
    $(form).attr('novalidate', true);
  
    $(form).submit(function(event){
      let isValid = true;
      let firstInvalidElement = null;
  
      this.vfName.value = this.vfName.value.trim();
      showFeedBack($(this.vfName), true);
  
      if (!this.Description.checkValidity()){
        isValid = false;
        showFeedBack($(this.Description), false);
        firstInvalidElement = this.Description;
      } else {
        showFeedBack($(this.Description), true);
      }
  
      if (!this.Image.checkValidity()){
        isValid = false;
        showFeedBack($(this.Image), false);
        firstInvalidElement = this.Image;
      } else {
        showFeedBack($(this.Image), true);
      }
  
      if (!isValid){
        firstInvalidElement.focus();
      } else {
        handler(this.vfName.value, this.Description.value, this.Image.value);
      }
      event.preventDefault();
      event.stopPropagation();
    });
}

export {newCategoryValidation}