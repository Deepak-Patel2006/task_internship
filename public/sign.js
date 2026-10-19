const signupTab = document.querySelector("#signupTab");
const signinTab = document.querySelector("#signinTab");

const signupForm = document.querySelector("#signupForm");
const signinForm = document.querySelector("#signinForm");

const switchToSignin = document.querySelector("#switchToSignin");
const switchToSignup = document.querySelector("#switchToSignup");

const formTitle = document.querySelector("#formTitle");
const formSubtitle = document.querySelector("#formSubtitle");

const signupMessage = document.querySelector("#signupMessage");
const signinMessage = document.querySelector("#signinMessage");


// ===============================
// FORM TOGGLE
// ===============================

function showSignup() {

    signupForm.classList.remove("hidden");
    signinForm.classList.add("hidden");

    signupTab.classList.add("active");
    signinTab.classList.remove("active");

    formTitle.textContent = "Create your account";
    formSubtitle.textContent =
        "Start your authentication practice.";

    clearMessages();
}


function showSignin() {

    signinForm.classList.remove("hidden");
    signupForm.classList.add("hidden");

    signinTab.classList.add("active");
    signupTab.classList.remove("active");

    formTitle.textContent = "Welcome back";
    formSubtitle.textContent =
        "Sign in to continue your practice.";

    clearMessages();
}


signupTab.addEventListener("click", showSignup);
signinTab.addEventListener("click", showSignin);

switchToSignin.addEventListener("click", showSignin);
switchToSignup.addEventListener("click", showSignup);


// ===============================
// MESSAGE HELPER
// ===============================

function clearMessages() {
    signupMessage.textContent = "";
    signinMessage.textContent = "";
}


// ===============================
// SIGNUP FORM
// ===============================

signupForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    console.log({
        name,
        email,
        password
    });

    signupMessage.textContent = "Sending request...";

    // Backend API call yahan aayegi

    const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            password
        })
    });

    signupName.value ='';
    signupEmail.value ='';
    signupPassword.value ='';
    clearMessages();
    signupMessage.textContent = "Request successful your account has been created ";

    const data = await response.json();
    console.log(data);


});


// ===============================
// SIGNIN FORM
// ===============================

signinForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    console.log({
        email,
        password
    });

    signinMessage.textContent = "Sending request...";
    signinMessage.className = "form-message";


    // Backend API call yahan aayegi

    const response = await fetch("/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    });

    signinEmail.value ='';
    signinPassword.value ='';

    const data = await response.json();
    console.log(data);

    clearMessages();
    signinMessage.textContent = data.message;

    if(data.success === true){
        setTimeout(() => {
        window.location.replace(data.redirectUrl); 
        }, 2000);
    }

});
