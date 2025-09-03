
const ITEMS = [
  { key: "politicas", label: "Políticas", emoji: "📜" },
  { key: "manuais", label: "Manuais", emoji: "📘" },
  { key: "modelos", label: "Modelos de documentos", emoji: "📄" },
  { key: "backoffice", label: "BackOffice", emoji: "🏢" },
  { key: "engenharia", label: "Engenharia", emoji: "🛠️" },
  { key: "negocios", label: "Negócios", emoji: "📈" },
];

function openItem(item){
  const cfg = CONFIG.ITEMS[item.key] || {};
  const url = cfg.embedUrl || cfg.url || "#";
  if (!url || url === "#") { alert("URL não configurada."); return; }
  document.getElementById("grid").style.display = "none";
  const viewer = document.getElementById("viewer");
  viewer.classList.add("active");
  const frame = document.getElementById("frame");
  frame.src = url;
  document.getElementById("crumb").textContent = item.label;
  document.getElementById("openExternal").href = url.replace("&env=Embedded","");
}

function renderGrid(){
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  ITEMS.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="row">
        <div class="badge">${item.emoji}</div>
        <div><h3>${item.label}</h3></div>
      </div>
    `;
    div.onclick = () => openItem(item);
    grid.appendChild(div);
  });
}

document.getElementById("back").onclick = () => {
  document.getElementById("viewer").classList.remove("active");
  document.getElementById("grid").style.display = "grid";
};

document.addEventListener("DOMContentLoaded", renderGrid);
