import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AutocompleteTypeComponent, ChipsAutocompleteType } from './formly-types';

const CUSTOM_FORMLY_TYPES = [AutocompleteTypeComponent, ChipsAutocompleteType];
const SHARED_MODULES = [CommonModule, RouterModule, ReactiveFormsModule];
const SHARED_MATERIAL_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  FormlyModule,
  FormlyMaterialModule,
];

@NgModule({
  declarations: [],
  imports: [...SHARED_MODULES, ...SHARED_MATERIAL_MODULES, ...CUSTOM_FORMLY_TYPES],
  exports: [...SHARED_MODULES, ...SHARED_MATERIAL_MODULES, ...CUSTOM_FORMLY_TYPES],
})
export class SharedModule {}
