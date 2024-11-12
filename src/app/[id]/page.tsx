import React from "react"
import PollDetail from "../components/PollDetail"

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

  const result = await res.json()

  return <PollDetail data={result.data}/>
}

export default Detail