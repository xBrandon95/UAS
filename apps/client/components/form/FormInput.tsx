import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  id?: string;
  type?: string;
  autoComplete?: string;
  disabled?: boolean;
  readOnly?: boolean;
  description?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  id,
  type = "text",
  autoComplete = "off",
  disabled = false,
  readOnly = false,
  description,
}: FormInputProps<T>) {
  const fieldId = id || `field-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          {description && (
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
          )}
          <Input
            {...field}
            id={fieldId}
            type={type}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            readOnly={readOnly}
            value={field.value ?? ""}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
