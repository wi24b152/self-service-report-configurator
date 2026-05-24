function ReportTable({ data }) {
  if (!data || data.length === 0) {
    return <p>Noch kein Report vorhanden.</p>;
  }

  const columns = Object.keys(data[0]);

  if (columns.length === 0) {
    return <p>Keine Datenfelder für den Report ausgewählt.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((field) => (
              <td key={field}>{row[field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;