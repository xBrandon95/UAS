import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  id?: string;
  rows?: number;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
  description?: string;
}

export function FormTextarea<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  id,
  rows,
  className,
  maxLength,
  disabled = false,
  description,
}: FormTextareaProps<T>) {
  const fieldId = id || `field-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
            {description && (
              <p className="text-sm text-muted-foreground mb-2">
                {description}
              </p>
            )}

            <Textarea
              {...field}
              id={fieldId}
              rows={rows}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              className={cn(className)}
              disabled={disabled}
              maxLength={maxLength}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
