import { NgModule } from '@angular/core';
import { MainComponent } from './view/containers/main/main.component';
import { MainRoutingModule } from './main-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './application/effects/main';
import { StoreModule } from '@ngrx/store';
import * as main from './application/reducers/main';
import { DataTableComponent } from './view/components/data-table/data-table.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from './view/components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './view/components/chart/chart.component';

@NgModule({
  declarations: [
    MainComponent,
    DataTableComponent,
    DialogComponent,
    ChartComponent,
  ],
  imports: [
    StoreModule.forFeature('main', main.reducer),
    EffectsModule.forFeature([MainEffects]),
    MainRoutingModule,
    CommonModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxChartsModule,
  ],
  providers: [MainEffects, DatePipe],
})
export class MainModule {}
