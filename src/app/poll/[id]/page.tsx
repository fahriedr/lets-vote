import React from "react"
import CommentSection from "../../components/CommentSection"
import PollDetail from "../../components/PollDetail"
import ShareCard from "../../components/ShareCard"

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

  const shareUrl = `${baseUrl}/poll/${id}`
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center space-y-16">
        <PollDetail data={data}/>
        <ShareCard url={shareUrl}/>
        <CommentSection allow_comment={data.allow_comment} unique_id={data.unique_id}/>
      </div>
    </>
  )
}

export default Detail