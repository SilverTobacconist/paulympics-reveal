const API_BASE = "/.netlify/functions/results";

function getLoc() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("loc") || "practice").toLowerCase().trim();
}

const el = (id) => document.getElementById(id);

async function loadResults(){
  const loc = getLoc();
  el("locLabel").textContent = loc.toUpperCase() + " Results";

  const url = `${API_BASE}?loc=${encodeURIComponent(loc)}`;
  const res = await fetch(url);
  const data = await res.json();

  el("thirdNames").textContent = data.third.names.join(", ");
  el("thirdPoints").textContent = data.third.points + " pts";

  el("secondNames").textContent = data.second.names.join(", ");
  el("secondPoints").textContent = data.second.points + " pts";

  el("champNames").textContent = data.champion.names.join(", ");
  el("champPoints").textContent = data.champion.points + " pts";
}

function show(id){
  el(id).classList.add("show");
}

function reset(){
  ["third","second","champ"].forEach(id => el(id).classList.remove("show"));
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadResults();

  el("btn3").onclick = () => show("third");
  el("btn2").onclick = () => show("second");
  el("btn1").onclick = () => show("champ");
  el("btnR").onclick = reset;
});