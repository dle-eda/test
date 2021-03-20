// flow
import React from 'react'

import {
  Container,
  EmailContainer,
  PhoneContainer,
  FirstNameContainer,
  LastNameContainer,
  GroupContainer
} from './styles'

type ParticipantItemProps = {
  email: String,
  phoneNumber: Number,
  firstName: String,
  lastName: String,
  group: String,
  onDelete: Function
}

const ParticipantItem = (props: ParticipantItemProps) => {
  const { email, phoneNumber, firstName, lastName, group } = props

  return (
    <Container>
      <EmailContainer>{email}</EmailContainer>
      <PhoneContainer>{phoneNumber}</PhoneContainer>
      <FirstNameContainer>{firstName}</FirstNameContainer>
      <LastNameContainer>{lastName}</LastNameContainer>
      <GroupContainer>{group}</GroupContainer>
    </Container>
  )
}

ParticipantItem.defaultProps = {
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  groupName: '',
  onDelete: () => {}
}

export default ParticipantItem