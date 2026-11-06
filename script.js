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
async function loadKinalurWeather() {
  const latitude = 11.46667;
  const longitude = 75.83333;

  const apiUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
    `&daily=precipitation_probability_max` +
    `&timezone=Asia%2FKolkata`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();

    const current = data.current;
    const daily = data.daily;

    document.getElementById("temperature").textContent =
      `${Math.round(current.temperature_2m)}°C`;

    document.getElementById("humidity").textContent =
      `${current.relative_humidity_2m}%`;

    document.getElementById("wind").textContent =
      `${Math.round(current.wind_speed_10m)} km/h`;

    document.getElementById("rain").textContent =
      `${daily.precipitation_probability_max[0]}%`;

    const weather = getWeatherDescription(current.weather_code);

    document.getElementById("weather-condition").textContent =
      weather.description;

    document.getElementById("weather-icon").textContent =
      weather.icon;

    const updateTime = new Date(current.time);

    document.getElementById("weather-updated").textContent =
      `Updated ${updateTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      })}`;
  } catch (error) {
    console.error("Weather error:", error);

    document.getElementById("weather-condition").textContent =
      "Weather unavailable";

    document.getElementById("weather-updated").textContent =
      "Unable to load weather data";
  }
}


function getWeatherDescription(code) {
  if (code === 0) {
    return {
      description: "Clear sky",
      icon: "☀️"
    };
  }

  if ([1, 2, 3].includes(code)) {
    return {
      description: "Partly cloudy",
      icon: "⛅"
    };
  }

  if ([45, 48].includes(code)) {
    return {
      description: "Foggy",
      icon: "🌫️"
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      description: "Drizzle",
      icon: "🌦️"
    };
  }

  if ([61, 63, 65, 66, 67].includes(code)) {
    return {
      description: "Rain",
      icon: "🌧️"
    };
  }

  if ([71, 73, 75, 77].includes(code)) {
    return {
      description: "Snow",
      icon: "❄️"
    };
  }

  if ([80, 81, 82].includes(code)) {
    return {
      description: "Rain showers",
      icon: "🌦️"
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      description: "Thunderstorm",
      icon: "⛈️"
    };
  }

  return {
    description: "Unknown",
    icon: "🌤️"
  };
}


// Load weather
loadKinalurWeather();

// Refresh every 15 minutes
setInterval(loadKinalurWeather, 15 * 60 * 1000);