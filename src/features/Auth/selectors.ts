import { createAppDraftSafeSelector } from '@/app/store';

export const selectToken = createAppDraftSafeSelector((state) => state.auth.token);

export const selectUser = createAppDraftSafeSelector((state) => state.auth.user);
