//wait for document is ready
var first_name;
var last_name;
var user_name;
var password;
var email;
var date_of_birth;
var user_array = [{username: "a", password: "a", email: "a@a.a", FirstName: "a", LastName: "a", dateOfBirth: "1.1.1991"}];
var aboutElement;
var span;

$(document).ready(function () {
    $("#first_name_input").focusout(function () {
        first_name = $("#first_name_input").val(); //get value of first name
        // if not valid
        if (!validate_first_name_and_last_name(first_name)) {
            $("#first_name_error").html("Please make sure your first name contains only characters!");
            $("#first_name_error").show();
        } else {
            $("#first_name_error").hide();
        }
    });

    $("#last_name_input").focusout(function () {
        last_name = $("#last_name_input").val(); //get value of last name
        if (!validate_first_name_and_last_name(last_name)) {
            $("#last_name_error").html("Please make sure your last name contains only characters!");
            $("#last_name_error").show();
        } else {
            $("#last_name_error").hide();
        }
    });

    $("#password_input").focusout(function () {
        password = $("#password_input").val(); // get value of password
        if (!validate_password(password)) {
            $("#password_error").html("Password length must be at least 8 characters and also contains numbers and characters!");
            $("#password_error").show();
        } else {
            $("#password_error").hide();
        }
    });

    //check register form submit
    $("#register-form").submit(function () {
        //check if first name is valid
        if (!validate_first_name_and_last_name(first_name)) {
            $("#first_name_error").html("Please make sure your first name contains only characters!");
            $("#first_name_error").show();
            return false;
        } else {
            //if first name is valid
            $("#first_name_error").hide();
        }

        //check if last name is valid
        if (!validate_first_name_and_last_name(last_name)) { // if last name not valid show error
            $("#last_name_error").html("Please make sure your first name contains only characters!");
            $("#last_name_error").show();
            $('#register-form').trigger("reset");
            return false;
        } else {
            // if last name is valid
            $("#last_name_error").hide();
        }

        //check if password is valid
        if (!validate_password(password)) {
            $("#password_error").html("Password length must be at least 8 characters!");
            $("#password_error").show();
            return false;
        } else {
            $("#password_error").hide();
        }
        user_name = $("#user_name_input").val(); //get value of user name
        email = $("#email_input").val(); //get value of email
        date_of_birth = $("#birth_date_input").val(); //get value of first name
        var user = {
            username: user_name,
            password: password,
            email: email,
            FirstName: first_name,
            LastName: last_name,
            dateOfBirth: date_of_birth
        };
        user_array.push(user);
        changeScreen('login')
        document.getElementById("register-form").reset();
        return false;
    });

    //This method validate first name and last name
    function validate_first_name_and_last_name(inputValue) {
        //check first name contains only characters
        if (!inputValue.match(/^[a-zA-Z]*$/)) {
            return false;
        } else {
            return true;
        }
    }

    //This method validate password
    function validate_password(inputValue) {
        var length = inputValue.length;
        //if length of password less than 8 characters
        if (length < 8) {
            return false;
        }
        //if length of password is valid check for numbers and characters
        else {
            //if not contains numbers and characters
            if (!(inputValue.match(/\d/) && (inputValue.match(/^[a-zA-Z]/)))) {
                return false;
            } else { //if valid password
                return true;
            }
        }
    }

    $("#loginForm").submit(function () {
        var username = $("#username").val();
        var password = $("#pass").val();
        if (check_user_pass_exists(username, password)) {
            changeScreen('settings');
            document.getElementById("loginForm").reset();
            $("#username-error").hide();
            var userString = document.getElementById("user");
            userString.innerHTML = "Hello " + username + " ! :)";
            userString.style.fontWeight = 'bold';
            return false;
        } else
            alert("bad username or password");
        return false;
    })

    function check_user_pass_exists(username, password) {
        exists = false;
        user_array.forEach(function (element) {
            if (element.username === username && element.password === password) {
                exists = true;
            }
        });
        return exists;
    }

    function check_user_exists(username) {
        exists = false;
        user_array.forEach(function (element) {
            if (element.username === username) {
                exists = true;
            }
        });
        return exists;
    }

});

//modal
window.onload = function() {
    aboutElement = document.getElementById('about');
    span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        aboutElement.style.display = "none";
    }
}

function aboutModal() {
    aboutElement.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == aboutElement) {
        aboutElement.style.display = "none";
    }
}


