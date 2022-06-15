import { CreateGroup } from '@/features/Groups/CreateGroup';
import { Page } from '@/shared/components/Page';

// eslint-disable-next-line react/function-component-definition
export default function CreateGroupsPage() {
  return (
    <Page title="Создать группу">
      <CreateGroup />
    </Page>
  );
}
