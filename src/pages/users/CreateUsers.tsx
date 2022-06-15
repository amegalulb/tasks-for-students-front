import { CreateUser } from '@/features/Users/CreateUser';
import { Page } from '@/shared/components/Page';

// eslint-disable-next-line react/function-component-definition
export default function CreateUsersPage() {
  return (
    <Page title="Создать пользователя">
      <CreateUser />
    </Page>
  );
}
