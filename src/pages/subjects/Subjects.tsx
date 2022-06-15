/* eslint-disable react/function-component-definition */
import { Page } from '@/shared/components/Page';
import { Subjects } from '@/features/Subjects';

export default function SubjectsPage() {
  return (
    <Page title="Предметы">
      <Subjects />
    </Page>
  );
}
