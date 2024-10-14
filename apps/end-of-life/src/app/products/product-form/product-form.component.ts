import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { addProduct } from '../../actions/product.actions';
import { ProductDTO } from '../../models';
import { EndOfLifeService } from '../../services/end-of-life.service';
import { SharedModule } from '../../shared/shared.module';
import { AppState } from '../../states/app.states';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  form = new FormGroup({});
  model: Partial<ProductDTO> = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(private store: Store<AppState>, private endOfLifeService: EndOfLifeService) {
    this.fields = [
      {
        key: 'name',
        type: 'input',
        props: {
          required: true,

          label: 'Product name',
          placeholder: 'Enter the product name',
        },
      },
      {
        key: 'note',
        type: 'textarea',
        props: {
          label: 'Note',
          autosize: true,
          autosizeMinRows: 4,
          autosizeMaxRows: 4,
        },
      },
      {
        key: 'components',
        type: 'chips',
        props: {
          required: true,
          label: 'Components',
          filter: (term: string) => this.endOfLifeService.getAllComponents(term),
        },
      },
    ];
  }

  onSubmit(product: Partial<ProductDTO>) {
    if (this.form.invalid) {
      return;
    }

    // TODO: For some reason I need to do a deep copy of the object otherwise it causes errors
    const newProduct = structuredClone(product) as ProductDTO;

    this.store.dispatch(addProduct({ product: newProduct }));

    this.options.resetModel?.();
  }
}
