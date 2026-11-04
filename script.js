const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const menuIcon = toggle.querySelector("span");
const closeMenu = () => {
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Open menu");
  menuIcon.textContent = "☰";
  document.body.classList.remove("menu-open");
};

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuIcon.textContent = open ? "×" : "☰";
  document.body.classList.toggle("menu-open", open);
});
document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => {
  closeMenu();
}));
window.addEventListener("resize", () => {
  if (window.innerWidth > 650) closeMenu();
});
document.getElementById("year").textContent = new Date().getFullYear();

// Published SEVEN CROSS membership application form.
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdAtzKcMsCwvL7qzzyFJHOjy75QixgFjeIDwhWX4oHgTIxVEw/viewform";
const membershipLink = document.getElementById("membershipLink");
membershipLink.href = GOOGLE_FORM_URL.startsWith("http") ? GOOGLE_FORM_URL : "#";
membershipLink.addEventListener("click", event => {
  if (!GOOGLE_FORM_URL.startsWith("http")) {
    event.preventDefault();
    alert("Add your Google Form link in script.js to activate membership registration.");
  }
});
