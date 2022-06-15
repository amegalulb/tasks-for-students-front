import { Page } from '@/shared/components/Page';
import { CreateTask } from '@/features/CreateTask';

// eslint-disable-next-line react/function-component-definition
export default function CreateTaskPage() {
  return (
    <Page title="Создать задание">
      <CreateTask />
    </Page>
  );
}
