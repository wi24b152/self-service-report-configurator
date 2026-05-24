import { useState, useEffect } from "react";
import "./App.css";
import ReportSummary from "./components/ReportSummary";
import ReportTable from "./components/ReportTable";
import ConfigPanel from "./components/ConfigPanel";
import MessageBox from "./components/MessageBox";
import ConfigPreview from "./components/ConfigPreview";
import HistoryList from "./components/HistoryList";
import { sampleData } from "./data/sampleData";
import { predefinedConfigs } from "./data/predefinedConfigs";
import { createReport } from "./services/reportService";
import {
  validateConfig,
  isValidImportedConfig,
} from "./services/validationService";
import {
  exportConfigAsJson,
  exportReportAsCsv,
} from "./services/exportService";
import { importConfigFromJsonFile } from "./services/importService";
import { createHistoryEntry } from "./services/historyService";

function App() {
  const availableFields = ["Artikel", "Kategorie", "Preis", "Bestand"];

  const [selectedFields, setSelectedFields] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [generatedReport, setGeneratedReport] = useState([]);
  const [reportConfig, setReportConfig] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reportHistory, setReportHistory] = useState([]);

  const handleFieldChange = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((item) => item !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  const handleAddFilter = () => {
    setFilters([...filters, { field: "", value: "" }]);
  };

  const handleRemoveFilter = (index) => {
    setFilters(filters.filter((_, filterIndex) => filterIndex !== index));
  };

  const handleFilterChange = (index, property, value) => {
    const updatedFilters = [...filters];

    updatedFilters[index] = {
      ...updatedFilters[index],
      [property]: value,
    };

    setFilters(updatedFilters);
  };

  const applyConfigToForm = (config) => {
    setSelectedFields(config.selectedFields || []);
    setFilters(config.filters || []);
    setSortField(config.sort?.field || "");
    setSortDirection(config.sort?.direction || "asc");
  };

  useEffect(() => {
    const config = {
      version: "1.0",
      selectedFields,
      filters,
      sort: {
        field: sortField,
        direction: sortDirection,
      },
    };

    const validationMessages = validateConfig(config, availableFields);

    if (validationMessages.length > 0) {
      setMessages(validationMessages);
      setGeneratedReport([]);
      setReportConfig(null);
      return;
    }

    const report = createReport(sampleData, config);

    setGeneratedReport(report);
    setReportConfig(config);
    setMessages([]);
  }, [selectedFields, filters, sortField, sortDirection]);

  const handleResetConfig = () => {
    setSelectedFields([]);
    setFilters([]);
    setSortField("");
    setSortDirection("asc");
    setGeneratedReport([]);
    setReportConfig(null);
    setMessages([]);
  };

  const handleLoadConfig = (configName) => {
    const config = predefinedConfigs[configName];

    applyConfigToForm(config);
    setMessages([]);
  };

  const handleLoadHistoryConfig = (config) => {
  applyConfigToForm(config);
  setMessages(["Reportkonfigurationen sind reproduzierbar und wiederverwendbar"]);
  };

  const handleSaveConfig = () => {
    if (!reportConfig) {
      setMessages(["Keine gültige Konfiguration zum Speichern vorhanden."]);
      return;
    }

    const historyEntry = createHistoryEntry(reportConfig);

    setReportHistory((prev) => [historyEntry, ...prev]);
    setMessages(["Gespeicherte Reportkonfiguration wurde in die aktuelle Konfiguration übernommen."]);
  };

  const handleExportConfig = () => {
    if (!reportConfig) {
      setMessages(["Es gibt keine gültige Reportkonfiguration zum Exportieren."]);
      return;
    }

    exportConfigAsJson(reportConfig);
    setMessages([]);
  };

  const handleImportConfig = async (event) => {
    const file = event.target.files[0];

    try {
      const importedConfig = await importConfigFromJsonFile(file);

      if (!isValidImportedConfig(importedConfig)) {
        setMessages([
          "Die importierte Datei enthält keine gültige Reportkonfiguration oder eine nicht unterstützte Version.",
        ]);
        return;
      }

      const validationMessages = validateConfig(importedConfig, availableFields);

      if (validationMessages.length > 0) {
        setMessages(validationMessages);
        return;
      }

      applyConfigToForm(importedConfig);
      setMessages([]);
    } catch (error) {
      setMessages([error.message]);
    } finally {
      event.target.value = "";
    }
  };

  const handleExportCsv = () => {
    if (!generatedReport || generatedReport.length === 0) {
      setMessages(["Es gibt keinen generierten Report zum Exportieren."]);
      return;
    }

    exportReportAsCsv(generatedReport);
    setMessages([]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Self-Service Reportkonfiguration</h1>
        <p>
          Prototypischer Mechanismus zur eigenständigen Konfiguration operativer
          Reports.
        </p>
      </header>

      <section className="card">
        <ConfigPanel
          availableFields={availableFields}
          selectedFields={selectedFields}
          filters={filters}
          sortField={sortField}
          sortDirection={sortDirection}
          onFieldChange={handleFieldChange}
          onFilterChange={handleFilterChange}
          onAddFilter={handleAddFilter}
          onRemoveFilter={handleRemoveFilter}
          setSortField={setSortField}
          setSortDirection={setSortDirection}
          onResetConfig={handleResetConfig}
          onLoadConfig={handleLoadConfig}
        />
      </section>

      <section className="card">
        <h2>Reportkonfiguration importieren</h2>
        <p>
          Bereits gespeicherte JSON-Konfigurationen können geladen und erneut
          verwendet werden.
        </p>

        <input type="file" accept=".json" onChange={handleImportConfig} />
      </section>

      <MessageBox messages={messages} />

      <section className="card">
        <h2>Aktuelle Reportkonfiguration</h2>

        <ConfigPreview
          config={reportConfig}
          onExportConfig={handleExportConfig}
        />

        <div className="action-row">
          <button onClick={handleSaveConfig}>
            Reportkonfiguration speichern
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Reportvorschau</h2>

        <ReportSummary config={reportConfig} reportData={generatedReport} />

        <ReportTable data={generatedReport} />

        <div className="action-row">
          <button onClick={handleExportCsv}>Report als CSV exportieren</button>
        </div>
      </section>

      <section className="card">
        <h2>Gespeicherte Reportkonfigurationen</h2>

        <HistoryList
          reportHistory={reportHistory}
          onLoadHistoryConfig={handleLoadHistoryConfig}
        />
      </section>
    </div>
  );
}

export default App;