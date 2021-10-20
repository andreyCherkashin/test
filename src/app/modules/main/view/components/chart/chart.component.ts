import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ITrade } from '../../../domains/models';
import { DatePipe } from '@angular/common';
import { Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
  @Input() trades: ITrade[] | null = [];
  data: Array<{
    name: string;
    series: Array<{ name: string; value: number }>;
  }> = [];

  colorScheme: Color = {
    domain: ['#7b1fa2'],
  } as Color;

  constructor(private datePipe: DatePipe) {}

  ngOnChanges({ trades }: SimpleChanges): void {
    if (trades && trades.currentValue) {
      this.data = [
        {
          name: '',
          series: ([...trades.currentValue] as ITrade[])
            .sort(
              (a: ITrade, b: ITrade) =>
                new Date(a.exitDate).getTime() - new Date(b.exitDate).getTime()
            )
            .map(({ exitDate, profit }) => ({
              name: this.transformDate(exitDate),
              value: profit,
            })),
        },
      ];
    }
  }

  transformDate(date: Date): string {
    return this.datePipe.transform(date, 'mediumDate') as string;
  }
}
