import { Table, Text } from '@mantine/core';

export default function NoResults({ data }) {
  // ColSpan + additional 1 for the action column
  const colSpan = Object.keys(data[0] || []).length + 1;
  return (
    <Table.Tr>
      <Table.Td colSpan={colSpan}>
        <Text fw={500} ta="center">
          Nothing found
        </Text>
      </Table.Td>
    </Table.Tr>
  );
}
