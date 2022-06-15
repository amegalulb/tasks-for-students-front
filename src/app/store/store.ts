import { configureStore, ConfigureStoreOptions, createDraftSafeSelector } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from './reducer';

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) => configureStore({
  reducer: rootReducer,
  middleware:
    (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(),
  ...options,
  devTools: true,
});

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const createAppDraftSafeSelector = <T = any, >(
  selector: (state: RootState) => T,
) => createDraftSafeSelector(
    (state: RootState) => state,
    selector,
  );
