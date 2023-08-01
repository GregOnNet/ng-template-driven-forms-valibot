import { minLength, object, Output, string } from 'valibot';

export const AppFormModelSchema = object({
  text: string([minLength(1, 'Please specify a text')]),
});

export type AppFormModel = Output<typeof AppFormModelSchema>;

export function createEmptyAppFormModel(): AppFormModel {
  return { text: '' };
}
