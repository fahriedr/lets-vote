import CommentSection from "@/app/components/CommentSection"
import PollResult from "@/app/components/PollResult"
import ShareCard from "@/app/components/ShareCard"
import React from "react"

interface Param {
  params: {
    id: string
  }
}

const Result = async (
    {params} : Param
  )=> {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const { id } = await params
 
  const res = await fetch(`${baseUrl}/api/poll/${id}/result`, {
    method: 'GET'
  })

  const { data } = await res.json()

    const shareUrl = `${baseUrl}/poll/${id}`

  return (
    <div className="w-full flex flex-col justify-center items-center space-y-16">
      <PollResult data={data}/>
      <ShareCard url={shareUrl}/>
      <CommentSection allow_comment={data.allow_comment} unique_id={data.unique_id}/>
    </div>
  )
}

export default Result