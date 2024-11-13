import React from "react"

interface Param {
  params: {
    id: string
  }
}

const Detail = async (
    {params} : Param
  )=> {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const { id } = await params
 
  const res = await fetch(`${baseUrl}/api/poll/${id}`, {
    method: 'GET'
  })

  const { data } = await res.json()

  const shareUrl = `${baseUrl}/${id}`
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center space-y-16">
          <span>Hello</span>
      </div>
    </>
  )
}

export default Detail