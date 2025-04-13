"use client"

import { saveAttendance } from "@/actions/attendence";
import { Button } from "@/elements/button";
import { Checkbox } from "@/elements/checkbox"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";

export function StudentsGrid({
  students,
  subjectId
}: {
  students: { id: string; name: string; email: string; checked: boolean }[]
  subjectId: string
}) {
  const router = useRouter()
  const [list, setList] = useState(students)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    const result = await saveAttendance(list, subjectId)
    if(result.success){
      toast.success("Submitted Successfully")
      router.refresh()
    } else {
      toast.error(result.error)
    }

    setIsLoading(false)
  }

  return (
    <main className="size-full p-16 flex flex-col gap-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-poppins font-semibold">Attendance</h1>
          <p className="text-sm text-muted-foreground">
            Attendance for {new Date().toDateString()}
          </p>
        </div>
        <Button isLoading={isLoading} onClick={handleSave}>Submit</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {list.map((student) => (
          <label
            htmlFor={student.id}
            className="w-full bg-accent rounded-md p-4 flex items-center gap-4"
            key={student.id}
          >
            <Checkbox
              id={student.id}
              className="size-6"
              checked={student.checked}
              onCheckedChange={(checked) => {
                setList((prev) =>
                  prev.map((s) => ({
                    ...s,
                    checked:
                      s.id === student.id ? (checked as boolean) : s.checked,
                  }))
                )
              }}
            />
            <div className="flex-1 w-full flex flex-col items-start">
              <span className="font-roboto font-medium">{student.name}</span>
              <span className="font-roboto text-sm text-muted-foreground">
                {student.email}
              </span>
            </div>
          </label>
        ))}
      </div>
    </main>
  )
}
