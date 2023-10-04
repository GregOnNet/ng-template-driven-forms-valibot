import { custom, minLength, object, Output, string } from 'valibot';

export const CustomerFormModelSchema = object({
  names: object({
    firstName: string([
      minLength(1, 'Please enter your first name.'),
      minLength(2, 'The first name must contain at least 2 characters'),
    ]),
    lastName: string([
      minLength(1, 'Please enter your last name.'),
      minLength(2, 'The last name must contain at least 2 characters'),
    ]),
  }),
  passwords: object(
    {
      password: string([
        minLength(2, 'The password must contain at least 2 characters'),
      ]),
      passwordConfirmed: string(),
    },
    [
      custom(({ password, passwordConfirmed }) => {
        console.log(password, passwordConfirmed);
        return password === passwordConfirmed;
      }, 'The passwords do not match.'),
    ]
  ),
});

export type CustomerFormModel = Output<typeof CustomerFormModelSchema>;

export function createEmptyCustomerFormModel(): {
  schema: typeof CustomerFormModelSchema;
  model: CustomerFormModel;
} {
  return {
    schema: CustomerFormModelSchema,
    model: {
      names: { firstName: '', lastName: '' },
      passwords: { password: '', passwordConfirmed: '' },
    },
  };
}
