import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { debounceTime, filter, retry, switchMap } from 'rxjs';
import { addProduct } from '../../actions/product.actions';
import { ProductDTO } from '../../models';
import { EndOfLifeService } from '../../services/end-of-life.service';
import { SharedModule } from '../../shared/shared.module';
import { AppState } from '../../states/app.states';

interface ProductForm {
  name: FormControl<string>;
  note: FormControl<string>;
  components: FormArray<
    FormGroup<{
      component: FormControl<string>;
      cycle: FormControl<string | number>;
    }>
  >;
}

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  form = new FormGroup<ProductForm>({} as ProductForm);
  model: Partial<ProductDTO> = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private store: Store<AppState>,
    private endOfLifeService: EndOfLifeService,
    private destroyRef: DestroyRef
  ) {
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
        type: 'repeat',
        props: {
          addButtonLabel: 'Add another component',
          minGroups: 1,
        },
        fieldArray: {
          fieldGroup: [
            {
              key: 'component',
              type: 'autocomplete',
              props: {
                required: true,
                label: 'Component',
                filter: (term: string) => this.endOfLifeService.getAllComponents(term),
              },
              hooks: {
                onInit: (field: FormlyFieldConfig) => {
                  field.formControl?.valueChanges
                    .pipe(
                      debounceTime(200),
                      filter(() => !!field.formControl?.valid),
                      switchMap((component) => this.endOfLifeService.getComponentCycles(component)),
                      retry(),
                      takeUntilDestroyed(this.destroyRef)
                    )
                    .subscribe((componentCycles) => {
                      const cycleField = field.parent?.fieldGroup?.find((g) => g.key === 'cycle');
                      cycleField!.props!.options = componentCycles;
                    });
                },
              },
            },
            {
              key: 'cycle',
              type: 'select',
              props: {
                required: true,
                label: 'Cycle',
                valueProp: 'cycle',
                labelProp: 'cycle',
              },
              expressions: {
                'props.disabled': (field: FormlyFieldConfig) => {
                  const componentField = field.parent?.fieldGroup?.find((g) => g.key === 'component');
                  return componentField!.formControl!.invalid;
                },
              },
            },
          ],
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
