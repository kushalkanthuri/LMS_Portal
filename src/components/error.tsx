"use client"

export const Error = ({ e }: { e: string }) => {
  return (
    <div className="size-full flex flex-col items-center justify-center gap-6">
      <h1>{e}</h1>
    </div>
  )
}
