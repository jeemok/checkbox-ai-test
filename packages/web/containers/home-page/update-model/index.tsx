import { Modal } from '@mantine/core';
import TaskForm from '@/components/form/task';

const TITLE = 'Edit task';

export default function UpdateModel({ isOpened, onClose, onUpdate, task }) {
  return (
    <Modal opened={isOpened} onClose={onClose} title={TITLE} centered>
      <TaskForm data={task} onSubmit={onUpdate} />
    </Modal>
  );
}
