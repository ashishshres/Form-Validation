// fields
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#pass");
let confirmPassword = document.querySelector("#confirm");
let showPasswordBtn = document.querySelector("#show");
let form = document.querySelector("form");

// toggle password
function showPassword() {
    showPasswordBtn.addEventListener("change", () => {
        if (this.checked) {
            password.setAttribute("type", "text");
            confirmPassword.setAttribute("type", "text");
        } else {
            password.setAttribute("type", "password");
            confirmPassword.setAttribute("type", "password");
        }
    });
}

// check for empty fields
function isEmpty() {
    username.style.border = "1px solid transparent";
    email.style.border = "1px solid transparent";
    password.style.border = "1px solid transparent";
    confirmPassword.style.border = "1px solid transparent";

    if (
        username.value == "" &&
        email.value == "" &&
        password.value == "" &&
        confirmPassword.value == ""
    ) {
        toast("salmon", "Empty fields");
        username.style.border = "1px solid salmon";
        email.style.border = "1px solid salmon";
        password.style.border = "1px solid salmon";
        confirmPassword.style.border = "1px solid salmon";
    } else if (username.value == "") {
        toast("salmon", "Empty fields");
        username.style.border = "1px solid salmon";
    } else if (email.value == "") {
        toast("salmon", "Empty fields");
        email.style.border = "1px solid salmon";
    } else if (password.value == "") {
        toast("salmon", "Empty fields");
        password.style.border = "1px solid salmon";
    } else if (confirmPassword.value == "") {
        toast("salmon", "Empty fields");
        confirmPassword.style.border = "1px solid salmon";
    } else {
        username.style.border = "1px solid transparent";
        email.style.border = "1px solid transparent";
        password.style.border = "1px solid transparent";
        confirmPassword.style.border = "1px solid transparent";
        return true;
    }
}

// validate password
function validate() {
    if (isEmpty()) {
        let passwordValue = password.value;
        let confirmPasswordValue = confirmPassword.value;

        // check if password is at least 8 characters long
        if (passwordValue.length < 8) {
            toast("salmon", "Password must be at least 8 characters long");
            password.style.border = "1px solid salmon";
        }

        // check if password contains at least one uppercase letter
        else if (!/[A-Z]/.test(passwordValue)) {
            toast(
                "salmon",
                "Password must contain at least one uppercase letter"
            );
            password.style.border = "1px solid salmon";
        }

        // check if password contains at least one lowercase letter
        else if (!/[a-z]/.test(passwordValue)) {
            toast(
                "salmon",
                "Password must contain at least one lowercase letter"
            );
            password.style.border = "1px solid salmon";
        }

        // check if password contains at least one digit
        else if (!/\d/.test(passwordValue)) {
            toast("salmon", "Password must contain at least one digit");
            password.style.border = "1px solid salmon";
        }

        // check if password contains at least one special character
        else if (!/[^a-zA-Z0-9]/.test(passwordValue)) {
            toast(
                "salmon",
                "Password must contain at least one special character"
            );
            password.style.border = "1px solid salmon";
        }

        // check if password matches the confirmation password
        else if (passwordValue !== confirmPasswordValue) {
            toast("salmon", "Passwords do not match");
            password.style.border = "1px solid salmon";
            confirmPassword.style.border = "1px solid salmon";
        }

        // redirect
        else {
            localStorage.setItem("username", username.value);
            clearFields();
            window.location.href = "./pages/welcome.html";
        }
    }
}

// clear fields
function clearFields() {
    username.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    showPasswordBtn.checked = false;
}

// toast message
let popup = document.querySelector(".alert");

function toast(color, msg) {
    popup.style.opacity = 1;
    popup.style.transform = "translateX(0)";
    popup.innerHTML = `<span>${msg}</span>`;
    popup.style.backgroundColor = color;
    setTimeout(() => {
        popup.style.opacity = 0;
        popup.style.transform = "translateX(100%)";
    }, 2500);
}

// events
showPasswordBtn.addEventListener("click", showPassword);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validate();
});

document.addEventListener("load", () => {
    location.reload();
});
