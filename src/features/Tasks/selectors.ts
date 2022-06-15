import { createAppDraftSafeSelector } from '@/app/store';

export const selectList = createAppDraftSafeSelector((state) => state.tasks.list);

export const selectSubjects = createAppDraftSafeSelector((state) => state.tasks.subjects);

export const selectGroups = createAppDraftSafeSelector((state) => state.tasks.groups);

export const selectStudents = createAppDraftSafeSelector((state) => state.tasks.students);

export const selectStatus = createAppDraftSafeSelector((state) => state.tasks.status);

export const selectTotal = createAppDraftSafeSelector((state) => state.tasks.total);
