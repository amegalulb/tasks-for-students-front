import {
  Button,
  Card,
  CircularProgress,
  InputAdornment,
  Tab,
  TableCell,
  Tabs,
  Typography,
} from '@mui/material';
import { Filters, FiltersField, Option } from '@/features/Tasks/components/Filters';
import React, { useEffect, useMemo, useState } from 'react';
import { Iconify } from '@/shared/components/Iconify';
import { HeadCell, Order } from '@/features/Tasks/components/Head';
import { Task, TaskStatuses, TaskStatusesLabels } from '@/entities/task';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchTasks } from '@/features/Tasks/actions';
import {
  selectGroups,
  selectList, selectStatus, selectStudents, selectSubjects, selectTotal,
} from '@/features/Tasks/selectors';
import { Box } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import { TaskStatus } from '@/shared/components/TaskStatus';
import { selectUser } from '@/features/Auth/selectors';
import { RoleNames } from '@/entities/user';
import useDebounce from '@/shared/lib/useDebounce';
import { Table } from '@/shared/components/Table';

type TableIds = keyof Pick<Task, 'name' | 'teacher' | 'student' | 'subject' | 'updatedAt' | 'createdAt' | 'status' | 'grade'>

interface TableHeadCell extends HeadCell {
  id: TableIds;
}

const tabs = [
  { name: TaskStatusesLabels.toDo, value: TaskStatuses.toDo },
  { name: TaskStatusesLabels.onReview, value: TaskStatuses.onReview },
  { name: TaskStatusesLabels.done, value: TaskStatuses.done },
];

const INITIAL_PAGE = 0;
const INITIAL_LIMIT = 10;

type FiltersType = {
  search: string;
  subject: number;
  student: number;
  group: number;
};

export const Tasks = () => {
  const dispatch = useAppDispatch();
  const stateStatus = useAppSelector(selectStatus);
  const list = useAppSelector(selectList);
  const total = useAppSelector(selectTotal);
  const subjects = useAppSelector(selectSubjects);
  const groups = useAppSelector(selectGroups);
  const students = useAppSelector(selectStudents);
  const user = useAppSelector(selectUser);

  const tableHead = useMemo<TableHeadCell[]>(() => [
    { id: 'name', label: 'Название', alignRight: false },
    ...(user?.role === RoleNames.Teacher
      ? [{ id: 'student', label: 'Студент', alignRight: false }] as const
      : [{ id: 'teacher', label: 'Учитель', alignRight: false }] as const),
    { id: 'subject', label: 'Предмет', alignRight: false },
    { id: 'status', label: 'Статус', alignRight: false },
    { id: 'grade', label: 'Оценка', alignRight: false },
    { id: 'updatedAt', label: 'Последнее обновление', alignRight: false },
  ], [user?.role]);

  const formattedSubjects = useMemo<Option[]>(
    () => subjects.map(({ id, name }) => ({ label: name, value: id })),
    [subjects],
  );

  const formattedGroups = useMemo<Option[]>(
    () => groups.map(({ id, name }) => ({ label: name, value: id })),
    [groups],
  );

  const formattedStudents = useMemo<Option[]>(
    () => students.map(({ id, fullName }) => ({ label: fullName, value: id })),
    [students],
  );

  const [statusFilter, setStatusFilter] = useState(TaskStatuses.toDo);

  const [order, setOrder] = useState<Order>({ property: 'updatedAt', direction: 'desc' });
  const [page, setPage] = useState(INITIAL_PAGE);
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [filters, setFilters] = useState<Partial<FiltersType>>({});
  const debouncedFilters = useDebounce(filters, 500);

  const filterFields = useMemo<FiltersField[]>(() => [
    {
      type: 'input',
      name: 'search',
      label: 'Поиск',
      startAdornment: (
        <InputAdornment position="start">
          <Iconify
            icon="eva:search-fill"
            sx={{ color: 'text.disabled', width: 20, height: 20 }}
          />
        </InputAdornment>
      ),
    },
    ...(user?.role === RoleNames.Student ? [{
      type: 'select',
      name: 'subject',
      label: 'Предмет',
      options: formattedSubjects,
    } as const] : []),
    ...(user?.role === RoleNames.Teacher ? [{
      type: 'select',
      name: 'group',
      label: 'Группа',
      options: formattedGroups,
    } as const] : []),
    ...(debouncedFilters.group ? [{
      type: 'select',
      name: 'student',
      label: 'Студент',
      options: formattedStudents,
    } as const] : []),
  ], [formattedSubjects, formattedGroups, formattedStudents, user?.role, debouncedFilters]);

  useEffect(() => {
    dispatch(fetchTasks({
      limit,
      page: page + 1,
      status: statusFilter,
      sortBy: order.property,
      sortDir: order.direction,
      ...debouncedFilters,
    }));
  }, [statusFilter, order, page, limit, debouncedFilters]);

  const handleFilterChange = (values: FiltersType) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...values }));
  };

  const handleSortChange = (sortOrder: Order) => {
    setOrder(sortOrder);
  };

  const handleTabChange = (_: React.SyntheticEvent, value: TaskStatuses) => {
    setStatusFilter(value);
  };

  const handlePageChange = (_: React.MouseEvent<HTMLButtonElement> | null, nextPage: number) => {
    setPage(nextPage);
  };

  const handleRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setLimit(Number(event.target.value));
  };

  return (
    <Box display="flex" flexDirection="column">
      {user && user.role === RoleNames.Teacher && (
        <Button
          component={RouterLink}
          variant="contained"
          size="large"
          to="/tasks/create"
          sx={{ alignSelf: 'flex-end', marginBottom: 1 }}
        >
          Создать
        </Button>
      )}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={statusFilter} onChange={handleTabChange}>
            {tabs.map(({ value, name }) => (<Tab key={name} label={name} value={value} />))}
          </Tabs>
        </Box>
        <Filters fields={filterFields} onChange={handleFilterChange} />
        <Box display="flex" justifyContent="center">
          {stateStatus === 'Error' && <div>Произошла ошибка</div>}
          {stateStatus === 'Loading' && <CircularProgress />}
        </Box>
        {stateStatus === 'Success' && (
          <Table
            name="tasks"
            cells={tableHead}
            order={order.direction}
            orderBy={order.property}
            onSort={handleSortChange}
            rows={list}
            count={total || 1}
            rowsPerPage={limit}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            canRead
            renderRow={({
              name, student, teacher, subject, status, grade, updatedAt,
            }) => (
              <>
                <TableCell component="th" scope="row" padding="normal">
                  <Typography variant="subtitle2">
                    {name}
                  </Typography>
                </TableCell>
                <TableCell align="left">{user?.role === RoleNames.Teacher ? student.fullName : teacher.fullName}</TableCell>
                <TableCell align="left">{subject.name}</TableCell>
                <TableCell align="left">
                  <TaskStatus status={status} />
                </TableCell>
                <TableCell align="left">{grade ?? '-'}</TableCell>
                <TableCell align="left">{Intl.DateTimeFormat('ru').format(new Date(updatedAt)) }</TableCell>
              </>
            )}
          />
        )}
      </Card>
    </Box>
  );
};
