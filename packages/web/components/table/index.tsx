'use client';

import { useState, Children, useEffect } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import { sortData } from '@/utils/table';
import Th from './th';
import SearchBar from './search-bar';
import Body from './body';

export default function CustomTable({ data, columns, actions }) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // If data has updated
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search, columns }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value, columns })
    );
  };

  return (
    <ScrollArea>
      <SearchBar searchText={search} onSearch={handleSearchChange} />
      <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="auto">
        <Table.Thead>
          <Table.Tr>
            {Children.toArray(
              columns.map((column) => (
                <Th
                  sorted={sortBy === column.key}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting(column.key)}
                >
                  {column.label}
                </Th>
              ))
            )}
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Body data={sortedData} columns={columns} actions={actions} />
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
