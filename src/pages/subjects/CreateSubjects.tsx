import { CreateSubjects } from '@/features/Subjects/CreateSubjects';
import { Page } from '@/shared/components/Page';

// eslint-disable-next-line react/function-component-definition
export default function CreateSubjectsPage() {
  return (
    <Page title="Создать предмет">
      <CreateSubjects />
    </Page>
  );
}
