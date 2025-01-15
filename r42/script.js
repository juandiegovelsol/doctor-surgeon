/* script.js */
document.addEventListener("DOMContentLoaded", function () {
  const navMenuToggle = document.querySelector(".nav-menu-toggle");
  const navList = document.querySelector(".nav-list");
  const categoryDropdownToggle = document.querySelector(".nav-dropdown-toggle");
  const categoryDropdownMenu = document.querySelector(".nav-dropdown-menu");
  const categoryDropdownFirstLink = categoryDropdownMenu.querySelector(
    ".category-list li a"
  );

  // Main Navigation Menu Toggle
  if (navMenuToggle) {
    navMenuToggle.addEventListener("click", function () {
      const expanded = this.getAttribute("aria-expanded") === "true" || false;
      this.setAttribute("aria-expanded", !expanded);
      navList.classList.toggle("open");
    });
  }

  // Category Dropdown Toggle
  if (categoryDropdownToggle) {
    categoryDropdownToggle.addEventListener("click", function (e) {
      e.preventDefault();
      const expanded = this.getAttribute("aria-expanded") === "true" || false;
      this.setAttribute("aria-expanded", !expanded);
      categoryDropdownMenu.classList.toggle("open");
      if (!expanded) {
        setTimeout(() => {
          if (categoryDropdownFirstLink) {
            categoryDropdownFirstLink.focus();
          }
        }, 100);
      }
    });
  }

  // Close dropdown when clicking outside (optional enhancement)
  document.addEventListener("click", function (event) {
    if (
      !categoryDropdownMenu.contains(event.target) &&
      !categoryDropdownToggle.contains(event.target)
    ) {
      categoryDropdownMenu.classList.remove("open");
      categoryDropdownToggle.setAttribute("aria-expanded", "false");
    }
  });
});
