import { getToken } from '@/services/auth';
import pick from 'lodash.pick';

// Only allow to update these keys
const UPDATE_ATTRIBUTES = ['title', 'description', 'dueAt'];

export const listMyTasks = () => {
  const token = getToken();
  return fetch(`${process.env.API_URL}/tasks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const createTask = (data) => {
  const token = getToken();
  return fetch(`${process.env.API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const updateTask = (data) => {
  const token = getToken();
  const cleaned = pick(data, UPDATE_ATTRIBUTES);

  return fetch(`${process.env.API_URL}/tasks/${data.taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cleaned),
  }).then((res) => res.json());
};

export const deleteTask = (data) => {
  const token = getToken();
  return fetch(`${process.env.API_URL}/tasks/${data.taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
