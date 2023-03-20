function togglePassword() {
    var passwordInput = document.getElementById("password");
    var eyeIcon = document.getElementById("eye");
    if (passwordInput.type === "password") {
passwordInput.type = "text";
eyeIcon.classList.remove("fa-eye");
eyeIcon.classList.add("fa-eye-slash");
} else {
passwordInput.type = "password";
eyeIcon.classList.add("fa-eye");
eyeIcon.classList.remove("fa-eye-slash");
}
}
// Add event listener for form submission
var loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function(event) {
event.preventDefault();
// Get the user id and password
var userid = document.getElementById("userid").value;
var password = document.getElementById("password").value;

// Validate the user id and password against the database
// If the user id and password match, redirect to the dashboard
// If not, show an error message

if(document.getElementById('radstud').checked) {
if (userid === "validuser" && password === "password") {
window.location.href = "student";
} else {
alert("Invalid user id or password. Please try again.");
}}

else if(document.getElementById('raddept').checked) {
    if (userid === "validuser" && password === "password") {
    window.location.href = "dept";
    } else {
    alert("Invalid user id or password. Please try again.");
    }}


});