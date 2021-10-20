import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { response } from './response';
import { delay, map } from 'rxjs/operators';
import { ITrade } from '../../domains/models';
import { mapTradeList } from './mapper';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  getAll(): Observable<ITrade[]> {
    return of(response).pipe(delay(1500), map(mapTradeList));
  }
}
