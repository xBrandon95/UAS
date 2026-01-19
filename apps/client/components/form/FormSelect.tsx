import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectOptionGroup {
  type: "separator";
}

export type SelectOptionOrSeparator = SelectOption | SelectOptionGroup;

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: SelectOptionOrSeparator[];
  placeholder?: string;
  id?: string;
  description?: string;
  orientation?: "vertical" | "horizontal" | "responsive";
  triggerClassName?: string;
  contentPosition?: "item-aligned" | "popper";
  disabled?: boolean;
  defaultOption?: SelectOption;
}

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select",
  options,
  id,
  description,
  orientation = "vertical",
  triggerClassName,
  contentPosition = "popper",
  disabled = false,
  defaultOption,
}: FormSelectProps<T>) {
  const fieldId = id || `field-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation={orientation} data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          {description && (
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
          )}

          <Select
            name={field.name}
            value={field.value ?? ""}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              id={fieldId}
              aria-invalid={fieldState.invalid}
              className={cn(triggerClassName)}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent position={contentPosition}>
              {defaultOption && (
                <>
                  <SelectItem value={defaultOption.value}>
                    {defaultOption.label}
                  </SelectItem>
                  <SelectSeparator />
                </>
              )}

              {options.map((option, index) => {
                if ("type" in option && option.type === "separator") {
                  return <SelectSeparator key={`separator-${index}`} />;
                }

                const selectOption = option as SelectOption;
                return (
                  <SelectItem
                    key={selectOption.value}
                    value={selectOption.value}
                  >
                    {selectOption.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
