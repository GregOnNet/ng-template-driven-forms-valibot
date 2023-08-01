import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AppFormModelSchema, createEmptyAppFormModel } from './app-form.model';
import { provideFormSuite } from '@ng/form';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, FormsModule, NgIf, provideFormSuite()],
  selector: 'ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  schema = AppFormModelSchema;
  model = createEmptyAppFormModel();
}
