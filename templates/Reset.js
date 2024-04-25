// Function to check if the passwords match
function checkPasswordMatch() {
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirmPassword");
  
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPassword.setCustomValidity("");
    }
  }
  
  // Check requirement
  document.getElementById("password").addEventListener("keyup", checkPasswordMatch);
  document.getElementById("confirmPassword").addEventListener("keyup", checkPasswordMatch);
  
  function validatePasswordComplexity(password) {
    let reasons = [];
  
    if (password.length < 8) {
      reasons.push("Password should be at least 8 characters long.");
    }
  
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (!hasUpperCase) {
      reasons.push("Password should contain at least 1 uppercase letter.");
    }
    if (!hasLowerCase) {
      reasons.push("Password should contain at least 1 lowercase letter.");
    }
    if (!hasNumber) {
      reasons.push("Password should contain at least 1 number.");
    }
    if (!hasSpecialChar) {
      reasons.push("Password should contain at least 1 special character.");
    }
  
    return reasons;
  }
  
  function checkPasswordStrength() {
    const password = document.getElementById("password").value;
  
    const reasons = validatePasswordComplexity(password);
  
    const passwordField = document.getElementById("password");
    const errorMessage = document.getElementById("passwordError");
  
    if (reasons.length > 0) {
      passwordField.setCustomValidity("Password does not meet requirements.");
      errorMessage.textContent = reasons.join(" ");
    } else {
      passwordField.setCustomValidity("");
      errorMessage.textContent = "";
    }
  }
  
  document.getElementById("password").addEventListener("input", checkPasswordStrength)
  
  //Show password
  function myFunction1() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  
  function myFunction2() {
    var y = document.getElementById("confirmPassword");
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  }
  
  //Open pop-up form
  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  
  