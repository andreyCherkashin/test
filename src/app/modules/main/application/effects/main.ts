import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { MainService } from '../../services/main/main.service';
import { of } from 'rxjs';
import { getAll, getAllFailed, getAllSucceeded } from '../actions/main';

@Injectable()
export class MainEffects {
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAll),
      mergeMap(() =>
        this.mainService.getAll().pipe(
          map((payload) => getAllSucceeded({ payload })),
          catchError(() => of(getAllFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private mainService: MainService) {}
}
