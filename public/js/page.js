// making the dashboard elements clickable
const listDiv = document.getElementsByClassName("list-card");
for (let index = 0; index < listDiv.length; index++) {
  listDiv[index].addEventListener("click", () => {
    listDiv[index].submit();
  });
}

// to validate whether input form is filled or not 
function validateForm(event) {
  var input = document.getElementById("myInput").value.trim();
  if (input === "") {
    event.preventDefault(); // Prevent form submission
    alert("Input field cannot be empty!");
  }
}

// to verify the passwords
const passwordInput = document.getElementById("passwordInput");
const repasswordInput = document.getElementById("repasswordInput");
const passwordMatchMessage = document.getElementById("passwordMatchMessage");
const submitButton = document.getElementById("submitButton");

function checkPasswordMatch() {
  const password = passwordInput.value;
  const repassword = repasswordInput.value;
  if (password === repassword) {
    passwordMatchMessage.style.display = "none";
    submitButton.disabled = false;
  } else {
    passwordMatchMessage.style.display = "block";
    submitButton.disabled = true;
  }
}

passwordInput.addEventListener("input", checkPasswordMatch);
repasswordInput.addEventListener("input", checkPasswordMatch);


function submitForm() {
  document.getElementById("myForm").submit();
}
