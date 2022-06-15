/* eslint-disable react/function-component-definition */
import { Page } from '@/shared/components/Page';
import { Tasks } from '@/features/Tasks';

export default function TasksPage() {
  return (
    <Page title="Задания">
      <Tasks />
    </Page>
  );
}
