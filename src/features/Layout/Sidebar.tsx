import {
  Link, Avatar, Box, Drawer, styled, Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import useResponsive from '../../shared/lib/useResponsive';
import { FCWithChildren } from '../../shared/types/FCWithChildren';
import { NavSection } from '../../shared/components/NavSection';
import navConfig from './navConfig';
import { RoleLabels, RoleNames } from '../../entities/user';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  // @ts-ignore
  backgroundColor: theme.palette.grey[500_12],
}));

interface Account {
  displayName: string;
  role?: RoleNames;
}

interface SidebarProps {
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
  account: Account;
}

export const Sidebar: FCWithChildren<SidebarProps> = ({
  isOpenSidebar,
  onCloseSidebar,
  account,
}) => {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <div>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Typography variant="h4">
          TasksForStudent
        </Typography>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="/profile">
          <AccountStyle>
            <Avatar src="account.photoURL" alt={account.displayName} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role && RoleLabels[account.role]}
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      {account.role && <NavSection navConfig={navConfig(account.role)} />}

      <Box sx={{ flexGrow: 1 }} />
    </div>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};
