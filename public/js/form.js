// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv_YKV0jBy695AhaF8iyZZw8Y6vDBU-m0",
  authDomain: "canteen-cravings-v1.firebaseapp.com",
  databaseURL:
    "https://canteen-cravings-v1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "canteen-cravings-v1",
  storageBucket: "canteen-cravings-v1.appspot.com",
  messagingSenderId: "600000936713",
  appId: "1:600000936713:web:02f6855a42c5410a22f1d8",
};

// Initialize Firebase
const application = firebase.initializeApp(firebaseConfig);

// creating variables
const auth = firebase.auth();
const database = firebase.database();

function register() {
  // get all input fields
  full_name = document.getElementById("full_name").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // validate input fields
  if (
    validate_email(email) === false ||
    validate_password(password) === false
  ) {
    alert("Email and Password is incorrect ");
    return;
  }

  // move on with auth

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;

      // adding user to firebase database
      var database_red = database.ref();

      // Create user data
      var user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now(),
      };
      database.ref.child("user/" + user.uid).set(user_data);

      window.alert("User Created");
      console.log(name, full_name, password);
    })

    .catch(function () {
      var error_code = error.code;
      var error_message = error.message;
    });
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;

  if (expression.test(email) === true) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password) {
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field === null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}
