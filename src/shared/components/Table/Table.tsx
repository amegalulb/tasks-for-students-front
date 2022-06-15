import {
  Box, TableBody, TableContainer, TablePagination, TableRow, Table as MuiTable,
} from '@mui/material';
import { Head, HeadCell, HeadProps } from '@/features/Tasks/components/Head';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { TablePaginationProps } from '@mui/material/TablePagination/TablePagination';

export interface Row {
  id: number;
}

type SomeTablePaginationProps = Pick<TablePaginationProps, 'page'
  | 'rowsPerPage'
  | 'count'
  | 'onPageChange'
  | 'onRowsPerPageChange'>;

export interface TableProps<
    H extends HeadCell = any,
    R extends Row = any
  > extends HeadProps<H>, SomeTablePaginationProps {
  name?: string;
  rows: R[];
  renderRow: (row: R) => React.ReactNode;
  canRead?: boolean;
}

const LabelDisplayedRows = ({ from, to, count }: {from: number, to: number, count: number}) => (
  <span>
    {from}
    -
    {to}
    {' '}
    из
    {' '}
    {count}
  </span>
);

export const Table = <H extends HeadCell = any, R extends Row = any>({
  name,
  cells,
  order,
  orderBy,
  onSort,
  rows,
  renderRow,
  page,
  rowsPerPage,
  count,
  onPageChange,
  onRowsPerPageChange,
  canRead,
}: TableProps<H, R>) => (
  <Box>
    <TableContainer sx={{ minWidth: 800 }}>
      <MuiTable>
        <Head
          cells={cells}
          order={order}
          orderBy={orderBy}
          onSort={onSort}
        />
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              tabIndex={-1}
              sx={{ textDecoration: 'none' }}
              {...(canRead && { to: `/${name}/${row.id}`, component: RouterLink, hover: true })}
            >
              {renderRow(row)}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>

    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      labelRowsPerPage={<span>Строк на странице</span>}
      labelDisplayedRows={(row) => (
        <LabelDisplayedRows
          from={row.from}
          count={row.count}
          to={row.to}
        />
      )}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  </Box>
  );
