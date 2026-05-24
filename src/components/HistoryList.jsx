import { useState } from "react";

function HistoryEntry({ entry, onLoadHistoryConfig }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="history-entry">
      <div className="history-header">
        <strong>{entry.createdAt}</strong>

        <div className="action-row">
          <button
            className="secondary"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? "Details ausblenden" : "Details anzeigen"}
          </button>

          <button onClick={() => onLoadHistoryConfig(entry.config)}>
            In Konfiguration übernehmen
          </button>
        </div>
      </div>

      {isVisible && <pre>{JSON.stringify(entry.config, null, 2)}</pre>}
    </div>
  );
}

function HistoryList({ reportHistory, onLoadHistoryConfig }) {
  if (!reportHistory || reportHistory.length === 0) {
    return <p>Noch keine gültigen Reportkonfigurationen gespeichert.</p>;
  }

  return (
    <div className="history-list">
      {reportHistory.map((entry) => (
        <HistoryEntry
          key={entry.id}
          entry={entry}
          onLoadHistoryConfig={onLoadHistoryConfig}
        />
      ))}
    </div>
  );
}

export default HistoryList;