import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FormDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  fromDate?: Date;
  toDate?: Date;
  captionLayout?:
    | "label"
    | "dropdown"
    | "dropdown-months"
    | "dropdown-years"
    | undefined;
}

export function FormDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select date",
  description,
  disabled = false,
  className,
  buttonClassName,
  fromDate,
  toDate,
  captionLayout = "dropdown",
}: FormDatePickerProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={cn(className)}>
          <FieldLabel>{label}</FieldLabel>
          {description && (
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
          )}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between font-normal",
                  !field.value && "text-muted-foreground",
                  buttonClassName
                )}
                disabled={disabled}
                aria-invalid={fieldState.invalid}
              >
                {field.value ? field.value.toLocaleDateString() : placeholder}
                <ChevronDownIcon className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
                disabled={disabled}
                captionLayout={captionLayout}
                fromDate={fromDate}
                toDate={toDate}
              />
            </PopoverContent>
          </Popover>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
