// component
import { Iconify } from '@/shared/components/Iconify';
import { RoleNames } from '@/entities/user';

// ----------------------------------------------------------------------

const getIcon = (name: string) => <Iconify icon={name} width={22} height={22} />;

interface Link {
  title: string;
  path: string;
  icon: ReturnType<typeof getIcon>;
}

type LinkWithRole = Link & { roles: RoleNames[] }

const navConfig = (role: RoleNames) => {
  const links: LinkWithRole[] = [
    {
      title: 'Задания',
      path: '/tasks',
      icon: getIcon('eva:pie-chart-2-fill'),
      roles: [RoleNames.Student, RoleNames.Teacher],
    },
    {
      title: 'Предметы',
      path: '/subjects',
      icon: getIcon('eva:file-text-fill'),
      roles: [RoleNames.Admin],
    },
    {
      title: 'Группы',
      path: '/groups',
      icon: getIcon('eva:people-fill'),
      roles: [RoleNames.Admin],
    },
    {
      title: 'Создать пользователя',
      path: 'users/create',
      icon: getIcon('eva:person-add-fill'),
      roles: [RoleNames.Admin],
    },
  ];

  return links.reduce((acc, { roles, ...link }) => (roles.includes(role)
    ? [...acc, link]
    : acc), [] as Link[]);
};

export default navConfig;
