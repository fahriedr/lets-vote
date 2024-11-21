import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col h-full w-full justify-center items-center">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <p>Return <Link href="/">Home</Link></p>
      </div>
    </div>
  )
}