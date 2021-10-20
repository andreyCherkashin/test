import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import {
  selectLoaded,
  selectLoading,
  State,
} from '../../application/reducers/main';
import { filter, first, map } from 'rxjs/operators';
import { getAll } from '../../application/actions/main';

@Injectable({ providedIn: 'root' })
export class MainResolver implements Resolve<boolean> {
  constructor(private store$: Store<any>) {}

  resolve(): Observable<boolean> {
    return combineLatest([
      this.store$.pipe(select(selectLoaded)),
      this.store$.pipe(select(selectLoading)),
    ]).pipe(
      map(([loaded, loading]) => {
        if (!loaded && !loading) {
          this.store$.dispatch(getAll());

          return false;
        }

        return loaded;
      }),
      filter((loaded) => loaded === true),
      first()
    );
  }
}
