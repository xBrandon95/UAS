"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldGroup } from "@/components/ui/field";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { TestFormData, testSchema } from "@/lib/validations/test.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormTextarea } from "@/components/form/FormTextarea";
import { FormSelect } from "@/components/form/FormSelect";
import { FormCheckbox } from "@/components/form/FomCheckbox";
import { FormRadioGroup } from "@/components/form/FormRadioGroup";
import { FormDatePicker } from "@/components/form/FormDatePicker";

const spokenLanguages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "pt", label: "Portuguese" },
  { value: "ja", label: "Japanese" },
  { value: "zh", label: "Chinese" },
];

const opcionesGenero = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "otro", label: "Otro" },
];

export default function TestPage() {
  const { control, handleSubmit, reset, watch } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      titulo: "",
      observaciones: "",
      lenguaje: "",
      terminos: false,
      genero: "",
      fechaNacimiento: new Date(new Date().setHours(0, 0, 0, 0)),
    },
  });

  function onSubmit(data: TestFormData) {
    console.log(data);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput name="titulo" label="Tìtulo" control={control} />

            <FormTextarea
              name="observaciones"
              label="Observaciones"
              control={control}
            />

            <FormSelect
              name="lenguaje"
              control={control}
              label="Spoken Language"
              placeholder="Selecciona una opción"
              options={spokenLanguages}
              id="form-rhf-select-language"
            />

            <FormCheckbox
              name="terminos"
              control={control}
              label="Acepto los términos y condiciones"
              description="Debes aceptar para continuar"
            />

            <FormRadioGroup
              name="genero"
              control={control}
              label="Género"
              options={opcionesGenero}
              orientation="horizontal"
            />

            <FormDatePicker
              name="fechaNacimiento"
              control={control}
              label="Fecha de cita"
              placeholder="Selecciona una fecha"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>

      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </Card>
  );
}
