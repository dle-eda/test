import React from 'react'

type ParticipantItemProps = {
  email: String,
  phoneNumber: Number,
  firstName: String,
  lastName: String,
  groupName: String,
  onDelete: Function
}

const ParticipantItem = (props: ParticipantItemProps) => {
  return (
    <div>ParticipantItem</div>
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