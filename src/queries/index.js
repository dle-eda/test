import { gql } from '@apollo/client'

export const GET_PARTICIPANTS = gql`
  query GetParticipants {
    participant {
      id
      email
      phone
      first_name
      last_name
      group
    }
  }
`

export const CREATE_PARTICIPANT = gql`
  mutation CreateParticipant($email: String!, $phone: String!, $first_name: String!, $last_name: String!, $group: String!) {
    createParticipant(email: $email, phone: $phone, first_name: $first_name, last_name: $last_name, group: $group) {
      success
      error
      message
    }
  }
`

export const UPDATE_PARTICIPANT = gql`
  mutation UpdateParticipant($id: Int!, $email: String!, $phone: String!, $first_name: String!, $last_name: String!, $group: String!) {
    updateParticipant(id: $id, email: $email, phone: $phone, first_name: $first_name, last_name: $last_name, group: $group) {
      success
      error
      message
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
      error
      message
    }
  }
`