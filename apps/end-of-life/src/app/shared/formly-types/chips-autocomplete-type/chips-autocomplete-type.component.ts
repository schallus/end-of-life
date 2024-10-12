import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap, take } from 'rxjs/operators';

@Component({
  template: `
    <mat-chip-grid #chipGrid>
      <mat-chip-row
        *ngFor="let item of formControl.value; let i = index"
        (removed)="remove(i)"
      >
        {{ item }}
        <mat-icon matChipRemove *ngIf="removable">cancel</mat-icon>
      </mat-chip-row>
      <input
        #input
        [formControl]="itemControl"
        [matAutocomplete]="auto"
        [matChipInputFor]="chipGrid"
        [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
        [matChipInputAddOnBlur]="addOnBlur"
        (matChipInputTokenEnd)="add($event)"
        (blur)="onBlur()"
      />
    </mat-chip-grid>
    <mat-autocomplete
      #auto="matAutocomplete"
      (optionSelected)="selected($event)"
    >
      <mat-option *ngFor="let item of filter | async" [value]="item">
        {{ item }}
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
    MatChipsModule,
    MatIconModule,
  ],
})
export class ChipsAutocompleteType
  extends FieldType<FieldTypeConfig>
  implements OnInit, OnDestroy
{
  onDestroy$ = new Subject<void>();

  itemControl = new FormControl();
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  filter?: Observable<any[]>;

  constructor(private destroyRef: DestroyRef) {
    super();
  }

  ngOnInit() {
    this.filter = this.itemControl.valueChanges.pipe(
      startWith(''),
      switchMap((term) => this.props['filter'](term) as Observable<any[]>)
    );
  }

  override get empty() {
    return this.formControl.value.length === 0;
  }

  add(event: MatChipInputEvent): void {
    const value = event.value?.trim();

    if (value) {
      // Check if the value exists in the available autocomplete options
      this.filter?.pipe(take(1))?.subscribe((options) => {
        if (options.includes(value)) {
          const currentValue = new Set(this.formControl.value || []);

          if (!currentValue.has(value)) {
            currentValue.add(value);
            const sortedValue = [...currentValue].sort();
            this.formControl.setValue(sortedValue); // Set the sorted array
          }
        }
      });
    }

    // Reset input
    this.inputRef.nativeElement.value = '';
    this.itemControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;

    if (value) {
      const currentValue = new Set(this.formControl.value || []);

      currentValue.add(value);
      const sortedValue = [...currentValue].sort();
      this.formControl.setValue(sortedValue); // Set the sorted array
    }

    this.itemControl.setValue(null);
  }

  remove(i: number): void {
    const value = this.formControl.value;

    // Remove the item at index 'i' directly from the array
    if (value) {
      this.formControl.setValue([...value.slice(0, i), ...value.slice(i + 1)]);
      this.formControl.markAsTouched();
    }
  }

  onBlur() {
    this.formControl.markAsTouched();
    this.field.focus = false;
  }
}
