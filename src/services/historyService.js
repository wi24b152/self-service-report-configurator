export function createHistoryEntry(config) {
  return {
    id: Date.now(),
    createdAt: new Date().toLocaleString(),
    config,
  };
}