import dayjs from 'dayjs';
import sample from 'lodash.sample';
import { TextInput, Button, Group, Textarea, Text } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';

const PLACEHOLDERS = {
  name: [
    'Enter the name of your next big adventure!',
    'What shall we call this masterpiece?',
    'Name this brainchild, please!',
    "This task's secret code name...",
  ],
  description: [
    'Describe this task as if it were a spy mission...',
    "In a world where this task is the hero, what's its story?",
    'Paint a word picture. Bob Ross style.',
    "This task's epic saga begins here...",
    "Imagine you're telling an alien about this task. Go!",
  ],
};

// Decide the placeholder on app load instead of putting it inside the function
// so that it wouldn't change when rerender
const placeholderName = sample(PLACEHOLDERS.name);
const placeholderDescription = sample(PLACEHOLDERS.description);

export default function TaskForm({ data, onSubmit }) {
  const initialValues = {
    title: '',
    description: '',
    dueAt: dayjs().startOf('date').toDate(),
  };

  const form = useForm({
    initialValues: Object.assign({}, initialValues, data),
    validate: {
      title: (value) => (!!value ? null : 'Name is required'),
      description: (value) => (!!value ? null : 'Description is required'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <TextInput
        mb="sm"
        withAsterisk
        label="Name"
        placeholder={placeholderName}
        {...form.getInputProps('title')}
      />

      <Textarea
        autosize
        withAsterisk
        minRows={3}
        mb="sm"
        label="Description"
        placeholder={placeholderDescription}
        {...form.getInputProps('description')}
      />

      <Text size="sm" fw={500} mb="sm">
        Due Date{' '}
        <Text c="red" span inherit>
          *
        </Text>
      </Text>

      <Group justify="center">
        <DatePicker {...form.getInputProps('dueAt')} />
      </Group>

      <Group justify="flex-end" mt="md">
        <Button type="submit">{data?.taskId ? 'Update' : 'Create'}</Button>
      </Group>
    </form>
  );
}
