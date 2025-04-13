"use client";

import { createSubject } from "@/actions/subjects";
import { getFaculties } from "@/actions/users";
import Loader from "@/components/loader";
import { Button } from "@/elements/button";
import { Input } from "@/elements/input";
import { Label } from "@/elements/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/elements/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/elements/sheet";
import { type CreateSubjectSchema, createSubjectSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function AddSubjects() {
  const { classroomId } = useParams<{ classroomId: string }>()
  const router = useRouter()
  const [faculty, setFaculty] = useState<User[]>([])
  const [facultyId, setFacultyId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const fetchFaculties = async () => {
    setIsLoading(true)
    setError(null)
    const result = await getFaculties()
    if (result.success) {
      setFaculty(result.users)
    } else {
      setError(result.error)
    }
    setIsLoading(false)
  }

  const handleCreateSubject = async (data: CreateSubjectSchema) => {
    console.log(data)
    if (!facultyId) {
      toast.error("Please select a faculty")
      return
    }
    const result = await createSubject(data, facultyId, classroomId)
    if (result.success) {
      toast.success("Subject created successfully")
      router.refresh()
      setSheetOpen(false)
    } else {
      toast.error(result.error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSubjectSchema>({
    resolver: zodResolver(createSubjectSchema),
  })

  useEffect(() => {
    fetchFaculties()
  }, [])

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus strokeWidth={3} /> Add
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        {isLoading ? (
          <>
            <SheetHeader>
              <SheetTitle className="sr-only"></SheetTitle>
              <SheetDescription className="sr-only"></SheetDescription>
            </SheetHeader>
            <Loader />
          </>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>Add Subjects</SheetTitle>
              <SheetDescription>
                Fill in the form below to add a new subject.
              </SheetDescription>
            </SheetHeader>
            <form
              onSubmit={handleSubmit(handleCreateSubject)}
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
                  placeholder="Aritificial Intelligence"
                />
                {errors.name && (
                  <p className="text-red-500 pl-1">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="faculty" className="pl-1">
                  Faculty
                </Label>
                <Select onValueChange={setFacultyId}>
                  <SelectTrigger id="faculty" className="w-full h-10">
                    <SelectValue placeholder="Select a Faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    {error !== null ? (
                      <div className="h-40 flex items-center justify-center">
                        <h1>{error}</h1>
                      </div>
                    ) : (
                      <>
                        {faculty.length < 1 ? (
                          <div className="h-40 flex items-center justify-center">
                            <h1>No faculty found</h1>
                          </div>
                        ) : (
                          <>
                            {faculty.map((f) => (
                              <SelectItem key={f.id} value={f.id}>
                                {f.email}
                              </SelectItem>
                            ))}
                          </>
                        )}
                      </>
                    )}
                  </SelectContent>
                </Select>
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
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
