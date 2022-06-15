import { createAsyncThunk } from '@reduxjs/toolkit';
import * as getTasks from '@/services/tasks/getTasks';
import * as getSubjects from '@/services/subjects/getSubjects';
import * as getGroups from '@/services/groups/getGroups';
import * as getStudents from '@/services/users/getStudents';
import { AxiosError } from 'axios';
import { RootState } from '@/app/store';
import type { State } from '@/features/Tasks/store';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (params: getTasks.Params & { group?: number }, { rejectWithValue, getState }) => {
  try {
    const tasks = await getTasks.call({ params });

    const state = (getState() as RootState).tasks;
    const stateSubjects = state.subjects;
    const stateGroups = state.groups;
    const stateStudents = state.students;

    let data: State = { ...state, ...tasks.data };

    if (!stateSubjects.length) {
      const subjects = await getSubjects.call();

      data = { ...data, subjects: subjects.data.list };
    }

    if (!stateGroups.length) {
      const groups = await getGroups.call();

      data = { ...data, groups: groups.data.list };
    }

    if (params.group && !stateStudents.length) {
      const students = await getStudents.call({ params: { groupId: params.group } });

      data = { ...data, students: students.data };
    }

    return data;
  } catch (e) {
    const error = e as AxiosError<getSubjects.Error | getTasks.Error | getGroups.Error>;
    return rejectWithValue(error.response?.data);
  }
});
