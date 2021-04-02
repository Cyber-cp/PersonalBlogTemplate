var firebaseConfig = {
    apiKey: "AIzaSyBzQH-eWfSn0136vADqj7wb4bn6NSfDoXs",
    authDomain: "personalblogtemplate1.firebaseapp.com",
    projectId: "personalblogtemplate1",
    storageBucket: "personalblogtemplate1.appspot.com",
    messagingSenderId: "481552750264",
    appId: "1:481552750264:web:86b0c7a05c677e9369064d",
    measurementId: "G-QDNX3P6ZBR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var email;
var password;
var emailError;
var passwordError;

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log("User: " + user.email);
        $("#redirectToMain").click();
    }

});

window.onload = function () {
    //console.log("Signed in: " +  firebase.auth().currentUser.uid);

    emailError = $("#emailError");
    passwordError = $("#passwordError");

    emailError.hide();
    passwordError.hide();

    email = document.getElementById("email input");
    password = document.getElementById("password input");

    console.log(email + password);



    $(email).each(function () {
        var elem = $(this);

        // Save current value of element
        elem.data('oldVal', elem.val());

        // Look for changes in the value
        elem.bind("propertychange change click keyup input paste", function (event) {
            // If value has changed...
            if (elem.data('oldVal') != elem.val()) {
                // Updated stored value
                elem.data('oldVal', elem.val());

                // Do action
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var matches = re.test(String(email.value).toLowerCase());
                if (!matches) {
                    emailError.show();
                    emailError.text("Please enter a valid email.");
                } else {
                    emailError.hide();
                }
            }
        });
    });

    $(password).each(function () {
        var elem = $(this);

        // Save current value of element
        elem.data('oldVal', elem.val());

        // Look for changes in the value
        elem.bind("propertychange change click keyup input paste", function (event) {
            // If value has changed...
            if (elem.data('oldVal') != elem.val()) {
                // Updated stored value
                elem.data('oldVal', elem.val());

                // Do action
                passwordError.hide();
            }
        });
    });
}




function logIn(emailStr, passwordStr) {
    if (emailStr == "") {
        emailError.show();
        emailError.text("Please fill out this field");
    };
    if (passwordStr == "") {
        passwordError.show();
        passwordError.text("Please fill out this field");

    };
    if (passwordStr == "" || emailStr == "") {
        return;
    };
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return firebase.auth().signInWithEmailAndPassword(emailStr, passwordStr)
                .then((userCredential) => {
                    // Signed in
                    emailError.hide();
                    var user = userCredential.user;
                    // ...
                    //console.log("Logged in: " + user.email);

                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode + ": " + errorMessage);
                    emailError.show();
                    emailError.text("The email or password is incorrect.");
                });
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage);
        });
};

function logInWithGoogle() {
    provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log("Account succesfully linked!");
    }).catch(function (err) {
        console.log(err.code + ": " + err.message);
    });

};
