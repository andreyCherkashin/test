import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ITrade } from '../../../domains/models';
import { selectEntities, State } from '../../../application/reducers/main';
import { save, remove } from '../../../application/actions/main';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public trades$: Observable<ITrade[]> = of([]);

  constructor(private store$: Store<State>) {
    this.trades$ = this.store$.pipe(select(selectEntities));
  }

  save(payload: Partial<ITrade>): void {
    this.store$.dispatch(save({ payload }));
  }

  delete(payload: string): void {
    this.store$.dispatch(remove({ payload }));
  }
}
