import { useMemo, useState } from 'react'
import { useMutation } from '@apollo/client'

import { GET_PARTICIPANTS, DELETE_PARTICIPANT, CREATE_PARTICIPANT, UPDATE_PARTICIPANT } from 'queries'

const useParticipant = () => {
  const [updateSuccess, setUpdateSuccess] = useState(null)
  const [updateError, setUpdateError] = useState(null)
  const [visibleDialog, setVisibleDialog] = useState(false)
  const [participantId, setParticipantId] = useState(null)
  
  const [deleteParticipant] = useMutation(DELETE_PARTICIPANT, {
    refetchQueries() {
      // this will refetch the query get participant after delete participant successfully
      return [{ query: GET_PARTICIPANTS, variables: { } }]
    }
  })
  const [createParticipant] = useMutation(CREATE_PARTICIPANT, {
    refetchQueries() {
      return [{ query: GET_PARTICIPANTS, variables: { } }]
    }
  })
  const [updateParticipant] = useMutation(UPDATE_PARTICIPANT, {
    onCompleted(data) {
      if (!!data.updateParticipant.success) {
        setUpdateSuccess(data.updateParticipant)
        return
      }
      if (!!data.updateParticipant.error) {
        setUpdateError(data.updateParticipant)
        return
      }
      
    },
    refetchQueries() {
      return [{ query: GET_PARTICIPANTS, variables: { } }]
    }
  })

  const state = useMemo(() => {
    return {
      visibleDialog,
      participantId,
      updateSuccess,
      updateError
    }
  }, [visibleDialog, participantId, updateSuccess, updateError])

  const action = useMemo(() => {
    return {
      setVisibleDialog,
      setParticipantId,
      deleteParticipant,
      createParticipant,
      updateParticipant,
      setUpdateSuccess,
      setUpdateError
    }
  }, [setVisibleDialog, setParticipantId, deleteParticipant, createParticipant, setUpdateSuccess, setUpdateError, updateParticipant])

  return [state, action]
}

export default useParticipant