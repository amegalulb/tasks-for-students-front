// store
import { authSlice } from '@/features/Auth/store';
import { tasksSlice } from '@/features/Tasks/store';
import { taskSlice } from '@/features/Task/store';

export const rootReducer = {
  auth: authSlice.reducer,
  tasks: tasksSlice.reducer,
  task: taskSlice.reducer,
};
