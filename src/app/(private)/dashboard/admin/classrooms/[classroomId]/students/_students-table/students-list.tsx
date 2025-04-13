"use client";

import { updateStudents } from "@/actions/classrooms";
import { Button } from "@/elements/button";
import { Checkbox } from "@/elements/checkbox";
import { Input } from "@/elements/input";
import { Label } from "@/elements/label";
import { SheetClose, SheetFooter } from "@/elements/sheet";
import { redirect, useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toast } from "sonner";

export default function StudentsList({
  data,
  setSheetOpen,
}: {
  data: { id: string; email: string; checked: boolean }[]
  setSheetOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { classroomId } = useParams<{ classroomId: string }>()
  const router = useRouter()
  const [users, setUsers] = useState(data)
  const [list, setList] = useState(users)
  const [search, setSearch] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleCheckboxChange = (id: string) => {
    setUsers((prev) =>
      prev.map((user) => ({
        id: user.id,
        email: user.email,
        checked: user.id === id ? !user.checked : user.checked,
      }))
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    const result = await updateStudents(
      users.filter((u) => u.checked === true).map((u) => u.id),
      classroomId
    )
    if (result.success) {
      toast.success("Saved Successfully")
      router.refresh()
      setSheetOpen(false)
    } else {
      toast.error(result.error)
      setIsSaving(false)
    }
  }

  useEffect(() => {
    const filteredList = users.filter((user) =>
      user.email.toLowerCase().includes(search.toLowerCase())
    )
    setList(filteredList)
  }, [search, users])

  useEffect(() => {
    if (!classroomId) {
      redirect("/dashboard/admin/classrooms")
    }
  }, [])

  return (
    <>
      <div className="flex-1 flex flex-col gap-6 px-4 overflow-y-auto py-1">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isSaving}
        />
        {list.length !== 0 ? (
          <div className="flex flex-col gap-4 h-full overflow-y-auto">
            {list.map((user) => (
              <Label
                key={user.id}
                htmlFor={user.id}
                className="flex items-center gap-4 px-4 hover:bg-accent/50 py-3 rounded-md"
              >
                <Checkbox
                  checked={user.checked}
                  onCheckedChange={() => handleCheckboxChange(user.id)}
                  id={user.id}
                  disabled={isSaving}
                />
                <span className="font-poppins">{user.email}</span>
              </Label>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-center font-roboto">No users found.</p>
          </div>
        )}
      </div>
      <SheetFooter className="gap-4 ">
        <Button isLoading={isSaving} onClick={handleSave}>
          Save
        </Button>
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
