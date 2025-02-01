"use client";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import React, { startTransition, useState, useTransition } from "react";
import { CreateEventSchema } from "@/schemas/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useCategories } from "@/hooks/useCategories";
import {
  DesktopDateTimePicker,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";

type CreateEventFormInput = z.infer<typeof CreateEventSchema>;

export default function CreateEventForm() {
  const { isLoading, categories } = useCategories();
  const [hasMaxCapacity, setHasMaxCapacity] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { handleSubmit, control } = useForm<CreateEventFormInput>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      maxCapacity: 1,
      image: "",
      date: new Date(),
    },
  });

  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const onSubmit = (data: z.infer<typeof CreateEventSchema>) => {
    if (!hasMaxCapacity) {
      data.maxCapacity = undefined;
    }

    startTransition(async () => {});
  };

  if (isLoading) {
    return <div>Loading form...</div>;
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center min-h-[700px] mb-10 my-5 p-10"
    >
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Input
            isRequired
            // isDisabled={isPending}
            {...field}
            label="Event Name"
            variant="bordered"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
        <div className="w-full flex flex-col gap-7">
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select className="w-full" label="Category" {...field}>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="date"
            render={({ field, fieldState }) => (
              <div className="w-full">
                <div className="md:hidden block w-full">
                  <MobileDateTimePicker
                    className="w-full shadow-sm"
                    {...field}
                    label="Event Date"
                    minDateTime={new Date()}
                    disablePast
                    value={field.value ?? null}
                    onChange={(date) => field.onChange(date ?? undefined)}
                  />
                </div>
                <div className="hidden md:block w-full">
                  <DesktopDateTimePicker
                    {...field}
                    className="w-full shadow-sm"
                    slotProps={{ textField: { sx: { borderRadius: "8px" } } }}
                    label="Event Date"
                    value={field.value}
                    disablePast
                    minDate={getToday()}
                    onChange={(newValue) => field.onChange(newValue)}
                  />
                </div>
              </div>
            )}
          />
          <div>
            <Checkbox
              className="mb-2"
              checked={hasMaxCapacity}
              onChange={() => {
                setHasMaxCapacity(!hasMaxCapacity);
              }}
            >
              Does this event have a max capacity?
            </Checkbox>

            <Controller
              control={control}
              name="maxCapacity"
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  value={field.value !== undefined ? String(field.value) : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? undefined : Number(value));
                  }}
                  isDisabled={!hasMaxCapacity}
                  label="Maximum Capacity"
                  variant="bordered"
                  type="number"
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
          </div>
        </div>

        <Controller
          control={control}
          name="image"
          render={({ field, fieldState }) => (
            <Input
              isRequired
              {...field}
              label="Image URL"
              variant="bordered"
              type="url"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </div>
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Textarea
            isRequired
            {...field}
            label="Description"
            placeholder="Enter your description"
            className="mt-5"
            variant="bordered"
            type="text"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Button type="submit" className="mt-5 self-end">
        Publish Event
      </Button>
    </Form>
  );
}
