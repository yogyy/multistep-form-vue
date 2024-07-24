interface FormFieldBase {
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
}

interface TextField extends FormFieldBase {
  type: "textfield";
}

interface TextAreaField extends FormFieldBase {
  type: "textarea";
}

interface Option {
  label: string;
  value: string;
}

interface AutocompleteField extends FormFieldBase {
  type: "autocomplete";
  options: string[];
}

interface RadioField extends FormFieldBase {
  type: "radio";
  options: Option[];
}

type FormField = TextField | TextAreaField | AutocompleteField | RadioField;

export interface FormStep {
  step: number;
  title: string;
  description: string;
  fields: FormField[];
}
