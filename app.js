
let inTeams = false;
if (window.microsoftTeams && microsoftTeams.app) {
  microsoftTeams.app.initialize().then(() => { inTeams = true; });
}

const ITEMS = [
  { key: "politicas", label: "Políticas", emoji: "📜" },
  { key: "manuais", label: "Manuais", emoji: "📘" },
  { key: "modelos", label: "Modelos de documentos", emoji: "📄" },
  { key: "backoffice", label: "BackOffice", emoji: "🏢" },
  { key: "engenharia", label: "Engenharia", emoji: "🛠️" },
  { key: "negocios", label: "Negócios", emoji: "📈" },
];

function openUrl(url){
  if(!url || url === "#"){ alert("URL não configurada para esta categoria."); return; }
  // Navegação same-tab para manter dentro do frame do Teams
  window.location.href = url;
}

function render(){
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  ITEMS.forEach(item => {
    const cfg = (CONFIG[item.key]||{});
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="row">
        <div class="badge">${item.emoji}</div>
        <div>
          <h3>${item.label}</h3>
          <p>${cfg.description || "Acessar diretório de documentos"}</p>
        </div>
      </div>
    `;
    div.onclick = () => openUrl(cfg.url);
    grid.appendChild(div);
  });
}

document.getElementById("openInBrowser").onclick = () => {
  if (window !== window.top) { window.open(window.location.href, "_blank"); }
};

document.addEventListener("DOMContentLoaded", render);
