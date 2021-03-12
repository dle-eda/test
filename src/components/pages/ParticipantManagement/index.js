import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

const PARTICIPANTS = gql`
  query GetParticipants {
    participants {
      email
      phoneNumber
    }
  }
`

const ParticipantManagement = (props) => {
  const { getParticipants, title } = props
  const { data } = useQuery(PARTICIPANTS)

  useEffect(() => {
    getParticipants()
  }, [])

  useEffect(() => {
    if (data) {
      // console.error('data', data)
    }    
  }, [data])
  return (
    <div>
      {title}
    </div>
  )
}

export default ParticipantManagement