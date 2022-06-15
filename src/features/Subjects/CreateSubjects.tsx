import React, { useState } from 'react';
import { CreateSimpleEntity, CreateSimpleEntityProps } from '@/shared/components/CreateSimpleEntity';
import { StoreStatus } from '@/shared/types/storeStatus';
import { useAppDispatch } from '@/app/store';
import { fetchPostSubjects } from '@/features/Subjects/actions';
import { useNavigate } from 'react-router-dom';

export const CreateSubjects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState<StoreStatus>('Initial');

  const handleSubmit: CreateSimpleEntityProps['onSubmit'] = async (values) => {
    setStatus('Loading');

    try {
      await dispatch(fetchPostSubjects(values));
      setStatus('Success');
      navigate('/subjects');
    } catch {
      setStatus('Error');
    }
  };

  return (
    <CreateSimpleEntity onSubmit={handleSubmit} isLoading={status === 'Loading'} isError={status === 'Error'} />
  );
};
