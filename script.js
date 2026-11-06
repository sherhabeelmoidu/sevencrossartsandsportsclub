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
function closeWelcome() {
    document.getElementById("welcomePopup").style.display = "none";
}
/* ==========================================
   KINALUR LIVE WEATHER
   Open-Meteo API
========================================== */

const KINALUR_LAT = 11.46667;
const KINALUR_LON = 75.83333;


function weatherDescription(code) {

  if (code === 0) {
    return ["Clear sky", "☀️"];
  }

  if ([1, 2, 3].includes(code)) {
    return ["Partly cloudy", "⛅"];
  }

  if ([45, 48].includes(code)) {
    return ["Foggy", "🌫️"];
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return ["Drizzle", "🌦️"];
  }

  if ([61, 63, 65, 66, 67].includes(code)) {
    return ["Rain", "🌧️"];
  }

  if ([71, 73, 75, 77].includes(code)) {
    return ["Snow", "❄️"];
  }

  if ([80, 81, 82].includes(code)) {
    return ["Rain showers", "🌦️"];
  }

  if ([95, 96, 99].includes(code)) {
    return ["Thunderstorm", "⛈️"];
  }

  return ["Weather update", "🌤️"];
}


async function loadKinalurWeather() {

  const api =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${KINALUR_LAT}` +
    `&longitude=${KINALUR_LON}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
    `&daily=precipitation_probability_max` +
    `&timezone=Asia%2FKolkata`;


  try {

    const response = await fetch(api);

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }


    const data = await response.json();

    const current = data.current;

    const rainChance =
      data.daily?.precipitation_probability_max?.[0] ?? 0;


    const [description, icon] =
      weatherDescription(current.weather_code);


    document.getElementById("temperature").textContent =
      `${Math.round(current.temperature_2m)}°C`;


    document.getElementById("weather-condition").textContent =
      description;


    document.getElementById("weather-icon").textContent =
      icon;


    document.getElementById("humidity").textContent =
      `${current.relative_humidity_2m}%`;


    document.getElementById("wind").textContent =
      `${Math.round(current.wind_speed_10m)} km/h`;


    document.getElementById("rain").textContent =
      `${rainChance}%`;


    const updated =
      new Date(current.time);


    document.getElementById("weather-updated").textContent =
      `Kinalur · Updated ${updated.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      })}`;

  }


  catch (error) {

    console.error("Kinalur weather error:", error);

    document.getElementById("weather-condition").textContent =
      "Weather temporarily unavailable";


    document.getElementById("weather-updated").textContent =
      "Please refresh the page to try again";

  }

}


/* Load weather */
loadKinalurWeather();


/* Refresh weather every 15 minutes */
setInterval(
  loadKinalurWeather,
  15 * 60 * 1000
);



/* ==========================================
   NEXT EVENT COUNTDOWN
========================================== */


/*
  IMPORTANT:

  When you know the actual event date,
  change this:

  const NEXT_EVENT_DATE = "";

  Example:

  const NEXT_EVENT_DATE =
    "2026-12-20T16:30:00+05:30";
*/

const NEXT_EVENT_DATE = "2026-11-16T09:00:00+05:30";


const nextEventTitle =
  "keralotsavam tournaments";


function updateCountdown() {

  const countdown =
    document.getElementById("countdown");


  if (!countdown) {
    return;
  }


  /* No event date added yet */

  if (!NEXT_EVENT_DATE) {

    countdown.innerHTML = `

      <div>
        <strong>--</strong>
        <small>DAYS</small>
      </div>

      <div>
        <strong>--</strong>
        <small>HOURS</small>
      </div>

      <div>
        <strong>--</strong>
        <small>MIN</small>
      </div>

      <div>
        <strong>--</strong>
        <small>SEC</small>
      </div>

    `;

    return;
  }


  const target =
    new Date(NEXT_EVENT_DATE).getTime();


  const difference =
    Math.max(0, target - Date.now());


  const days =
    Math.floor(difference / 86400000);


  const hours =
    Math.floor(difference / 3600000) % 24;


  const minutes =
    Math.floor(difference / 60000) % 60;


  const seconds =
    Math.floor(difference / 1000) % 60;


  countdown.innerHTML = `

    <div>
      <strong>${String(days).padStart(2, "0")}</strong>
      <small>DAYS</small>
    </div>

    <div>
      <strong>${String(hours).padStart(2, "0")}</strong>
      <small>HOURS</small>
    </div>

    <div>
      <strong>${String(minutes).padStart(2, "0")}</strong>
      <small>MIN</small>
    </div>

    <div>
      <strong>${String(seconds).padStart(2, "0")}</strong>
      <small>SEC</small>
    </div>

  `;

}


document.getElementById("next-event-title").textContent =
  nextEventTitle;


updateCountdown();


setInterval(
  updateCountdown,
  1000
);