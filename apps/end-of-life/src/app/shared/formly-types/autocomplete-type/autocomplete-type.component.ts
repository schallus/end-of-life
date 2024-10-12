import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-type',
  template: `
    <input
      matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="props.placeholder || ''"
      [errorStateMatcher]="errorStateMatcher"
    />
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let value of filter | async" [value]="value">
        {{ value }}
      </mat-option>
    </mat-autocomplete>
  `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
})
export class AutocompleteTypeComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  filter?: Observable<any>;

  ngOnInit() {
    this.filter = this.formControl.valueChanges.pipe(
      startWith(''),
      switchMap((term) => this.props['filter'](term))
    );
  }
}
