import Box, { BoxProps } from '@mui/material/Box/Box';
import { Icon } from '@iconify/react';
import { FCWithChildren } from '../../types/FCWithChildren';

interface IconifyProps extends BoxProps {
  icon: string;
}

export const Iconify: FCWithChildren<IconifyProps> = ({ icon, ...props }) => (
  <Box component={Icon} icon={icon} {...props} />
);
