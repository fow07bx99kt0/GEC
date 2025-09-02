// Ajuste APENAS estes 3 valores se necessário.
const CONFIG = {
  TENANT_HOST: "corpalloteamentos.sharepoint.com",
  SITE_PATH: "/sites/Corpal",
  // Altere conforme o nome real da sua biblioteca no SharePoint:
  // Opções comuns: "Documentos Compartilhados" (PT-BR), "Documentos", "Shared Documents"
  DOCUMENT_LIBRARY: "Documentos Compartilhados",

  // (Opcional) Overrides por item (se quiser apontar para outra pasta específica)
  politicas:  { /* embed: "URL_COMPLETA_AllItems.aspx?id=...&env=Embedded" */ },
  manuais:    { },
  modelos:    { },
  backoffice: { },
  engenharia: { },
  negocios:   { }
};
