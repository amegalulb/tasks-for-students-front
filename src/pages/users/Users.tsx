/* eslint-disable react/function-component-definition */
import { Page } from '@/shared/components/Page';
import { Groups } from '@/features/Groups';

export default function GroupsPage() {
  return (
    <Page title="Пользователи">
      <Groups />
    </Page>
  );
}
