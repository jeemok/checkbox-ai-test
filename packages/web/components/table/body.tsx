import { Children } from 'react';
import { Table } from '@mantine/core';
import { tryFn } from '@/utils/misc';
import NoResults from './no-results';
import ActionColumn from './action';

export default function Body({ data, columns, actions }) {
  if (data.length < 1) {
    return <NoResults data={data} />;
  }

  return Children.toArray(
    data.map((row: any) => (
      <Table.Tr>
        {Children.toArray(
          columns.map((column) => {
            // If custom formatting is requested
            let displayValue = tryFn(column.format, row[column.key]);
            // Render using custom component if given
            displayValue = tryFn(column.component, displayValue);

            return <Table.Td>{displayValue}</Table.Td>;
          })
        )}
        {/* Action column */}
        <Table.Td>
          <ActionColumn actions={actions} row={row} />
        </Table.Td>
      </Table.Tr>
    ))
  );
}
