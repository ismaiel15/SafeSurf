chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "showWarning") {
    showWarning(message.url);
  }
});

function showWarning(url) {
  const warning = document.createElement("div");
  warning.innerHTML = `
    ⚠️ <b>SafeSurf Alert</b><br>
    This website looks suspicious:<br>
    <small>${url}</small><br>
    Do NOT enter your password!
  `;

  warning.style.position = "fixed";
  warning.style.top = "0";
  warning.style.left = "0";
  warning.style.width = "100%";
  warning.style.backgroundColor = "red";
  warning.style.color = "white";
  warning.style.padding = "15px";
  warning.style.zIndex = "999999";
  warning.style.fontFamily = "Arial";

  document.body.appendChild(warning);
}

// Password field detection
const passwordFields = document.querySelectorAll("input[type='password']");

if (passwordFields.length > 0) {
  alert("⚠️ SafeSurf Warning: This page asks for a password. Make sure the site is safe!");
}