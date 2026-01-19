import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  id?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
  id,
  description,
  disabled = false,
  className,
}: FormCheckboxProps<T>) {
  const fieldId = id || `field-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={cn(className)}>
          <div className="flex items-start space-x-3">
            <Checkbox
              id={fieldId}
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={fieldId}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {label}
              </label>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
