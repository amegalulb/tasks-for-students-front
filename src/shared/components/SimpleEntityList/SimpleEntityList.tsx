import { Box } from '@mui/system';
import {
  Button, Card, CircularProgress,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Row, Table, TableProps } from '@/shared/components/Table';
import React from 'react';
import { HeadCell } from '@/features/Tasks/components/Head';
import { StoreStatus } from '@/shared/types/storeStatus';

interface SimpleEntityListProps<
  H extends HeadCell = any,
  R extends Row = any
  > extends TableProps<H, R> {
  status: StoreStatus;
}

export const SimpleEntityList = ({
  status,
  count,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPage,
  page,
  rows,
  renderRow,
  name,
  cells,
  order,
  orderBy,
  onSort,
  canRead,
}: SimpleEntityListProps) => (
  <Box display="flex" flexDirection="column">
    <Button
      component={RouterLink}
      variant="contained"
      size="large"
      to={`/${name}/create`}
      sx={{ alignSelf: 'flex-end', marginBottom: 1 }}
    >
      Создать
    </Button>
    <Card>
      <Box display="flex" justifyContent="center">
        {status === 'Error' && <div>Произошла ошибка</div>}
        {status === 'Loading' && <CircularProgress />}
      </Box>
      {status === 'Success' && (
        <Table
          cells={cells}
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          count={count}
          onPageChange={onPageChange}
          renderRow={renderRow}
          onRowsPerPageChange={onRowsPerPageChange}
          name={name}
          order={order}
          orderBy={orderBy}
          onSort={onSort}
          canRead={canRead}
        />
      )}
    </Card>
  </Box>
);
