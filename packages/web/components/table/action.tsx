import { ActionIcon, Group, rem } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';

export default function ActionColumn({ actions, row }) {
  return (
    <Group gap={0} justify="flex-end">
      <ActionIcon variant="subtle" color="gray" onClick={() => actions?.onEdit(row)}>
        <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>
      <ActionIcon variant="subtle" color="red" onClick={() => actions?.onDelete(row)}>
        <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
