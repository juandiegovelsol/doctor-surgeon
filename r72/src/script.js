// script.js

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  function showPage(pageId) {
    pages.forEach((page) => {
      page.classList.remove("active-page");
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId + "-page");
    const selectedNavLink = document.querySelector(
      `.nav-link[data-page="${pageId}"]`
    );

    if (selectedPage) {
      selectedPage.classList.add("active-page");
    }
    if (selectedNavLink) {
      selectedNavLink.classList.add("active");
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior (scrolling to fragment)
      const pageId = this.getAttribute("data-page");
      showPage(pageId);
    });
  });

  // Initialize to show homepage on load
  showPage("home");

  // Dummy interactivity for buttons (optional - just visual feedback)
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log(this.textContent.trim() + " button clicked"); // Example action
      // You could add visual feedback here if desired, like changing button style briefly
    });
  });
});
