import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITrade } from '../../../domains/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnDestroy {
  form: FormGroup;
  action: 'edit' | 'create' = 'create';
  data: ITrade | null;
  completeSubject$: Subject<any> = new Subject<any>();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public d: ITrade | null
  ) {
    this.data = d;

    if (d && d.id) {
      this.action = 'edit';
    }

    this.form = new FormGroup({
      entryDate: new FormControl(d?.entryDate, [
        Validators.required,
        this.dateLessThan('entryDate', 'exitDate'),
      ]),
      entryPrice: new FormControl(d?.entryPrice, [
        Validators.required,
        Validators.pattern(/\-?\d*\.?\d{1,2}/),
        Validators.min(0),
      ]),
      exitDate: new FormControl(d?.exitDate, [
        Validators.required,
        this.dateLessThan('entryDate', 'exitDate'),
      ]),
      exitPrice: new FormControl(d?.exitPrice, [
        Validators.required,
        Validators.pattern(/\-?\d*\.?\d{1,2}/),
        Validators.min(0),
      ]),
    });

    this.form
      .get('entryDate')
      ?.valueChanges.pipe(takeUntil(this.completeSubject$))
      .subscribe(() =>
        this.form.get('exitDate')?.updateValueAndValidity({ emitEvent: false })
      );

    this.form
      .get('exitDate')
      ?.valueChanges.pipe(takeUntil(this.completeSubject$))
      .subscribe(() =>
        this.form.get('entryDate')?.updateValueAndValidity({ emitEvent: false })
      );
  }

  dateLessThan(from: string, to: string) {
    return (): { [key: string]: any } => {
      if (!this.form) {
        return {};
      }
      let f = this.form.controls[from];
      let t = this.form.controls[to];

      if (!f.value || !t.value) {
        return {};
      }
      if (new Date(f.value).getTime() > new Date(t.value).getTime()) {
        return {
          dates: true,
        };
      }
      return {};
    };
  }

  save() {
    const values = this.form.getRawValue();
    this.dialogRef.close({
      data: this.data ? { ...this.data, ...values } : { ...values },
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.completeSubject$.next();
    this.completeSubject$.complete();
  }
}
