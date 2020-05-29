const toggleSwitch = document.querySelector( '.theme-switch input[type="checkbox"]');

const Tag = document.getElementById("toggle-text");

//toggle between light and dark mode
function switchTheme(e) {
  if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      Tag.innerText = "Nepa Why Na!";
      localStorage.setItem("theme", "dark");
      
  } else {
      document.documentElement.setAttribute("data-theme", "light");
      Tag.innerText = "Yay! up Nepa!";
     localStorage.setItem("theme", "light");
      
  }
}

//save bg to local store
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
      toggleSwitch.checked = true;
      Tag.innerText = "Nepa Why Na!"
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);
