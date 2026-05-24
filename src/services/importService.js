export function importConfigFromJsonFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("Keine Datei ausgewählt."));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const importedConfig = JSON.parse(event.target.result);
        resolve(importedConfig);
      } catch {
        reject(new Error("Die Datei konnte nicht gelesen werden. Bitte eine gültige JSON-Datei auswählen."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Beim Lesen der Datei ist ein Fehler aufgetreten."));
    };

    reader.readAsText(file);
  });
}