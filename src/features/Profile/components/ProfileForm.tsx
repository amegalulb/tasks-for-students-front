import {
  Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export interface Fields {
  name: string;
  lastName: string;
  middleName: string;
  email: string;
}

export interface ProfileFormProps {
  initialValues: Fields;
  errors?: Record<keyof Fields, string>;
  onSubmit: (values: Fields) => void;
}

const StyledCardHeader = styled(CardHeader)({ padding: '32px 24px' });

interface Field {
  name: keyof Fields;
  label: string;
  required: boolean;
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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Имя обязательно').max(30, 'Максимальное кол-во символов должно быть равно 30'),
  lastName: Yup.string().required('Фамилия обязательна').max(30, 'Максимальное кол-во символов должно быть равно 30'),
  middleName: Yup.string().max(30, 'Максимальное кол-во символов должно быть равно 30'),
  email: Yup.string().required('Email обязателен').min(5, 'Минимальное кол-во символов должно быть равно 5').email(),
});

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialValues, onSubmit, errors }) => {
  const {
    errors: formikErrors, values, handleSubmit, getFieldProps, touched, setErrors,
  } = useFormik<Fields>({ initialValues, onSubmit, validationSchema });

  const isFieldsChanged = useMemo(() => {
    const entries = Object.entries(initialValues);
    return entries.some(([key, value]) => values[key as keyof Fields] !== value);
  }, [initialValues, values]);

  useEffect(() => {
    setErrors({ ...formikErrors, ...errors });
  }, [errors]);

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <StyledCardHeader
          subheader="Эту информацию вы можете редактировать"
          title="Профиль"
        />
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
                  error={Boolean(touched[name] && formikErrors[name])}
                  helperText={touched[name] && formikErrors[name]}
                />
              </Grid>
            )) }
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
            color="primary"
            variant="contained"
            disabled={!isFieldsChanged}
            type="submit"
          >
            Сохранить
          </Button>
        </Box>
      </Card>
    </form>
  );
};
