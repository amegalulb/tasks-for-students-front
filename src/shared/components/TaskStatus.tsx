import { TaskStatusesLabels, TaskStatuses } from '@/entities/task';
import { Chip } from '@mui/material';
import React from 'react';

interface TaskStatusProps {
  status: TaskStatuses
}

export const TaskStatus: React.FC<TaskStatusProps> = ({ status }) => (
  <Chip label={TaskStatusesLabels[status]} color={(status === TaskStatuses.toDo && 'secondary') || (status === TaskStatuses.onReview && 'primary') || 'success'} />
);
