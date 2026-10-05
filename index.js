const navigationBar = document.querySelector("#navigation");
const navigationContainer = document.querySelector("#nav-container");
const mobileMenuOpenBtn = document.querySelector("#nav-open-btn");
const mobileMenuCloseBtn = document.querySelector("#close-btn");
const dropdownItems = document.querySelectorAll(".dropdown-item");

const focusableNavNodes = navigationBar.querySelectorAll("button, a[href]");
const isMobile = window.matchMedia("(max-width: 768px)");

function activateDropdown(dropdownItem) {
  const trigger = dropdownItem.firstElementChild;
  const dropdown = dropdownItem.lastElementChild;
  const activeDropdownItem = getActiveDropdown();

  if (activeDropdownItem === undefined) {
    openDropdownMenu(trigger, dropdown);
    return;
  } else if (dropdownItem === activeDropdownItem) {
    closeDropdownMenu(trigger, dropdown);
    return;
  } else {
    closeDropdownMenu(
      activeDropdownItem.firstElementChild,
      activeDropdownItem.lastElementChild,
    );
    openDropdownMenu(trigger, dropdown);
    return;
  }
}

function getActiveDropdown() {
  const allDropdownItems = Array.from(dropdownItems);
  return allDropdownItems.find(
    (element) =>
      element.firstElementChild.getAttribute("aria-expanded") === "true",
  );
}

function openDropdownMenu(button, submenu) {
  const icon = button.lastElementChild;
  button.setAttribute("aria-expanded", `${true}`);
  submenu.hidden = false;
  icon.style.transform = "rotate(180deg)";
}

function closeDropdownMenu(button, submenu) {
  const icon = button.lastElementChild;
  button.setAttribute("aria-expanded", `${false}`);
  submenu.hidden = true;
  icon.style.transform = "rotate(0deg)";
}

function openMobileMenu() {
  navigationContainer.classList.add("show-backdrop");
  document.body.classList.add("lock-scroll");
  mobileMenuOpenBtn.setAttribute("aria-expanded", "true");
  mobileMenuCloseBtn.focus();
}

function closeMobileMenu() {
  const activeDropdown = getActiveDropdown();
  navigationContainer.classList.remove("show-backdrop");
  document.body.classList.remove("lock-scroll");
  mobileMenuOpenBtn.setAttribute("aria-expanded", "false");
  if (activeDropdown) activateDropdown(activeDropdown);
  if (isMobile.matches) mobileMenuOpenBtn.focus();
}

dropdownItems.forEach((element) => {
  element.firstElementChild.addEventListener("click", () => {
    activateDropdown(element);
  });
  element.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeDropdownMenu(element.firstElementChild, element.lastElementChild);
      element.firstElementChild.focus();
    }
  });
});
navigationBar.addEventListener("focusout", (event) => {
  const activeDropdown = getActiveDropdown();
  if (
    !navigationBar.contains(event.relatedTarget) &&
    activeDropdown !== undefined
  ) {
    closeDropdownMenu(
      activeDropdown.firstElementChild,
      activeDropdown.lastElementChild,
    );
  }
});

mobileMenuOpenBtn.addEventListener("click", () => {
  openMobileMenu();
});
mobileMenuCloseBtn.addEventListener("click", () => {
  closeMobileMenu();
});
navigationBar.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});
navigationBar.addEventListener("keydown", (event) => {
  const mobileMenuOpen =
    navigationContainer.classList.contains("show-backdrop");
  const focusableNavItems = Array.from(focusableNavNodes).filter((element) => {
    return !element.closest("[hidden]");
  });
  const firstItem = focusableNavItems[0];
  const lastItem = focusableNavItems[focusableNavItems.length - 1];
  if (
    event.key === "Tab" &&
    document.activeElement === lastItem &&
    !event.shiftKey &&
    mobileMenuOpen
  ) {
    event.preventDefault();
    firstItem.focus();
    return;
  }
  if (
    event.shiftKey &&
    event.key === "Tab" &&
    document.activeElement === firstItem &&
    mobileMenuOpen
  ) {
    event.preventDefault();
    lastItem.focus();
    return;
  }
});
navigationContainer.addEventListener("pointerdown", (event) => {
  if (!(event.target === navigationContainer)) return;
  closeMobileMenu();
});

isMobile.addEventListener("change", (event) => {
  if (!event.matches && navigationContainer.classList.contains("show-backdrop"))
    closeMobileMenu();
});
