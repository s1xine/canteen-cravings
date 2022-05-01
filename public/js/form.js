const fname = document.querySelector(".fname") || null;
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const submitBtn = document.querySelector(".submit-btn");

if (fname == null) {
  // means login page is open
  submitBtn.addEventListener("click", () => {
    fetch("/login", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        validateData(data);
      });
  });
} else {
  // means register page is open

  submitBtn.addEventListener("click", () => {
    fetch("/register-user", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        fname: fname.value,
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        validateData(data);
      });
  });
}

const validateData = (data) => {
  if (!data.fname) {
    alertBox(data);
  } else {
    sessionStorage.fname = data.fname;
    sessionStorage.email = data.email;
    location.href = "/";
  }
};

const alertBox = (data) => {
  const alertContainer = document.querySelector(".alert-box");
  const alertMsg = document.querySelector(".alert");
  alertMsg.innerHTML = data;

  alertContainer.style.top = `5%`;
  setTimeout(() => {
    alertContainer.style.top = null;
  }, 5000);
};
