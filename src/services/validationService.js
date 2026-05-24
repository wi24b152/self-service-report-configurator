export function validateConfig(config, availableFields) {
  const validationMessages = [];

  if (!config.version || config.version !== "1.0") {
    validationMessages.push("Die Version der Konfiguration ist ungültig.");
  }

  if (!config.selectedFields || config.selectedFields.length === 0) {
    validationMessages.push("Bitte wählen Sie mindestens ein Datenfeld aus.");
  }

  if (!Array.isArray(config.filters)) {
    validationMessages.push("Die Filterstruktur ist ungültig.");
  } else {
    config.filters.forEach((filter, index) => {
      const hasField = filter.field && filter.field.trim() !== "";
      const hasValue = filter.value && filter.value.trim() !== "";

      if (hasField && !hasValue) {
        validationMessages.push(
          `Filter ${index + 1}: Bitte geben Sie einen Filterwert ein.`
        );
      }

      if (!hasField && hasValue) {
        validationMessages.push(
          `Filter ${index + 1}: Bitte wählen Sie ein Filterfeld aus.`
        );
      }

      if (hasField && !availableFields.includes(filter.field)) {
        validationMessages.push(
          `Filter ${index + 1}: Das ausgewählte Filterfeld ist ungültig.`
        );
      }
    });
  }

  if (config.sort?.field && !availableFields.includes(config.sort.field)) {
    validationMessages.push("Das ausgewählte Sortierfeld ist ungültig.");
  }

  if (!["asc", "desc"].includes(config.sort?.direction)) {
    validationMessages.push("Die Sortierrichtung ist ungültig.");
  }

  return validationMessages;
}

export function isValidImportedConfig(config) {
  return (
    config &&
    config.version === "1.0" &&
    Array.isArray(config.selectedFields) &&
    Array.isArray(config.filters) &&
    config.sort &&
    typeof config.sort.field === "string" &&
    typeof config.sort.direction === "string"
  );
}