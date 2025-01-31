"use client";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import React from "react";
import { CreateEventSchema } from "@/schemas/events";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useCategories } from "@/hooks/useCategories";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function CreateEventForm() {
  const { isLoading, categories } = useCategories();
  const { handleSubmit, control } = useForm<z.infer<typeof CreateEventSchema>>({
    resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      maxCapacity: undefined,
      image: "",
      date: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof CreateEventSchema>) => {
    console.log(data);
  };

  if (isLoading) {
    return <div>Loading form...</div>;
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center min-h-[600px] mb-10 my-5 p-10"
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
            type="text"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
        <Select className="w-full" label="Category">
          {categories.map((category) => (
            <SelectItem key={category.name}>{category.name}</SelectItem>
          ))}
        </Select>
        <Controller
          control={control}
          name="maxCapacity"
          render={({ field, fieldState }) => (
            <Input
              isRequired
              {...field}
              label="Maximum Capacity"
              variant="bordered"
              type="number"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <div className="w-full flex flex-row gap-4">
          <DatePicker
            hideTimeZone
            showMonthAndYearPickers
            defaultValue={now(getLocalTimeZone())}
            label="Event Date"
            variant="bordered"
          />
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
      <Button className="mt-5 self-end">Publish Event</Button>
    </Form>
  );
}
