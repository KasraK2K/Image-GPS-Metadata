/* -------------------------------------------------------------------------- */
/*                       START: Validate bootstrap form                       */
/* -------------------------------------------------------------------------- */
(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
/* ---------------------- END: Validate bootstrap form ---------------------- */

/* -------------------------------------------------------------------------- */
/*                   START: Check image has gps data or not                   */
/* -------------------------------------------------------------------------- */
var form = document.querySelector("form#form");
var file = document.querySelector("input#file").files[0];
var outputImage = document.querySelector("img#output");
var canFormSubmit = false;
var GPSInfo;

// this function trigger when inputted file is changed
function fileChanged(input) {
  outputImage.src = window.URL.createObjectURL(input.files[0]);
  canSubmit();
}

// check is image has gps data or not
function canSubmit() {
  EXIF.getData(document.querySelector("input#file").files[0], function () {
    var meta = EXIF.getAllTags(this);

    // if (!meta.GPSAltitudeRef && meta.GPSAltitudeRef !== 0) {
    //   canFormSubmit = false;
    // }
  });
}

// submit form to the server
function submitForm(event) {
  event.preventDefault();
}
/* ------------------ END: Check image has gps data or not ------------------ */
