// NAVBAR SCROLLING //
const navbar = document.getElementById("navbar");

// OnScroll event handler
const onScroll = () => {
  // Get scroll value
  const scroll = document.documentElement.scrollTop;

  // If scroll value is more than 0 - add class
  if (scroll > 50) {
    navbar.classList.add("shadow");
  } else {
    navbar.classList.remove("shadow");
  }
};
// Use the function
window.addEventListener("scroll", onScroll);
