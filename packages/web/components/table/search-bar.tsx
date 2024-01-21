'use client';

import { useState, Children, useEffect } from 'react';
import { Table, ScrollArea, Text, TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function SearchBar({ searchText, onSearch }) {
  return (
    <TextInput
      placeholder="Search by any field"
      mb="md"
      leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
      value={searchText}
      onChange={onSearch}
    />
  );
}
