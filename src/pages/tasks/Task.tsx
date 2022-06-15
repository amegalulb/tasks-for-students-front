import { useParams } from 'react-router-dom';
import { Page } from '@/shared/components/Page';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { fetchTask } from '@/features/Task/actions';
import { selectTask } from '@/features/Task/selectors';
import { Task } from '@/features/Task';

// eslint-disable-next-line react/function-component-definition
export default function TaskPage() {
  const dispatch = useAppDispatch();
  const task = useAppSelector(selectTask);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchTask({ id }));
    }
  }, [id]);

  return (
    <Page title={task?.name ?? 'Задание'}>
      <Task />
    </Page>
  );
}
