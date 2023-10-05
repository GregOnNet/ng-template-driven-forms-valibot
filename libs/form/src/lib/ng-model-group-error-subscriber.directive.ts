import {
  AfterViewInit,
  Component,
  Directive,
  inject,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { FormSettingDirective } from './form-setting.directive';

@Component({
  standalone: true,
  template: 'Error',
})
export class ErrorSummaryComponent {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngModelGroup]',
  standalone: true,
})
export class FormSuiteModelGroupDirective implements AfterViewInit {
  private readonly formDirective = inject(FormSettingDirective);

  #renderer = inject(Renderer2);
  #viewContainerRef = inject(ViewContainerRef);

  ngAfterViewInit(): void {
    console.log(this.#viewContainerRef);
    this.#viewContainerRef.createComponent(ErrorSummaryComponent);
  }
}
