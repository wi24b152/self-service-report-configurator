export function createReport(data, config) {
  let result = [...data];

  result = applyFilters(result, config.filters);
  result = applySorting(result, config.sort);
  result = selectFields(result, config.selectedFields);

  return result;
}

function applyFilters(data, filters) {
  if (!filters || filters.length === 0) {
    return data;
  }

  return data.filter((row) =>
    filters.every((filter) => {
      if (!filter.field || !filter.value) {
        return true;
      }

      return String(row[filter.field])
        .toLowerCase()
        .includes(filter.value.toLowerCase());
    })
  );
}

function applySorting(data, sort) {
  if (!sort.field) {
    return data;
  }

  return [...data].sort((a, b) => {
    const valueA = a[sort.field];
    const valueB = b[sort.field];

    if (!isNaN(valueA) && !isNaN(valueB)) {
      return sort.direction === "asc"
        ? Number(valueA) - Number(valueB)
        : Number(valueB) - Number(valueA);
    }

    return sort.direction === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });
}

function selectFields(data, selectedFields) {
  if (!selectedFields || selectedFields.length === 0) {
    return [];
  }

  return data.map((row) => {
    const selectedRow = {};

    selectedFields.forEach((field) => {
      selectedRow[field] = row[field];
    });

    return selectedRow;
  });
}