import { createAsyncThunk } from '@reduxjs/toolkit';
import * as getTask from '@/services/tasks/getTask';
import { AxiosError } from 'axios';
import * as postTaskStatus from '@/services/tasks/postTaskStatus';
import * as postTaskEvaluate from '@/services/tasks/postTaskEvaluate';
import * as postTaskResponse from '@/services/tasks/postTaskResponse';
import { GradeMark, TaskStatuses } from '@/entities/task';

export const fetchTask = createAsyncThunk('task/fetchTask', async (params: getTask.Params, { rejectWithValue }) => {
  try {
    const { data } = await getTask.call({ params });

    return data;
  } catch (e) {
    const error = e as AxiosError<getTask.Error>;

    return rejectWithValue(error.response?.data);
  }
});

type FetchEditStatusParams = postTaskStatus.Params & {
  mark?: GradeMark
}

export const fetchEditStatus = createAsyncThunk('tasks/fetchEditStatus', async (params: FetchEditStatusParams, { rejectWithValue }) => {
  try {
    if (params.status === TaskStatuses.done && params.mark) {
      await postTaskEvaluate.call({ params: { mark: params.mark, id: params.id } });
    }

    const { data } = await postTaskStatus.call({
      params: {
        status: params.status,
        id: params.id,
      },
    });

    return data;
  } catch (e) {
    const error = e as AxiosError<postTaskStatus.Error>;
    return rejectWithValue(error.response?.data);
  }
});

export const fetchUploadResponse = createAsyncThunk('tasks/fetchUploadResponse', async (params: postTaskResponse.Params, { rejectWithValue }) => {
  try {
    const { data } = await postTaskResponse.call({ params });

    return data;
  } catch (e) {
    const error = e as AxiosError<postTaskResponse.Error>;
    return rejectWithValue(error.response?.data);
  }
});
