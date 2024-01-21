import { keys } from '@mantine/core';

export function filterData(data, search, columns) {
  const query = search.toLowerCase().trim();

  return data.filter((item) =>
    keys(data[0]).some((key) => {
      let value = item[key] || '';

      // Use the value after custom formatting instead of the original data value
      const customFormat = columns.find((column) => column.key === key)?.format;
      if (typeof customFormat === 'function') {
        value = customFormat(value);
      }

      return String(value).toLowerCase().includes(query);
    })
  );
}

export function sortData(
  data: any,
  payload: {
    sortBy: string;
    reversed: boolean;
    search: string;
    columns: any;
  }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search, payload.columns);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return String(b[sortBy]).localeCompare(a[sortBy]);
      }
      return String(a[sortBy]).localeCompare(b[sortBy]);
    }),
    payload.search,
    payload.columns
  );
}
