import * as Yup from 'yup';
import {
  Stack, TextField, IconButton, InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikHelpers, useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '@/shared/components/Iconify';
import { mapErrors } from '@/shared/lib/mapErrors';
import { useAppDispatch } from '@/app/store';
import { ResponseError } from '@/shared/types/ResponseError';

import { login } from '../../actions';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Некорректный Email').required('Email обязателен'),
  password: Yup.string().min(8, 'Длина пароля должна быть 8 символов и более').required('Пароль обязателен'),
});

interface Credentials {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = async (values: Credentials, { setErrors }: FormikHelpers<Credentials>) => {
    setIsLoading(true);
    try {
      await dispatch(login(values)).unwrap();

      navigate('/profile');
    } catch (e) {
      const mappedError = mapErrors(e as ResponseError);
      setErrors(mappedError);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    errors, touched, handleSubmit, getFieldProps,
  } = useFormik<Credentials>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          autoComplete="username"
          type="email"
          label="Email"
          {...getFieldProps('email')}
          error={Boolean(touched.email && errors.email)}
          helperText={touched.email && errors.email}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label="Пароль"
          {...getFieldProps('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={Boolean(touched.password && errors.password)}
          helperText={touched.password && errors.password}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
      >
        Войти
      </LoadingButton>
    </form>
  );
};
