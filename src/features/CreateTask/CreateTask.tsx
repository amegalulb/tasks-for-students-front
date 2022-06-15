import { useAppDispatch } from '@/app/store';
import { CreateTaskForm, CreateTaskFormProps } from '@/features/CreateTask/components/CreateTaskForm';
import { useEffect, useState } from 'react';
import { Option } from '@/shared/types/option';
import { fetchGroups, fetchPostTask, fetchStudents } from '@/features/CreateTask/actions';
import { StoreStatus } from '@/shared/types/storeStatus';
import { useNavigate } from 'react-router-dom';

export const CreateTask = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [groupOptions, setGroupOptions] = useState<Option[]>([]);
  const [studentsOptions, setStudentsOptions] = useState<Option[]>([]);
  const [status, setStatus] = useState<StoreStatus>('Initial');

  const handleChange: CreateTaskFormProps['onChange'] = async (values) => {
    if (values.groupId && values.studentId !== 'all') {
      try {
        const students = await dispatch(fetchStudents({
          groupId: Number(values.groupId),
        })).unwrap();

        setStudentsOptions(students.map(({ id, fullName }) => ({ value: id, label: fullName })));
      } catch {
        setStatus('Error');
      }
    }
  };

  const handleSubmit: CreateTaskFormProps['onSubmit'] = async (values) => {
    try {
      await dispatch(fetchPostTask({
        name: values.name,
        files: values.files,
        description: values.description,
        ...(values.studentId
          ? { studentId: Number(values.studentId) }
          : { groupId: Number(values.groupId) }),
      })).unwrap();

      navigate('/tasks');
    } catch {
      setStatus('Error');
    }
  };

  const getGroups = async () => {
    try {
      const groups = await dispatch(fetchGroups()).unwrap();
      setGroupOptions(groups.list.map(({ id, name }) => ({ value: id, label: name })));
    } catch (e) {
      setStatus('Error');
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  if (status === 'Error') {
    return <div>Error</div>;
  }

  return (
    <CreateTaskForm
      onChange={handleChange}
      onSubmit={handleSubmit}
      groupOptions={groupOptions}
      studentOptions={studentsOptions}
      isButtonLoading={status === 'Loading'}
    />
  );
};
