/* eslint-disable react/no-children-prop,react/jsx-props-no-spreading */
import { RouteObject, useRoutes } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '@/app/store';
import { selectUser } from '@/features/Auth/selectors';
import { RoleNames } from '@/entities/user';
// layouts
const Layout = React.lazy(() => import('../../features/Layout/Layout'));
// pages
const AuthPage = React.lazy(() => import('@/pages/Auth'));
const ProfilePage = React.lazy(() => import('@/pages/Profile'));
const TasksPage = React.lazy(() => import('@/pages/tasks/Tasks'));
const TaskPage = React.lazy(() => import('@/pages/tasks/Task'));
const CreateTaskPage = React.lazy(() => import('@/pages/tasks/CreateTask'));
const SubjectsPage = React.lazy(() => import('@/pages/subjects/Subjects'));
const CreateSubjectsPage = React.lazy(() => import('@/pages/subjects/CreateSubjects'));
const GroupsPage = React.lazy(() => import('@/pages/groups/Groups'));
const CreateGroupsPage = React.lazy(() => import('@/pages/groups/CreateGroups'));
const CreateUsersPage = React.lazy(() => import('@/pages/users/CreateUsers'));

interface AppRouteObject extends RouteObject {
  children?: AppRouteObject[];
  roles?: RoleNames[];
}

export const Router = () => {
  const user = useAppSelector(selectUser);

  const routesWithRoles: AppRouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: 'profile', element: <ProfilePage /> },
        {
          path: 'tasks',
          element: <TasksPage />,
          roles: [RoleNames.Student, RoleNames.Teacher],
        },
        { path: 'tasks/:id', element: <TaskPage />, roles: [RoleNames.Student, RoleNames.Teacher] },
        { path: 'tasks/create', element: <CreateTaskPage />, roles: [RoleNames.Teacher] },
        { path: 'subjects', element: <SubjectsPage />, roles: [RoleNames.Admin] },
        { path: 'subjects/create', element: <CreateSubjectsPage />, roles: [RoleNames.Admin] },
        { path: 'groups', element: <GroupsPage />, roles: [RoleNames.Admin] },
        { path: 'groups/create', element: <CreateGroupsPage />, roles: [RoleNames.Admin] },
        { path: 'users/create', element: <CreateUsersPage />, roles: [RoleNames.Admin] },
      ],
    },
    {
      path: '/auth',
      element: <AuthPage />,
    },
  ];

  const routes = routesWithRoles.reduce((acc, curr) => {
    if (curr.roles && user?.role && !curr.roles?.includes(user?.role)) {
      return acc;
    }

    if (curr.children?.length) {
      return [
        ...acc,
        {
          ...curr,
          children: curr.children?.filter(({ roles }) => (roles && user?.role
            ? roles?.includes(user?.role)
            : true)),
        },
      ];
    }

    return [...acc, curr];
  }, [] as AppRouteObject[]);

  return useRoutes(routes);
};
