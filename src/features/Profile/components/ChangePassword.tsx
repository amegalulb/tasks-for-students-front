import {
  Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export interface Fields {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordProps {
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
    name: 'oldPassword',
    label: 'Старый пароль',
    required: true,
  },
  {
    name: 'newPassword',
    label: 'Новый пароль',
    required: true,
  },
];

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Старый пароль обязателен').min(8, 'Минимальное кол-во символов должно быть равно 8'),
  newPassword: Yup.string().required('Новый пароль обязателен').min(8, 'Минимальное кол-во символов должно быть равно 8'),
});

export const ChangePassword: React.FC<ChangePasswordProps> = ({ onSubmit, errors }) => {
  const {
    errors: formikErrors, values, handleSubmit, getFieldProps, touched, setErrors,
  } = useFormik<Fields>({ onSubmit, initialValues: { newPassword: '', oldPassword: '' }, validationSchema });

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
          title="Сменить пароль"
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
                lg={12}
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
            type="submit"
            color="primary"
            variant="contained"
            disabled={!(values.newPassword && values.oldPassword)}
          >
            Сохранить
          </Button>
        </Box>
      </Card>
    </form>
  );
};
