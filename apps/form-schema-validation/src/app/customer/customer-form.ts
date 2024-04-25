import { inject } from '@angular/core';
import { DeepPartial } from '@ng/form';
import { custom, customAsync, minLength, object, objectAsync, Output, string, stringAsync } from 'valibot';
import { UserNameValidator } from './user-name-validator.service';

export function createCustomerForm() {
  const validator = inject(UserNameValidator);

  return objectAsync({
    names: objectAsync({
      userName: stringAsync([
        customAsync(validator.canUserNameBeTaken, 'Sorry, the user name is already taken.'),
        minLength(2, 'Enter at least two characters, please.'),
      ]),
      firstName: string('Enter your first name, please.', [minLength(2, 'Enter at least two characters, please.')]),
      lastName: string('Enter your last name, please.', [minLength(2, 'Enter at least two characters, please.')]),
    }),
    passwords: object(
      {
        password: string('Enter your password, please.', [minLength(2, 'Enter at least two characters, please.')]),
        passwordConfirmed: string('Confirm your password, please.', [
          minLength(2, 'Enter at least two characters, please.'),
        ]),
      },
      [custom(({ password, passwordConfirmed }) => password === passwordConfirmed, 'The passwords do not match.')],
    ),
  });
}

export type CustomerFormValid = Output<ReturnType<typeof createCustomerForm>>;
export type CustomerFormModel = DeepPartial<CustomerFormValid>;
