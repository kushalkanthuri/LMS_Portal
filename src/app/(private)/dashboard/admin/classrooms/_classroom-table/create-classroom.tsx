"use client";

import { createClassroom } from "@/actions/classrooms";
import { Button } from "@/elements/button";
import { Input } from "@/elements/input";
import { Label } from "@/elements/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/elements/sheet";
import {
  type CreateClassroomSchema,
  createClassroomSchema,
} from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateClassroom() {
  const [sheetOpen, setSheetOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateClassroomSchema>({
    resolver: zodResolver(createClassroomSchema),
  })

  const handleCreateSchool = async (data: CreateClassroomSchema) => {
    const result = await createClassroom(data)
    if (result.success) {
      toast.success("Classroom created successfully")
      setSheetOpen(false)
      redirect(`/dashboard/admin/classrooms/${result.classroom.id}`)
    } else {
      toast.error(result.error)
    }
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus /> Create
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-xl"
        onInteractOutside={(e) => {
          if (isSubmitting) {
            e.preventDefault()
          }
        }}
      >
        <SheetHeader>
          <SheetTitle>Create Classroom</SheetTitle>
          <SheetDescription>Fill in the details to continue</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleCreateSchool)}
          className="w-full flex flex-col gap-4 px-6"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="pl-1">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              {...register("name")}
              placeholder="CSE A19"
            />
            {errors.name && (
              <p className="text-red-500 pl-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex items-center justify-evenly gap-2">
            <Button type="submit" isLoading={isSubmitting}>
              Create
            </Button>
            <SheetClose asChild>
              <Button disabled={isSubmitting} variant="outline">
                Close
              </Button>
            </SheetClose>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
