import {
  Box,
  TableCell, TableHead, TableRow, TableSortLabel,
} from '@mui/material';
import React from 'react';

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export interface HeadCell {
  id: string;
  label?: string;
  alignRight?: boolean;
}

export interface Order {
  property: string;
  direction: 'asc' | 'desc';
}

export interface HeadProps<T extends HeadCell = any> {
  order?: 'asc' | 'desc';
  orderBy?: string;
  cells: T[]
  onSort?: (order: Order) => void;
}

export const Head: React.FC<HeadProps> = ({
  onSort,
  order,
  orderBy,
  cells,
}) => {
  const createSortHandler = (
    property: string,
  ): React.MouseEventHandler<HTMLSpanElement> => () => {
    onSort?.({ property, direction: orderBy === property && order === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <TableHead>
      <TableRow>
        {cells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : undefined}
          >
            <TableSortLabel
              hideSortIcon
              active={onSort ? orderBy === headCell.id : undefined}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSort ? createSortHandler(headCell.id) : undefined}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
