import { useState } from "react";

function ConfigPreview({ config, onExportConfig }) {
  const [isVisible, setIsVisible] = useState(false);

  if (!config) {
    return <p>Keine gültige Konfiguration vorhanden.</p>;
  }

  return (
    <>
      <div className="action-row">
        <button
          className="secondary"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible
            ? "JSON-Konfiguration ausblenden"
            : "JSON-Konfiguration anzeigen"}
        </button>

        <button onClick={onExportConfig}>
          Reportkonfiguration als JSON exportieren
        </button>
      </div>

      {isVisible && <pre>{JSON.stringify(config, null, 2)}</pre>}
    </>
  );
}

export default ConfigPreview;