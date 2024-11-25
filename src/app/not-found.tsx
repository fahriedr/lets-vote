import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col h-full w-full justify-center items-center">
        <h2 className='text-2xl align-middle'>Page Not Found</h2>
        <span>Return <Link href="/">Home</Link></span>
      </div>
    </div>
  )
}