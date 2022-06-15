import {
  Card, Stack, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';

interface FormValues {
  name: string
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Название обязательно').max(50, 'Максимальное кол-во символов должно быть равно 50'),
});

export interface CreateSimpleEntityProps {
  onSubmit: (values: FormValues) => void;
  isLoading: boolean;
  isError: boolean;
}

export const CreateSimpleEntity: React.FC<CreateSimpleEntityProps> = ({
  onSubmit,
  isLoading,
  isError,
}) => {
  const {
    values,
    getFieldProps,
    handleSubmit,
    touched,
    errors,
  } = useFormik<FormValues>({
    initialValues: { name: '' },
    onSubmit,
    validationSchema,
  });

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
          {
            isError && (
              <Typography variant="caption" gutterBottom color="error">Произошла ошибка</Typography>
            )
          }
          <LoadingButton type="submit" loading={isLoading} fullWidth variant="contained">Сохранить</LoadingButton>
        </Stack>
      </form>
    </Card>
  );
};
