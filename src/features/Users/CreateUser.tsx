import React, { useEffect, useMemo, useState } from 'react';
import { RoleLabels, RoleNames, User } from '@/entities/user';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select, Snackbar,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { Option } from '@/shared/types/option';
import { Group } from '@/entities/group';
import { Subject } from '@/entities/subject';
import * as getGroups from '@/services/groups/getGroups';
import * as getSubjects from '@/services/subjects/getSubjects';
import * as postStudent from '@/services/auth/register/postStudent';
import * as postAdmin from '@/services/auth/register/postAdmin';
import * as postTeacher from '@/services/auth/register/postTeacher';
import { Alert } from '@mui/lab';
import { AlertColor } from '@mui/material/Alert/Alert';
import { FormikHelpers } from 'formik/dist/types';

type Fields = Pick<User, 'name' | 'lastName' | 'middleName' | 'email'> & { role: RoleNames | null; password: string; groupId?: number; subjectId?: number }

interface Field {
  name: keyof Fields,
  label: string,
  required: boolean,
}

const fields: Field[] = [
  {
    name: 'name',
    label: 'Имя',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    required: true,
  },
  {
    name: 'middleName',
    label: 'Отчество',
    required: false,
  },
  {
    name: 'email',
    label: 'Email',
    required: true,
  },
];

const rolesOptions: Option<RoleNames, RoleLabels>[] = [
  { value: RoleNames.Teacher, label: RoleLabels.teacher },
  { value: RoleNames.Student, label: RoleLabels.student },
  { value: RoleNames.Admin, label: RoleLabels.admin },
];

interface ISnackbar {
  type: AlertColor;
  text: string;
}

export const CreateUser = () => {
  const [snackbar, setSnackbar] = useState<ISnackbar | null>(null);
  const [groups, setGroups] = useState<Group[]>([{ id: 1, name: 'Пдо 42-18' }]);
  const [subjects, setSubjects] = useState<Subject[]>([{ id: 1, name: 'Основы программирования' }]);

  const formattedGroups = useMemo<Option[]>(
    () => groups.map(({ id, name }) => ({ label: name, value: id })),
    [groups],
  );

  const formattedSubjects = useMemo<Option[]>(
    () => subjects.map(({ id, name }) => ({ label: name, value: id })),
    [subjects],
  );

  const onSubmit = async (values: Fields, helpers: FormikHelpers<Fields>) => {
    let user: User | null = null;

    if (values.role === RoleNames.Student) {
      const { data } = await postStudent.call({
        params: { user: { ...values, role: RoleNames.Student, groupId: values.groupId! } },
      });
      user = data;
    }

    if (values.role === RoleNames.Teacher) {
      const { data } = await postTeacher.call({
        params: { user: { ...values, role: RoleNames.Teacher, subjectId: values.subjectId! } },
      });
      user = data;
    }

    if (values.role === RoleNames.Admin) {
      const { data } = await postAdmin.call({
        params: { user: { ...values, role: RoleNames.Admin } },
      });
      user = data;
    }

    setSnackbar({ type: 'success', text: `Пользователь ${user?.fullName} успешно создан` });
    helpers.resetForm();
  };

  const {
    errors, values, handleSubmit, getFieldProps, touched,
  } = useFormik<Fields>({
    initialValues: {
      name: '',
      middleName: '',
      lastName: '',
      password: '',
      role: null,
      email: '',
    },
    onSubmit,
  });

  const fetchGroups = async () => {
    try {
      const { data } = await getGroups.call();

      setGroups(data.list);
    } catch {
      setSnackbar({ type: 'error', text: 'Произошла ошибка при подгрузке групп. Создание студентов недоступно, попробуйте позже.' });
    }
  };

  const fetchSubjects = async () => {
    try {
      const { data } = await getSubjects.call();

      setSubjects(data.list);
    } catch {
      setSnackbar({ type: 'error', text: 'Произошла ошибка при подгрузке предметов. Создание преподавателей недоступно, попробуйте позже.' });
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchGroups();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  return (
    <>
      <Snackbar open={Boolean(snackbar)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar?.type} sx={{ width: '100%' }}>
          {snackbar?.text}
        </Alert>
      </Snackbar>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Card>
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              { fields.map(({ name, label, required }) => (
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    {...getFieldProps(name)}
                    fullWidth
                    label={label}
                    name={name}
                    required={required}
                    value={values[name]}
                    variant="outlined"
                    error={Boolean(touched[name] && errors[name])}
                    helperText={touched[name] && errors[name]}
                  />
                </Grid>
              )) }
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormControl fullWidth error={Boolean(touched.role && errors.role)}>
                  <InputLabel id="role-select-label">Роль</InputLabel>
                  <Select
                    {...getFieldProps('role')}
                    labelId="role-select-label"
                    name="role"
                    value={values.role}
                  >
                    {
                      rolesOptions.map(({ value, label }) => (
                        <MenuItem
                          value={value}
                        >
                          {label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  {touched.role && errors.role && <FormHelperText color="error">{errors.role}</FormHelperText>}
                </FormControl>
              </Grid>
              {values.role === RoleNames.Student && (
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <FormControl fullWidth error={Boolean(touched.groupId && errors.groupId)}>
                    <InputLabel id="groupId-select-label">Группа</InputLabel>
                    <Select
                      {...getFieldProps('groupId')}
                      labelId="groupId-select-label"
                      name="groupId"
                      value={values.groupId}
                    >
                      {
                        formattedGroups.map(({ value, label }) => (
                          <MenuItem
                            value={value}
                          >
                            {label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                    {touched.groupId && errors.groupId && <FormHelperText color="error">{errors.groupId}</FormHelperText>}
                  </FormControl>
                </Grid>
              )}
              {values.role === RoleNames.Teacher && (
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <FormControl fullWidth error={Boolean(touched.subjectId && errors.subjectId)}>
                    <InputLabel id="subjectId-select-label">Предмет</InputLabel>
                    <Select
                      {...getFieldProps('subjectId')}
                      labelId="subjectId-select-label"
                      name="subjectId"
                      value={values.subjectId}
                    >
                      {
                        formattedSubjects.map(({ value, label }) => (
                          <MenuItem
                            value={value}
                          >
                            {label}
                          </MenuItem>
                        ))
                      }
                    </Select>
                    {touched.subjectId && errors.subjectId && <FormHelperText color="error">{errors.subjectId}</FormHelperText>}
                  </FormControl>
                </Grid>
              )}
              <Grid
                item
                xs={12}
              >
                <TextField
                  {...getFieldProps('password')}
                  fullWidth
                  type="password"
                  label="Пароль"
                  name="password"
                  required
                  value={values.password}
                  variant="outlined"
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              Сохранить
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
};
