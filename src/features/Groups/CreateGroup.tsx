import React, { useState } from 'react';
import { CreateSimpleEntity, CreateSimpleEntityProps } from '@/shared/components/CreateSimpleEntity';
import { StoreStatus } from '@/shared/types/storeStatus';
import { useAppDispatch } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import { fetchPostGroups } from './actions';

export const CreateGroup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [status, setStatus] = useState<StoreStatus>('Initial');

  const handleSubmit: CreateSimpleEntityProps['onSubmit'] = async (values) => {
    setStatus('Loading');

    try {
      await dispatch(fetchPostGroups(values));
      setStatus('Success');
      navigate('/groups');
    } catch {
      setStatus('Error');
    }
  };

  return (
    <CreateSimpleEntity onSubmit={handleSubmit} isLoading={status === 'Loading'} isError={status === 'Error'} />
  );
};
