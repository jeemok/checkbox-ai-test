import { Fieldset, Box } from '@mantine/core';
import TaskForm from '@/components/form/task';

export default function CreateForm({ onSubmit }) {
  return (
    <Box maw={340} mx="auto">
      <Fieldset legend="Add new task">
        <TaskForm onSubmit={onSubmit} />
      </Fieldset>
    </Box>
  );
}
