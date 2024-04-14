import { DeepPartial } from '@ng/form';
import { custom, minLength, object, Output, string } from 'valibot';

export const customerFormSchema = object({
  names: object({
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
    [custom(({ password, passwordConfirmed }) => password === passwordConfirmed, 'The passwords do not match.')]
  ),
});

export type CustomerFormValid = Output<typeof customerFormSchema>;
export type CustomerFormModel = DeepPartial<Output<typeof customerFormSchema>>;
