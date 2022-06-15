import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { selectStatus, selectTask } from '@/features/Task/selectors';
import {
  Breadcrumbs, CircularProgress, Link, List, ListItem, Paper, Stack, TextField, Typography,
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { TaskStatus } from '@/shared/components/TaskStatus';
import { GradeMark, TaskStatuses } from '@/entities/task';
import { selectUser } from '@/features/Auth/selectors';
import { RoleNames } from '@/entities/user';
import { fetchEditStatus, fetchUploadResponse } from '@/features/Task/actions';
import React, { useState } from 'react';
import { StoreStatus } from '@/shared/types/storeStatus';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';
import { UploadFile, UploadFileProps } from '@/shared/components/UploadFile';
import { InputProps as StandardInputProps } from '@mui/material/Input/Input';

const RootStyle = styled(Paper)({
  padding: 20,
});

const StackStyle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
});

const DescriptionStyle = styled('div')({
  width: '50%',
});

export const Task = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const task = useAppSelector(selectTask);
  const stateStatus = useAppSelector(selectStatus);
  const userData = useAppSelector(selectUser);

  const [statusButtonStatus, setStatusButtonStatus] = useState<StoreStatus>('Initial');
  const [fileUploadingStatus, setFileUploadingStatus] = useState<StoreStatus>('Initial');
  const [files, setFiles] = useState<File[]>([]);
  const [mark, setMark] = useState<GradeMark>(2);

  const handleMarkChange: StandardInputProps['onChange'] = (event) => {
    const valuesArr = event.target.value.split('');
    const value = Number(valuesArr[1] || valuesArr[0]);

    if (value > 1 && value < 6) {
      setMark(value as GradeMark);
    }
  };

  const handleChangeStatus = (status: TaskStatuses) => async () => {
    setStatusButtonStatus('Loading');

    try {
      await dispatch(fetchEditStatus({ id: Number(id), status, mark })).unwrap();
      setStatusButtonStatus('Initial');
    } catch {
      setStatusButtonStatus('Error');
    }
  };

  const handleResponseChange: UploadFileProps['onChange'] = async (uploadedFiles) => {
    setFiles(uploadedFiles);
  };

  const handleUploadResponse = async () => {
    setFileUploadingStatus('Loading');

    try {
      await dispatch(fetchUploadResponse({ id: Number(id), files })).unwrap();
      setFiles([]);
      setFileUploadingStatus('Initial');
    } catch {
      setFileUploadingStatus('Error');
    }
  };

  if (stateStatus === 'Loading') {
    return <CircularProgress />;
  }

  if (!task || stateStatus === 'Error') {
    return <div>Error</div>;
  }

  return (
    <RootStyle>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} underline="hover" color="inherit" to="/tasks">
          Задания
        </Link>
        <Typography color="text.primary">{task.id}</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom component="div">
        { task.name }
      </Typography>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={3}>
          <StackStyle>
            <Typography variant="body2" gutterBottom component="span">
              Предмет:
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="span">{task.subject.name}</Typography>
          </StackStyle>
          <StackStyle>
            <Typography variant="body2" gutterBottom component="span">
              Автор:
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="span">{task.teacher.fullName}</Typography>
          </StackStyle>
          <StackStyle>
            <Typography variant="body2" gutterBottom component="span">
              Исполнитель:
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="span">{task.student.fullName}</Typography>
          </StackStyle>
        </Stack>
        <Stack sx={{ minWith: 200 }} spacing={3}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
            <Typography variant="body2" component="span">
              Cтатус:
            </Typography>
            <TaskStatus status={task.status} />
          </Stack>
          {task.status === TaskStatuses.done && task.grade && (
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>
            <Typography variant="body2" component="span">
              Оценка:
            </Typography>
            <Typography variant="subtitle1" component="span">
              {task.grade}
            </Typography>
          </Stack>
          )}
          <Stack>
            {
              statusButtonStatus === 'Error' && (
                <Typography variant="caption" gutterBottom color="error">Произошла ошибка</Typography>
              )
            }
            {task.status === TaskStatuses.toDo && userData?.role === RoleNames.Student && (
              <LoadingButton
                variant="outlined"
                loading={statusButtonStatus === 'Loading'}
                onClick={handleChangeStatus(TaskStatuses.onReview)}
                disabled={!task.response.length}
              >
                Отправить на проверку
              </LoadingButton>
            )}
            {task.status === TaskStatuses.onReview && userData?.role === RoleNames.Teacher && (
              <>
                <TextField
                  name="mark"
                  type="number"
                  value={mark}
                  error={statusButtonStatus === 'Error'}
                  onChange={handleMarkChange}
                  size="small"
                  label="Оценка от 2 до 5"
                  sx={{ marginBottom: 1 }}
                />
                <LoadingButton
                  variant="outlined"
                  loading={statusButtonStatus === 'Loading'}
                  onClick={handleChangeStatus(TaskStatuses.done)}
                  disabled={!mark}
                >
                  Готово
                </LoadingButton>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <DescriptionStyle>
          <Typography variant="h4" gutterBottom component="div">
            Описание
          </Typography>
          <Typography variant="body1" gutterBottom component="span">
            {task.description}
          </Typography>
        </DescriptionStyle>
        {Boolean(task.application.length) && (
          <DescriptionStyle>
            <Typography variant="h4" gutterBottom component="div">
              Приложение к заданию
            </Typography>
            <List>
              {
                task.application.map((taskFile) => (
                  <a
                    key={taskFile.id}
                    href={taskFile.file.path}
                    download={taskFile.file.name}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ListItem>{taskFile.file.name}</ListItem>
                  </a>
                ))
              }
            </List>
          </DescriptionStyle>
        )}
      </Stack>
      <Box>
        <Typography variant="h4" gutterBottom component="div">
          Ответ
        </Typography>
        {Boolean(task.response.length) && (
          <List>
            {
              task.response.map((taskFile) => (
                <a
                  key={taskFile.id}
                  href={taskFile.file.path}
                  download={taskFile.file.name}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItem>{taskFile.file.name}</ListItem>
                </a>
              ))
            }
          </List>
        )}
        {userData?.role
          && !(task.status === TaskStatuses.onReview || task.status === TaskStatuses.done)
          && (
            <>
              <UploadFile
                initialFiles={files}
                label="Прикрепить ответ"
                error={fileUploadingStatus === 'Error'}
                onChange={handleResponseChange}
              />
              {Boolean(files.length) && (
                <LoadingButton
                  variant="contained"
                  loading={fileUploadingStatus === 'Error'}
                  onClick={handleUploadResponse}
                >
                  Загрузить
                </LoadingButton>
              )}
            </>
          )}
      </Box>
    </RootStyle>
  );
};
