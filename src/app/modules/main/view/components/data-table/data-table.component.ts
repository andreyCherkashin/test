import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITrade } from '../../../domains/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() trades: ITrade[] | null = [];
  @Output() save: EventEmitter<Partial<ITrade>> = new EventEmitter<
    Partial<ITrade>
  >();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();
  displayedColumns: string[] = [
    'entryDate',
    'entryPrice',
    'exitDate',
    'exitPrice',
    'profit',
    'action',
  ];

  constructor(public dialog: MatDialog) {}

  openDialog(data: ITrade | null) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.save.emit(result.data);
    });
  }
}
