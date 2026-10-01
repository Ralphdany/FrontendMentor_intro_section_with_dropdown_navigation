const dropdownButtons = document.getElementsByClassName("dropdown-btn");
const submenuOne = document.querySelector("#submenu-one");
const dropdownItemOne = document.querySelector("#dropdown-item1");
const dropdownItemTwo = document.querySelector("#dropdown-item2");
const submenuTwo = document.querySelector("#submenu-two");
const navigationBar = document.querySelector("#navigation");

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

function toggleDropdownMenu(button, submenu) {
  const isExpanded = button.getAttribute("aria-expanded") === "true";
  if (isExpanded) {
    closeDropdownMenu(button, submenu);
  } else {
    openDropdownMenu(button, submenu);
  }
}

const buttonOne = dropdownButtons[0];
const buttonTwo = dropdownButtons[1];

buttonOne.addEventListener("click", () => {
  toggleDropdownMenu(buttonOne, submenuOne);
});

dropdownItemOne.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (buttonOne.getAttribute("aria-expanded") === "false") return;
    closeDropdownMenu(buttonOne, submenuOne);
    buttonOne.focus();
  }
});

buttonTwo.addEventListener("click", () => {
  toggleDropdownMenu(buttonTwo, submenuTwo);
});

dropdownItemTwo.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (buttonTwo.getAttribute("aria-expanded") === "false") return;
    closeDropdownMenu(buttonTwo, submenuTwo);
    buttonTwo.focus();
  }
});

dropdownItemOne.addEventListener("focusout", (event) => {
  if (submenuOne.hidden) return;
  if (!dropdownItemOne.contains(event.relatedTarget)) {
    closeDropdownMenu(buttonOne, submenuOne);
  }
});

dropdownItemTwo.addEventListener("focusout", (event) => {
  if (submenuTwo.hidden) return;
  if (!dropdownItemTwo.contains(event.relatedTarget)) {
    closeDropdownMenu(buttonTwo, submenuTwo);
  }
});
