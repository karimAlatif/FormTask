var API_URL = "https://private-b2e6827-robustatask.apiary-mock.com";
var API_PATH_SIGNUP = "/auth/register";
var API_PATH_SIGNIN = "/auth/login";

document.querySelector(".tabcontent.active").style.display = "block";

const homeDiv = document.getElementById("homeDiv");
homeDiv.style.display = "none";
const formDiv = document.getElementById("formDiv");
const userNameEle = document.getElementById("userNameID");

// tabs switch
function openTab(evt, tabName) {
  const tabcontent = document.querySelectorAll(".tabcontent");
  tabcontent.forEach((element) => {
    element.style.display = "none";
    element.reset(); //rest form
  });
  const tablinks = document.querySelectorAll(".tablinks");
  tablinks.forEach((element) => {
    element.classList.remove("active");
  });

  document.querySelector(`#${tabName}`).style.display = "block";
  evt.currentTarget.classList.add("active");
  selectedForm = document.querySelector(".tabcontent.active");
}

// submit  data
function submitForm(e, form) {
  e.preventDefault();
  const formInputs = form.querySelectorAll(".form-input");
  const data = {};

  formInputs.forEach((input) => {
    data[input.name] = input.value;
  });

  const loading = form.querySelector(".loading");
  loading.style.display = "block";

  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `${API_URL}/${form.id === "login-form" ? API_PATH_SIGNIN : API_PATH_SIGNUP}`
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    loading.style.display = "none";
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.success) {
        if (form.id === "signup-form") {
          showSnackbar(response.message);
          openTab(form, "login-form");
        } else {
          formDiv.style.display = "none";
          homeDiv.style.display = "block";
          userNameEle.innerHTML = `Hello,${data.email}`;
        }
        form.reset();
      } else {
        alert(response.message);
      }
    } else {
      alert("Error");
      showSnackbar(response.message);
    }
  };
  xhr.send(JSON.stringify(data));
}

// snackbar handler
function showSnackbar(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.innerText = message;
  snackbar.classList.add("show");
  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
}

//validations
function validateName(input) {
  const { value } = event.target;
  input.setCustomValidity("");

  if (input.validity.valid) {
    input.setCustomValidity("");
    input.classList.remove("invalid");
  } else {
    if (input.validity.valueMissing) {
      input.setCustomValidity("FullName is required.");
    } else if (input.validity.tooShort) {
      input.setCustomValidity("FullName must be at least 3 characters long.");
    } else if (input.validity.tooLong) {
      input.setCustomValidity(
        "FullName cannot be more than 20 characters long."
      );
    }
    input.classList.add("invalid");
  }
}

function validateUserName(input) {
  input.setCustomValidity("");

  if (input.validity.valid) {
    input.setCustomValidity("");
    input.classList.remove("invalid");
  } else {
    if (input.validity.valueMissing) {
      input.setCustomValidity("Username is required.");
    } else if (input.validity.patternMismatch) {
      input.setCustomValidity("Username cannot contain spaces.");
    } else if (input.validity.tooShort) {
      input.setCustomValidity("Username must be at least 3 characters long.");
    } else if (input.validity.tooLong) {
      input.setCustomValidity(
        "Username cannot be more than 20 characters long."
      );
    }
    input.classList.add("invalid");
  }
}

function validatePassword(input) {
  input.setCustomValidity("");

  if (input.validity.valid) {
    input.setCustomValidity("");
    input.classList.remove("invalid");
  } else {
    if (input.validity.valueMissing) {
      input.setCustomValidity("Password is required.");
    } else if (input.validity.patternMismatch) {
      input.setCustomValidity(`Password can contains 
            Digits
            One lowercase letter
            One uppercase letter
            One special character
            A minimum length of 8 characters`);
    }
    input.classList.add("invalid");
  }
}
