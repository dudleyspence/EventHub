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
import React, { useState, useTransition } from "react";
import { CreateEventSchema } from "@/schemas/event";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useCategories } from "@/hooks/useCategories";
import {
  DesktopDateTimePicker,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { createEventAction } from "@/lib/actions/createEvent";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { DragAndDropUploader } from "./ImageDragAndDrop";
import { useUploadImage } from "@/hooks/useUploadImage";

type CreateEventFormInput = z.infer<typeof CreateEventSchema>;

export default function CreateEventForm() {
  const { categories } = useCategories();
  const [hasMaxCapacity, setHasMaxCapacity] = useState(false);
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { handleImageUpload, isUploading } = useUploadImage(selectedImage);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateEventFormInput>({
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

  // THINGS TO CONSIDER: LOADING PAGE FOR LOADING THE FORM
  // CHECK DATE IS IN UTC FORMAT
  // SWAP THE IMAGE TO BE IMAGE UPLOAD WITH DRAG AND DROP

  const onSubmit = (data: CreateEventFormInput) => {
    if (!hasMaxCapacity) {
      data.maxCapacity = undefined;
    }

    startTransition(async () => {
      if (!user || !user.id) {
        alert("failure finding user");
        return;
      }
      try {
        const event = await createEventAction(data, user.id);

        if (event) {
          alert("Event created");
          router.push(`/admin/events/${event.id}`);
        }
      } catch (error) {
        console.log(error);
        alert("Failed to create event");
      }
    });
  };

  return (
    <Form className="w-full flex flex-col items-center min-h-[700px] mb-10 my-5 p-10">
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Input
            isRequired
            isDisabled={isPending}
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
            render={({ field, fieldState }) => (
              <Select
                isRequired
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                isDisabled={isPending}
                variant="bordered"
                className="w-full"
                label="Category"
                {...field}
              >
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <div className="w-full">
                <div className="md:hidden block w-full">
                  <MobileDateTimePicker
                    disabled={isPending}
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
                    disabled={isPending}
                    className="w-full shadow-sm"
                    slotProps={{ textField: { sx: { borderRadius: "8px" } } }}
                    label="Event Date"
                    value={field.value}
                    disablePast
                    minDate={new Date()}
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
              isDisabled={isPending}
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
                  isDisabled={!hasMaxCapacity || isPending}
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

        <DragAndDropUploader
          isError={errors?.image}
          setSelectedImage={setSelectedImage}
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
            isDisabled={isPending}
            placeholder="Enter your description"
            className="mt-5"
            variant="bordered"
            type="text"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Button
        isDisabled={isPending || isUploading}
        isLoading={isPending || isUploading}
        className="mt-5 self-end"
        onPress={async () => {
          if (selectedImage) {
            const imageUrl = await handleImageUpload();

            if (imageUrl) {
              setValue("image", imageUrl, { shouldValidate: true });
              console.log(imageUrl);
            }
          }

          handleSubmit(onSubmit)();
        }}
      >
        Publish Event
      </Button>
    </Form>
  );
}
