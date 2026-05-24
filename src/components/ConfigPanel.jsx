function ConfigPanel({
  availableFields,
  selectedFields,
  filters,
  sortField,
  sortDirection,
  onFieldChange,
  onFilterChange,
  onAddFilter,
  onRemoveFilter,
  setSortField,
  setSortDirection,
  onResetConfig,
  onLoadConfig,
}) {
  return (
    <>
      <h2>Vordefinierte Reportkonfigurationen</h2>

      <div className="action-row">
        <button
          className="secondary"
          onClick={() => onLoadConfig("elektronikReport")}
        >
          Elektronik-Report laden
        </button>

        <button
          className="secondary"
          onClick={() => onLoadConfig("lagerReport")}
        >
          Lager-Report laden
        </button>
      </div>

      <h2>Datenfelder auswählen</h2>

      <div className="field-list">
        {availableFields.map((field) => (
          <label className="field-option" key={field}>
            <input
              type="checkbox"
              checked={selectedFields.includes(field)}
              onChange={() => onFieldChange(field)}
            />
            {field}
          </label>
        ))}
      </div>

      <h2>Filterbedingungen definieren</h2>

      {filters.length === 0 && <p>Keine Filterbedingungen definiert.</p>}

      {filters.map((filter, index) => (
        <div className="form-row" key={index}>
          <label>Filterfeld: </label>

          <select
            value={filter.field}
            onChange={(e) => onFilterChange(index, "field", e.target.value)}
          >
            <option value="">Bitte auswählen</option>

            {availableFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>

          <label>Filterwert: </label>

          <input
            type="text"
            value={filter.value}
            onChange={(e) => onFilterChange(index, "value", e.target.value)}
          />

          <button
            className="secondary"
            onClick={() => onRemoveFilter(index)}
          >
            Entfernen
          </button>
        </div>
      ))}

      <div className="action-row">
        <button onClick={onAddFilter}>Filterbedingung hinzufügen</button>
      </div>

      <h2>Sortierung festlegen</h2>

      <div className="form-row">
        <label>Sortierfeld: </label>

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="">Bitte auswählen</option>

          {availableFields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label>Sortierrichtung: </label>

        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Aufsteigend</option>
          <option value="desc">Absteigend</option>
        </select>
      </div>

      <div className="action-row">
        <button className="danger" onClick={onResetConfig}>
          Konfiguration zurücksetzen
        </button>
      </div>
    </>
  );
}

export default ConfigPanel;