import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormlyModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card appearance="outlined" *ngFor="let field of field.fieldGroup; let i = index">
      <mat-card-content>
        <div class="repeat-group">
          <formly-field class="repeat-group-form" [field]="field"></formly-field>
          <button [disabled]="!canRemove()" class="remove-btn" mat-icon-button type="button" (click)="remove(i)">
            <mat-icon>delete</mat-icon>
          </button>
        </div>
      </mat-card-content>
    </mat-card>
    <button mat-raised-button type="button" (click)="add()">
      <mat-icon>add</mat-icon>
      {{ addButtonLabel }}
    </button>
  `,
  styles: `
    mat-card:not(:last-child) {
        margin-bottom: 1rem;
    }

    .repeat-group {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;

        .repeat-group-form {
            flex: 1;
        } 
    } 
  `,
})
export class RepeatTypeComponent extends FieldArrayType implements OnInit {
  ngOnInit(): void {
    while (this.formArrayLength < this.minGroups) {
      this.add();
    }
  }

  override remove(i: number) {
    if (this.canRemove()) {
      super.remove(i);
    }
  }

  canRemove(): boolean {
    return this.formArrayLength > this.minGroups;
  }

  get addButtonLabel() {
    return this.props['addButtonLabel'] || 'Add';
  }

  private get minGroups(): number {
    return this.props['minGroups'] || 0;
  }

  private get formArrayLength(): number {
    return (this.formControl as FormArray).length;
  }
}
