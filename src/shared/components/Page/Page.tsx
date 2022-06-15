import { Helmet } from 'react-helmet-async';
import React from 'react';
import Box from '@mui/material/Box/Box';
import { FCWithChildren } from '../../types/FCWithChildren';

interface LayoutProps {
  title: string;
}

export const Page: FCWithChildren<LayoutProps> = ({ title, children }) => (
  <>
    <Helmet>
      <title>{`${title} | Tasks for students`}</title>
    </Helmet>

    <Box>
      {children}
    </Box>
  </>
);
