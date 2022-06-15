import { createAppDraftSafeSelector } from '@/app/store';

export const selectTask = createAppDraftSafeSelector((state) => state.task.item);

export const selectStatus = createAppDraftSafeSelector((state) => state.task.status);
