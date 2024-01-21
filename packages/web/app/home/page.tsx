'use client';

import { useState, useEffect } from 'react';
import { AuthHoc } from '@/hoc/auth';
import { listMyTasks, createTask, deleteTask, updateTask } from '@/api/tasks';
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Container, Grid } from '@mantine/core';
import { getStatusByDueDate } from '@/utils/misc';
import CreateForm from '@/containers/home-page/create-form';
import UpdateModel from '@/containers/home-page/update-model';
import TaskList from '@/containers/home-page/task-list';
import Header from '@/containers/header';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState();
  const [isEditOpened, { open: openEditModel, close: closeEditModel }] = useDisclosure(false);

  useEffect(() => {
    setLoading(true);

    listMyTasks().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const handleCreate = (values: any) => {
    setLoading(true);

    createTask(values).then((data) => {
      setData((state) => state.concat(data));
      setLoading(false);
    });
  };

  const handleEditClick = (task: any) => {
    setSelectedTask(task);
    openEditModel();
  };

  const handleUpdate = (values: any) => {
    setLoading(true);
    closeEditModel();

    updateTask(values).then((data) => {
      if (data.status) {
        // Replace the data in the state
        setData((state: any) =>
          state.map((t: any) => (t.taskId === data?.updated?.taskId ? data?.updated : t))
        );
      }
      setLoading(false);
    });
  };

  const handleDelete = (task: any) => {
    setLoading(true);

    deleteTask(task).then((data) => {
      if (data.status) {
        setData((state) => state.filter((t: any) => t.taskId !== task.taskId));
      }
      setLoading(false);
    });
  };

  return (
    <AuthHoc>
      <Container size="lg">
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <Header />

        <Grid>
          <Grid.Col span={{ base: 'auto', md: 'auto', lg: 'content' }}>
            <CreateForm onSubmit={handleCreate} />
          </Grid.Col>
          <Grid.Col span="auto" mt="xs">
            <TaskList tasks={data} onEdit={handleEditClick} onDelete={handleDelete} />
          </Grid.Col>
        </Grid>
        <UpdateModel
          task={selectedTask}
          isOpened={isEditOpened}
          onClose={closeEditModel}
          onUpdate={handleUpdate}
        />
      </Container>
    </AuthHoc>
  );
}
