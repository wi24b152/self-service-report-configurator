function ReportSummary({ config, reportData }) {
  if (!config) {
    return null;
  }

  const selectedFieldCount = config.selectedFields.length;
  const activeFilterCount = config.filters.filter(
    (filter) => filter.field && filter.value
  ).length;
  const rowCount = reportData.length;

  return (
    <div className="summary-box">
      <div>
        <strong>{selectedFieldCount}</strong>
        <span> ausgewählte Felder</span>
      </div>

      <div>
        <strong>{activeFilterCount}</strong>
        <span> aktive Filter</span>
      </div>

      <div>
        <strong>{rowCount}</strong>
        <span> Datensätze im Report</span>
      </div>
    </div>
  );
}

export default ReportSummary;