
let inTeams = false;
if (window.microsoftTeams && microsoftTeams.app) {
  microsoftTeams.app.initialize().then(() => { inTeams = true; });
}

const ITEMS = [
  { key: "politicas", label: "Políticas", emoji: "📜", folder: "Políticas" },
  { key: "manuais", label: "Manuais", emoji: "📘", folder: "Manuais" },
  { key: "modelos", label: "Modelos de documentos", emoji: "📄", folder: "Modelos de documentos" },
  { key: "backoffice", label: "BackOffice", emoji: "🏢", folder: "BackOffice" },
  { key: "engenharia", label: "Engenharia", emoji: "🛠️", folder: "Engenharia" },
  { key: "negocios", label: "Negócios", emoji: "📈", folder: "Negócios" },
];

function enc(s){ return encodeURIComponent(s).replace(/%2F/g, "/"); }

function buildEmbedUrlFor(folderName){
  const host = CONFIG.TENANT_HOST;         // ex: corpalloteamentos.sharepoint.com
  const sitePath = CONFIG.SITE_PATH;       // ex: /sites/Corpal
  const lib = CONFIG.DOCUMENT_LIBRARY;     // ex: Documentos Compartilhados | Documentos | Shared Documents
  const base = `https://${host}${sitePath}/Documentos%20Compartilhados/Forms/AllItems.aspx`; // default
  // Use configured library name (URI-encoded)
  const libEnc = enc(lib);
  const idPath = `${sitePath}/${libEnc}/${enc(folderName)}`;
  const url = `https://${host}${sitePath}/${libEnc}/Forms/AllItems.aspx?id=${enc(idPath)}&env=Embedded`;
  return url;
}

function buildFallback(url){
  // Append env=Embedded to any original share link
  try {
    const u = new URL(url);
    if (!u.searchParams.has("env")) u.searchParams.set("env", "Embedded");
    return u.toString();
  } catch(e){
    return url.includes("?") ? url + "&env=Embedded" : url + "?env=Embedded";
  }
}

function openItem(item){
  const cfg = CONFIG[item.key] || {};
  // Priority 1: explicit embed override
  if (cfg.embed) { window.location.href = cfg.embed; return; }
  // Priority 2: build from library variable
  const target = buildEmbedUrlFor(item.folder);
  window.location.href = target;
}

function render(){
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

document.getElementById("openInBrowser").onclick = () => {
  if (window !== window.top) { window.open(window.location.href, "_blank"); }
};
document.addEventListener("DOMContentLoaded", render);
