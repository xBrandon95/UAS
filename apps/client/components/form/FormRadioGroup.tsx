import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface FormRadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: RadioOption[];
  description?: string;
  disabled?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal";
}

export function FormRadioGroup<T extends FieldValues>({
  name,
  control,
  label,
  options,
  description,
  disabled = false,
  className,
  orientation = "vertical",
}: FormRadioGroupProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={cn(className)}>
          <FieldLabel>{label}</FieldLabel>
          {description && (
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
          )}

          <RadioGroup
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={disabled}
            className={cn(
              orientation === "horizontal" && "flex flex-wrap gap-4"
            )}
          >
            {options.map((option) => {
              const radioId = `${name}-${option.value}`;

              return (
                <div key={option.value} className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={option.value}
                    id={radioId}
                    aria-invalid={fieldState.invalid}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={radioId}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </label>
                    {option.description && (
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </RadioGroup>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
