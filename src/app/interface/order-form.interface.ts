import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IOrderDetailForm } from './order-detail-form.interface';

export interface IOrderForm {
  name: FormControl<string | null>;

  address: FormControl<string | null>;

  telephone: FormControl<string | null>;

  details: FormArray<FormGroup<IOrderDetailForm>>;
}
