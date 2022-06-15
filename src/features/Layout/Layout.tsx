import { Suspense, useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import { useAppDispatch, useAppSelector } from '@/app/store';

import { fetchLogout } from '@/features/Auth/actions';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { selectUser } from '../Auth/selectors';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

// eslint-disable-next-line react/function-component-definition
export default function Layout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }

    if (user && location.pathname === '/') {
      navigate('/profile');
    }
  }, [user, navigate, location.pathname]);

  const displayName = user?.fullName || '';

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <RootStyle>
      <Navbar displayName={displayName} email={user?.email ?? ''} onOpenSidebar={() => setOpen(true)} onLogout={handleLogout} />
      <Sidebar
        account={{ displayName, role: user?.role }}
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <MainStyle>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </MainStyle>
    </RootStyle>
  );
}
