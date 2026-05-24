export const predefinedConfigs = {
  elektronikReport: {
    version: "1.0",
    selectedFields: ["Artikel", "Kategorie", "Preis"],
    filters: [{ field: "Kategorie", value: "Elektronik" }],
    sort: { field: "Preis", direction: "asc" },
  },

  lagerReport: {
    version: "1.0",
    selectedFields: ["Artikel", "Bestand"],
    filters: [],
    sort: { field: "Bestand", direction: "desc" },
  },
};