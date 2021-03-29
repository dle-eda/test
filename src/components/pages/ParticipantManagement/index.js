// @flow
import React, { useContext } from 'react'

import Typography from 'components/Typography'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from 'components/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { Container, AddParticipantButton, ParticipantAccordionDetails, PanelIconHeader, SaveButton } from './styles'
import { LABEL } from 'translation'
import { ConfirmDeleteDialog } from 'components/Modal'
import useParticipant from 'hooks/useParticipant'
import { INITIAL_PARTICIPANT } from 'constants/index'
import ParticipantList from './ParticipantList'

import { participantListContext } from 'contexts/index'

const ParticipantManagement = (props) => {
  const listContext = useContext(participantListContext)
  const [participantState, participantAction] = useParticipant()
  const {
    participantId,
    visibleDialog,
    updateSuccess,
    updateError
  } = participantState
  const {
    setVisibleDialog,
    deleteParticipant,
    createParticipant,
    setParticipantId,
    updateParticipant,
    setUpdateSuccess,
    setUpdateError
  } = participantAction

  const onExecuteDeleteParticipant = () => {
    setVisibleDialog(false)
    deleteParticipant({ variables: { id: participantId } })
  }

  const onDeleteParticipant = (id) => {
    setParticipantId(id)
    setVisibleDialog(true)
  }

  const onAddParticipant = () => {
    createParticipant({ 
      variables: {
        ...INITIAL_PARTICIPANT
      } 
    })
  }

  const onClickSave = (event) => {
    event.preventDefault()
    const saveItem = listContext.list.find(item => !!item.mutated)
    if (saveItem) updateParticipant({
      variables: saveItem
    })
  }

  const onCloseSuccessSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    
    setUpdateSuccess(false)
  }

  const onCloseErrorSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    
    setUpdateError(false)
  }

  const renderContent = () => {
    return (
      <>
        <TableContainer component={Container}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <PanelIconHeader /><Typography>{LABEL.participant_header}</Typography>
          </AccordionSummary>
          <ParticipantAccordionDetails>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 160 }}>EMAIL</TableCell>
                  <TableCell style={{ width: 160 }}>PHONE NUMBER</TableCell>
                  <TableCell>FIRST NAME</TableCell>
                  <TableCell>LAST NAME</TableCell>
                  <TableCell style={{ width: 200 }}>GROUP</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                <ParticipantList onDelete={onDeleteParticipant}/>
              </TableBody>
            </Table>
            <AddParticipantButton variant='outlined' onClick={onAddParticipant}>
              Add participant
            </AddParticipantButton>
          </ParticipantAccordionDetails>
        </TableContainer>
        <SaveButton color='primary' variant='contained' onClick={onClickSave}>
          Save and Continues
        </SaveButton>

        {updateSuccess && (
          <Snackbar open={true} autoHideDuration={3000} onClose={onCloseSuccessSnackbar}>
            <MuiAlert severity='success'>
              {updateSuccess.message}
            </MuiAlert>
          </Snackbar>
        )}

        {updateError && (
          <Snackbar open={true} autoHideDuration={3000} onClose={onCloseErrorSnackbar}>
            <MuiAlert severity='error'>
              {updateError.message}
            </MuiAlert>
          </Snackbar>
        )}

        {visibleDialog && (
          <ConfirmDeleteDialog
            title='Confirm delete'
            body='Do you want to delete this participant'
            visible={true}
            onClose={() => setVisibleDialog(false)}
            onDelete={onExecuteDeleteParticipant}
          />
        )}
      </>
    )
  }

  return renderContent()
}

export default ParticipantManagement