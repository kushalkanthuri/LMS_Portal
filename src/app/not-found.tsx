"use client"

import { Button } from '@/elements/button'
import { useRouter } from 'next/navigation'
 
export default function NotFound() {
  const router = useRouter()

  return (
    <div className="size-full flex flex-col items-center justify-center gap-4">
      <h2 className="font-poppins text-4xl font-bold">Not Found</h2>
      <p className="font-roboto text-xl font-medium">
        Could not find requested resource
      </p>
      <Button onClick={() => router.back()} className='mt-4'>Go Back</Button>
    </div>
  )
}