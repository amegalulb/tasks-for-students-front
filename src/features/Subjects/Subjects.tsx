import React, { useEffect, useState } from 'react';
import { Subject } from '@/entities/subject';
import { HeadCell } from '@/features/Tasks/components/Head';
import { StoreStatus } from '@/shared/types/storeStatus';
import { useAppDispatch } from '@/app/store';
import { fetchSubjects } from '@/features/Subjects/actions';
import { SimpleEntityList } from '@/shared/components/SimpleEntityList';
import { TableCell } from '@mui/material';

type TableIds = keyof Subject;

interface TableHeadCell extends HeadCell {
  id: TableIds;
}

const TABLE_HEAD: TableHeadCell[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Название' },
];
const LIMIT = 10;

export const Subjects = () => {
  const dispatch = useAppDispatch();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [status, setStatus] = useState<StoreStatus>('Initial');

  const getSubjects = async () => {
    setStatus('Loading');

    try {
      const data = await dispatch(fetchSubjects()).unwrap();

      setSubjects(data.list);
      setTotal(data.total);
      setStatus('Success');
    } catch {
      setStatus('Error');
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <SimpleEntityList
      name="subjects"
      status={status}
      cells={TABLE_HEAD}
      rows={subjects}
      count={total}
      rowsPerPage={LIMIT}
      renderRow={({ id, name }) => (
        <>
          <TableCell align="left">{id}</TableCell>
          <TableCell align="left">{name}</TableCell>
        </>
      )}
      page={0}
      onPageChange={() => {}}
    />
  );
};
