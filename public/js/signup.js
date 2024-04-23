document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = signupForm.elements['signup-email'].value;
    const username = signupForm.elements['signup-username'].value;
    const password = signupForm.elements['signup-password'].value;


      // Perform sign up validation or submit sign up request
    console.log('Sign Up:', email, username, password, confirmPassword);
    signupForm.reset();
    });
});