import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Product } from '../../models';
import { EndOfLifeService } from '../../services/end-of-life.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  form = new FormGroup({});
  model: Partial<Product> = {};
  fields: FormlyFieldConfig[];

  constructor(private endOfLifeService: EndOfLifeService) {
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
          filter: (term: string) => this.endOfLifeService.getAllProducts(term),
        },
      },
    ];
  }

  onSubmit(product: Partial<Product>) {
    console.log(product);
  }
}
