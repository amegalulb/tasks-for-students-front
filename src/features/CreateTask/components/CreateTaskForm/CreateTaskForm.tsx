import { useFormik } from 'formik';
import {
  Card, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField,
} from '@mui/material';
import { UploadFile } from '@/shared/components/UploadFile';
import React, { useEffect } from 'react';
import { Option } from '@/shared/types/option';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { omit } from 'lodash';

interface FormValues {
  name: string;
  description: string;
  groupId?: string;
  studentId?: string;
  files?: File[];
}

export interface CreateTaskFormProps {
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onChange: (values: FormValues) => void;
  groupOptions: Option[];
  studentOptions: Option[];
  isButtonLoading: boolean;
}

const initialForm = {
  name: '',
  description: '',
  groupId: undefined,
  studentId: undefined,
  files: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Название обязательно').max(50, 'Максимальное кол-во символов должно быть равно 50'),
  description: Yup.string().required('Описание обязательно').max(500, 'Максимальное кол-во символов должно быть равно 500'),
  groupId: Yup.string().required('Что бы найти студента - заполните группу'),
  studentId: Yup.string().required('Студент обязателен'),
});

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  initialValues = initialForm,
  onSubmit,
  onChange,
  studentOptions,
  groupOptions,
  isButtonLoading,
}) => {
  const onSubmitForm = (formValues: FormValues) => {
    const values = formValues.studentId === 'all' ? omit(formValues, ['studentId']) : formValues;
    onSubmit(values);
  };

  const {
    values,
    setValues,
    getFieldProps,
    handleSubmit,
    touched,
    errors,
  } = useFormik<FormValues>({
    initialValues,
    onSubmit: onSubmitForm,
    validationSchema,
  });

  const handleFilesChange = (files: File[]) => {
    setValues({ ...values, files });
  };

  useEffect(() => {
    onChange(values);
  }, [values]);

  return (
    <Card sx={{ padding: 3 }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            {...getFieldProps('name')}
            label="Название"
            name="name"
            fullWidth
            value={values.name}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            {...getFieldProps('description')}
            label="Описание"
            name="description"
            value={values.description}
            multiline
            fullWidth
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
          />
          <Stack direction="row" justifyContent="spaceBetween" spacing={3}>
            <FormControl sx={{ width: '50%' }} error={Boolean(touched.groupId && errors.groupId)}>
              <InputLabel id="group-select-label">Группа</InputLabel>
              <Select
                {...getFieldProps('groupId')}
                labelId="group-select-label"
                name="groupId"
                value={values.groupId}
              >
                {
                  groupOptions.map(({ value, label }) => <MenuItem value={value}>{label}</MenuItem>)
                }
              </Select>
              {touched.groupId && errors.groupId && <FormHelperText color="error">{errors.groupId}</FormHelperText>}
            </FormControl>
            { values.groupId
              && Boolean(studentOptions.length) && (
                <FormControl sx={{ width: '50%' }} error={Boolean(touched.studentId && errors.studentId)}>
                  <InputLabel id="student-select-label">Студент</InputLabel>
                  <Select
                    {...getFieldProps('studentId')}
                    labelId="student-select-label"
                    name="studentId"
                    value={values.studentId}
                  >
                    <MenuItem value="all">Все</MenuItem>
                    {
                      studentOptions.map(({ value, label }) => (
                        <MenuItem
                          value={value}
                        >
                          {label}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  {touched.studentId && errors.studentId && <FormHelperText color="error">{errors.studentId}</FormHelperText>}
                </FormControl>
            )}
          </Stack>
          <UploadFile label="Добавить приложения к заданию" onChange={handleFilesChange} />
          <LoadingButton type="submit" loading={isButtonLoading} fullWidth variant="contained">Сохранить</LoadingButton>
        </Stack>
      </form>
    </Card>
  );
};
