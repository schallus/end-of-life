import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

const SHARED_MODULES = [CommonModule, RouterModule, ReactiveFormsModule];
const SHARED_MATERIAL_MODULES = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
];

@NgModule({
  declarations: [],
  imports: [...SHARED_MODULES, ...SHARED_MATERIAL_MODULES],
  exports: [...SHARED_MODULES, ...SHARED_MATERIAL_MODULES],
})
export class SharedModule {}
