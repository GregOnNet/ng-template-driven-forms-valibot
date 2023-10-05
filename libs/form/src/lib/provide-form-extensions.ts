import { ErrorComponent } from './error.component';
import { FormSuiteModelGroupDirective } from './form-suite-model-group.directive';
import { FormSuiteModelDirective } from './form-suite-model.directive';
import { FormSuiteDirective } from './form-suite.directive';
import { MatErrorComponent } from './mat-error.component';
import { MatFormFieldDirective } from './mat-form-field.directive';

export function provideFormsSetting() {
  return [
    FormSuiteDirective,
    FormSuiteModelDirective,
    FormSuiteModelGroupDirective,

    // Core
    ErrorComponent,

    // Material
    MatFormFieldDirective,
    MatErrorComponent,
  ];
}
