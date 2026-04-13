async function getIP() {
  const el = document.getElementById("ip");
  el.textContent = "Loading IP...";

  try {
    
    const ipRes = await fetch("https://api.ipify.org?format=json");
    if (!ipRes.ok) throw new Error("Failed to fetch IP");
    const ipData = await ipRes.json();

 
    const geoRes = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
    const geoData = await geoRes.json();

    el.innerHTML = `
      <h5>Min IP-adress</h5>
      <p>IP: ${ipData.ip}</p>
      <p>${geoData.city}, ${geoData.country_name}</p>
    `;
  } catch (err) {
    console.error(err);
    el.textContent = "Could not load IP";
  }
}

document.addEventListener("DOMContentLoaded", getIP);
