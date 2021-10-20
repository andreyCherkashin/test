import { createAction, props } from '@ngrx/store';
import { ITrade } from '../../domains/models';

export const getAll = createAction('[Main Page] get all');

export const getAllSucceeded = createAction(
  '[Main Page] get all succeeded',
  props<{ payload: ITrade[] }>()
);

export const getAllFailed = createAction('[Main Page] get all failed');

export const save = createAction(
  '[Main Page] save',
  props<{ payload: Partial<ITrade> }>()
);

export const remove = createAction(
  '[Main Page] remove',
  props<{ payload: string }>()
);
