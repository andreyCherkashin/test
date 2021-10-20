import { ITrade } from '../../domains/models';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as actions from '../actions/main';
import { createUUID } from '../../domains/utils/guid';

export interface State {
  entities: ITrade[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = {
  entities: [],
  loading: false,
  loaded: false,
};

const mainReducer = createReducer(
  initialState,
  on(actions.getAll, (state) => ({ ...state, loading: true })),
  on(actions.getAllSucceeded, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    entities: payload,
  })),
  on(actions.getAllFailed, () => ({ ...initialState })),
  on(actions.save, (state, { payload }) => {
    let el: ITrade, i;
    const entities = [...state.entities];
    if (payload.id) {
      i = entities.findIndex(({ id }) => id === payload.id);
      el = { ...state.entities[i], ...payload };
    } else {
      el = { ...payload, id: createUUID() } as ITrade;
    }
    el.profit = el.exitPrice - el.entryPrice;
    if (i) {
      entities[i] = el as ITrade;
      return { ...state, entities };
    }
    return { ...state, entities: [el, ...entities] };
  }),
  on(actions.remove, (state, { payload }) => {
    const entities = state.entities.filter(({ id }) => id !== payload);
    return {
      ...state,
      entities,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return mainReducer(state, action);
}

export const selectFeature = createFeatureSelector<State>('main');
export const selectLoaded = createSelector(
  selectFeature,
  (state: State) => state.loaded
);
export const selectLoading = createSelector(
  selectFeature,
  (state: State) => state.loading
);
export const selectEntities = createSelector(
  selectFeature,
  (state: State) => state.entities
);
