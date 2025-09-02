
const ITEMS = [
  { key: "politicas", label: "Políticas", emoji: "📜" },
  { key: "manuais", label: "Manuais", emoji: "📘" },
  { key: "modelos", label: "Modelos de documentos", emoji: "📄" },
  { key: "backoffice", label: "BackOffice", emoji: "🏢" },
  { key: "engenharia", label: "Engenharia", emoji: "🛠️" },
  { key: "negocios", label: "Negócios", emoji: "📈" },
];

function ensureEmbedded(u){
  // add env=Embedded and isDlg=1 to reduce chrome (modern)
  let url = u;
  url += (url.includes("?") ? "&" : "?") + "env=Embedded";
  url += "&isDlg=1";
  return url;
}

function openItem(item){
  const cfg = CONFIG.ITEMS[item.key] || {};
  const base = cfg.embedUrl || cfg.url || "#";
  if (!base || base === "#") { alert("URL não configurada."); return; }
  const finalUrl = ensureEmbedded(base);
  // Navega na mesma aba (sem iframe) para evitar bloqueio X-Frame-Options do SharePoint
  window.location.href = finalUrl;
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

document.addEventListener("DOMContentLoaded", renderGrid);
