import dayjs from 'dayjs';
import { Badge } from '@mantine/core';
import { getStatusByDueDate, getStatusColor } from '@/utils/misc';
import Table from '@/components/table';

export default function TaskList({ tasks, onEdit, onDelete }) {
  // Add in custom fields
  const data = tasks.map((each: any) => ({
    ...each,
    status: getStatusByDueDate(each.dueAt),
  }));

  return (
    <Table
      data={data}
      columns={[
        { key: 'title', label: 'Name' },
        { key: 'description', label: 'Description' },
        {
          key: 'dueAt',
          label: 'Due Date',
          format: (value: any) => dayjs(value).format('D MMM YYYY'),
        },
        {
          key: 'createdAt',
          label: 'Create Date',
          format: (value: any) => dayjs(value).format('D MMM YYYY'),
        },
        {
          key: 'status',
          label: 'Status',
          component: (value: any) => (
            <Badge color={getStatusColor(value)} variant="light">
              {value}
            </Badge>
          ),
        },
      ]}
      actions={{
        onEdit: (data: any) => onEdit(data),
        onDelete: (data: any) => onDelete(data),
      }}
    />
  );
}
