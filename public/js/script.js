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
/*                          START: Register variables                         */
/* -------------------------------------------------------------------------- */
var form = document.querySelector("form#form");
var fileField = document.querySelector("input#file");
var file = fileField.files[0];
var outputImage = document.querySelector("img#output");
var code = document.querySelector("code#code");
var codeContainer = document.querySelector("div#codeContainer");
var alert = document.querySelector("div#alert");
var canFormSubmit = false;
var GPSInfo;
var Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
/* ------------------------- END: Register variables ------------------------ */

/* -------------------------------------------------------------------------- */
/*                              START: Before all                             */
/* -------------------------------------------------------------------------- */
(function () {
  if (!navigator.geolocation) {
    console.log("Geolocation API not supported by this browser.");
  } else {
    console.log("Checking location...");
    navigator.geolocation.getCurrentPosition(success, error);
  }
})();

function success(position) {
  fileField.disabled = false;
}

function error() {
  alert.classList.remove("d-none");
  fileField.disabled = true;
  Toast.fire({
    icon: "error",
    title: "Geolocation error!",
  });
}
/* ----------------------------- END: Before all ---------------------------- */

/* -------------------------------------------------------------------------- */
/*                   START: Check image has gps data or not                   */
/* -------------------------------------------------------------------------- */
// this function trigger when inputted file is changed
function fileChanged(input) {
  outputImage.src = window.URL.createObjectURL(input.files[0]);
  canSubmit();
}

// check is image has gps data or not
function canSubmit() {
  EXIF.getData(document.querySelector("input#file").files[0], function () {
    var meta = EXIF.getAllTags(this);

    console.log("meta", meta);

    if (!meta) {
      canFormSubmit = false;
      // TODO: alert can not find any meta data
    } else {
      if (!meta.GPSLatitudeRef) canFormSubmit = false;
      else if (!meta.GPSLatitude || !meta.GPSLatitude.length)
        canFormSubmit = false;
      else if (!meta.GPSLongitudeRef) canFormSubmit = false;
      else if (!meta.GPSLongitude || !meta.GPSLongitude.length)
        canFormSubmit = false;
      else {
        canFormSubmit = true;
        // show table of metadata
        let GPSData = {};
        const keys = Object.keys(meta);
        for (const key of keys) {
          if (key.slice(0, 3) === "GPS") GPSData[key] = meta[key];
        }
        codeContainer.classList.remove("d-none");
        code.innerHTML = JSON.stringify(GPSData, false, "\t");
      }
    }
  });
}
/* ------------------ END: Check image has gps data or not ------------------ */

/* -------------------------------------------------------------------------- */
/*                      START: submit form to the server                      */
/* -------------------------------------------------------------------------- */
function submitForm(event) {
  event.preventDefault();

  if (canFormSubmit) {
    Swal.fire({
      icon: "success",
      title: "Good job!",
      text: "Your picture is uploaded",
    });
    // post to server
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You should chose image with gps metadata",
    });
    // clear form image
    // set output image place holder
  }
}
/* --------------------- END: submit form to the server --------------------- */
