export function exportConfigAsJson(config) {
  const jsonString = JSON.stringify(config, null, 2);

  const blob = new Blob([jsonString], {
    type: "application/json",
  });

  downloadFile(blob, "report-configuration.json");
}

export function exportReportAsCsv(reportData) {
  const columns = Object.keys(reportData[0]);
  const header = columns.join(";");

  const rows = reportData.map((row) =>
    columns
      .map((column) => {
        const value = row[column] ?? "";
        return `"${String(value).replaceAll('"', '""')}"`;
      })
      .join(";")
  );

  const csvContent = [header, ...rows].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  downloadFile(blob, "generated-report.csv");
}

function downloadFile(blob, fileName) {
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.click();

  URL.revokeObjectURL(url);
}