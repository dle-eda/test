import { gql } from '@apollo/client'

export const GET_PARTICIPANTS = gql`
  query GetParticipants {
    participant {
      id
      email
      phone
      country_code
      first_name
      last_name
      group
    }
  }
`

export const GET_GROUPS = gql`
  query GetGroups {
    group {
      id
      name
    }
  }
`

export const DELETE_PARTICIPANT = gql`
  mutation DeleteParticipant($id: Int!) {
    deleteParticipant(id: $id) {
      success
      message
    }
  }
`