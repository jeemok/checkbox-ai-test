import dayjs from 'dayjs';

enum STATUS {
  Overdue = 'Overdue',
  DueSoon = 'Due soon',
  NotUrgent = 'Not urgent',
}

const STATUS_COLOR: Record<STATUS, string> = {
  Overdue: 'red',
  'Due soon': 'cyan',
  'Not urgent': 'blue',
};

export function getStatusByDueDate(dueDate: string): STATUS {
  const remainingDays = dayjs(dueDate).diff(dayjs(), 'day');
  // If it has a week more to go, e.g. if today is 1 Jan, then 8 Jan and onwards will be "Not urgent"
  if (remainingDays > 6) {
    return 'Not urgent';
  }
  // e.g. if today is 1 Jan, then 1 Jan (same day) and onwards will be "Due soon"
  if (remainingDays >= 0) {
    return 'Due soon';
  }
  return 'Overdue';
}

export function getStatusColor(status: STATUS) {
  return STATUS_COLOR[status];
}

// Check if given function is valid and use it, else return original value
export function tryFn(fn: any, value: any) {
  return typeof fn === 'function' ? fn(value) : value;
}
