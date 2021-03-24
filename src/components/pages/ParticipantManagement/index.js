// @flow
import React from 'react'

import Typography from 'components/Typography'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from 'components/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { Container, AddParticipantButton, ParticipantAccordionDetails, PanelIconHeader, SaveButton } from './styles'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PARTICIPANTS, DELETE_PARTICIPANT } from 'queries'
import { LABEL } from 'translation'
import ParticipantItem from 'components/ParticipantItem'
import { ConfirmDeleteDialog } from 'components/Modal'
import useToggle from 'hooks/useToggle'


const ParticipantManagement = (props) => {
  const toggle = useToggle()
  const { data, loading, error } = useQuery(GET_PARTICIPANTS)
  const [deleteParticipant, ] = useMutation(DELETE_PARTICIPANT)

  const onDeleteParticipant = (id) => {
    deleteParticipant({ variables: { id: 1 }})
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
        onDelete={() => toggle.setOn(true)}
      />
    )
  }

  const renderContent = () => {
    if (loading) return <div>Loading ...</div>
    if (error) return <div>Error Here</div>
    if (!data) return <div>No Participants</div>

    return (
      <>
        <TableContainer component={Container}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <PanelIconHeader /><Typography>{LABEL.participant_header}</Typography>
          </AccordionSummary>
          <ParticipantAccordionDetails>
            {data.participant && data.participant.length > 0 && (
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
                  {data.participant.map(renderParticipantItem)}
                </TableBody>
              </Table>
            )}

            <AddParticipantButton variant='outlined'>
              Add participant
          </AddParticipantButton>
          </ParticipantAccordionDetails>
        </TableContainer>
        <SaveButton color='primary' variant='contained'>
          Save and Continues
        </SaveButton>

        {toggle.on && (
          <ConfirmDeleteDialog 
            title='Confirm delete' 
            body='Do you want to delete this participant' 
            visible={true}
            onClose={() => toggle.setOn(false)}
            onDelete={onDeleteParticipant}
          />
        )}
      </>
    )
  }

  return renderContent()
}

export default ParticipantManagement