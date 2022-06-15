import { ProfileForm, Fields as ProfileFormFields } from '@/features/Profile/components/ProfileForm';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/app/store';
import { getUserProfile } from '@/features/Profile/actions';
import { UserProfile } from '@/entities/user';
import { Snackbar, Tab, Tabs } from '@mui/material';
import { ChangePassword, Fields as ChangePasswordFields } from '@/features/Profile/components/ChangePassword';
import * as putUser from '@/services/users/putUser';
import * as postChangePassword from '@/services/auth/postChangePassword';
import { Alert } from '@mui/lab';
import { AlertColor } from '@mui/material/Alert/Alert';
import { mapErrors } from '@/shared/lib/mapErrors';
import { AxiosError } from 'axios';

interface ISnackbar {
  type: AlertColor;
  text: string;
}

export const Profile = () => {
  const dispatch = useAppDispatch();

  const [snackbar, setSnackbar] = useState<ISnackbar | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentTab, setCurrentTab] = useState('profile');
  const [changePasswordErrors, setChangePasswordErrors] = useState<ChangePasswordFields>();

  const getProfile = async () => {
    setIsLoading(true);

    try {
      const profile = await dispatch(getUserProfile()).unwrap();

      setUser(profile);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleProfileSubmit = async (values: ProfileFormFields) => {
    try {
      const { data } = await putUser.call({ params: { ...values, id: user!.id } });
      setUser(data);
      setSnackbar({ type: 'success', text: 'Профиль успешно изменён' });
    } catch {
      setSnackbar({ type: 'error', text: 'При изменении профиля произошла ошибка. Попробуйте позже' });
    }
  };

  const handlePasswordChangeSubmit = async (values: ChangePasswordFields) => {
    try {
      await postChangePassword.call({ params: { ...values, id: user!.id } });
      setSnackbar({ type: 'success', text: 'Пароль успешно изменён' });
    } catch (error) {
      setChangePasswordErrors(mapErrors(
        (error as AxiosError).response?.data,
      ) as ChangePasswordFields);
      setSnackbar({ type: 'error', text: 'При изменении пароля произошла ошибка. Попробуйте позже' });
    }
  };

  const changeTab = (_: unknown, value: string) => {
    setCurrentTab(value);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(null);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!user || isError) {
    return <div>Error</div>;
  }
  console.log(changePasswordErrors);
  return (
    <>
      <Snackbar open={Boolean(snackbar)} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar?.type} sx={{ width: '100%' }}>
          {snackbar?.text}
        </Alert>
      </Snackbar>
      <Tabs value={currentTab} onChange={changeTab}>
        <Tab label="Профиль" value="profile" />
        <Tab label="Сменить пароль" value="changePassword" />
      </Tabs>
      {currentTab === 'profile' && (
        <ProfileForm
          initialValues={user}
          onSubmit={handleProfileSubmit}
        />
      )}
      {currentTab === 'changePassword' && <ChangePassword onSubmit={handlePasswordChangeSubmit} errors={changePasswordErrors} /> }
    </>
  );
};
