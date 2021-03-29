import React, { useContext } from 'react'

import ParticipantItem from 'components/ParticipantItem'
import { APOLLO_NETWORK_STATUS } from 'constants/index'
import { EmptyList } from './styles'
import { participantListContext } from 'contexts/index'

const ParticipantList = ({
  onDelete
}) => {
  const {
    list,
    error,
    loading,
    networkStatus,
    updateItem
  } = useContext(participantListContext)

  const onDeleteParticipant = (id) => {
    onDelete(id)
  }

  const onChangeItem = (data) => {
    updateItem(data)
  }

  const renderParticipantItem = ({
    id,
    email,
    phone,
    first_name,
    last_name,
    group
  }) => {
    return (
      <ParticipantItem
        key={id}
        id={id}
        email={email}
        phone={phone}
        first_name={first_name}
        last_name={last_name}
        group={group}
        onDelete={onDeleteParticipant}
        onChange={onChangeItem}
      />
    )
  }

  const renderContent = () => {
    if (networkStatus === APOLLO_NETWORK_STATUS.ERROR) return <tr><td>Seems there something wrong with your network</td></tr>
    if (loading) return <tr><td>Loading ...</td></tr>
    if (error) return <tr><td>There error with the participant list</td></tr>
    if (!list || !list.length) return <EmptyList><td>There no participants</td></EmptyList>

  return list && list.map(renderParticipantItem)
  }

  return (
    <>
      {renderContent()}
    </>
  )
}

export default ParticipantList 