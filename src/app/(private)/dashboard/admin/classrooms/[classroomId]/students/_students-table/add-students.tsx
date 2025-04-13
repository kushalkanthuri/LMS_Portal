"use client"

import { getUsersWithoutClassroom } from "@/actions/users"
import Loader from "@/components/loader"
import { Button } from "@/elements/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/elements/sheet"
import { useEffect, useState } from "react"
import StudentsList from "./students-list"
import { Plus } from "lucide-react"

export default function AddStudents() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<null | string>(null)
  const [users, setUsers] = useState<{ id: string; email: string }[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)

  const fetchUsers = async () => {
    setIsLoading(true)
    const result = await getUsersWithoutClassroom()
    if (result.success) {
      setUsers(result.users)
    } else {
      setError(result.error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus strokeWidth={3} /> Add
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Add Students</SheetTitle>
          <SheetDescription>
            Select students to add to the classroom
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {error ? (
              <div className="size-full flex flex-col gap-6 items-center py-16 px-4">
                <h1 className="font-poppins text-destructive text-pretty">
                  {error}
                </h1>
                <div className="flex items-center h-fit gap-4 justify-evenly">
                  <Button onClick={fetchUsers}>Retry</Button>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </div>
              </div>
            ) : (
              <>
                {users.length === 0 ? (
                  <div className="size-full flex flex-col gap-6 items-center px-4 py-16">
                    <h1 className="font-poppins text-center text-2xl font-medium">
                      No Users Found
                    </h1>
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </div>
                ) : (
                  <StudentsList
                    data={users.map((u) => ({
                      id: u.id,
                      email: u.email,
                      checked: false,
                    }))}
                    setSheetOpen={setSheetOpen}
                  />
                )}
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
