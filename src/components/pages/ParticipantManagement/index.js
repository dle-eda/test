// @flow
import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

import Typography from 'components/Typography'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Table from 'components/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from 'components/TextField'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import IconButton from '@material-ui/core/IconButton'
import Autocomplete from 'components/Autocomplete'
import PhoneNumber from 'components/PhoneNumber'

import { Container, AddParticipantButton, ParticipantAccordionDetails, PanelIconHeader, SaveButton } from './styles'

const PARTICIPANTS = gql`
  query GetParticipants {
    participant2 {
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

const GROUPS = gql`
  query GetGroups {
    groups {
      id
      name
    }
  }
`

const ParticipantManagement = (props) => {
  const { title } = props
  const { data = {} } = useQuery(PARTICIPANTS)
  const { data: dataGroup = {} } = useQuery(GROUPS)


  useEffect(() => {
    if (!!data.participant2) {
      console.error('data2', data, dataGroup.groups)
    }
  }, [data, dataGroup])

  const renderParticipantItem = ({
    id,
    email,
    phoneNumber,
    phoneCountry,
    firstName,
    lastName,
    group
  }) => {
    return (
      <TableRow key={id}>
        <TableCell component="th" scope="row">
          <TextField defaultValue={email} />
        </TableCell>
        <TableCell><PhoneNumber defaultCountry={phoneCountry} defaultValue={phoneNumber}/></TableCell>
        <TableCell><TextField defaultValue={firstName} /></TableCell>
        <TableCell><TextField defaultValue={lastName} /></TableCell>
        <TableCell>
          <Autocomplete
            options={dataGroup.groups}
            inputValue={group}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} variant="outlined" />}
          />
        </TableCell>
        <TableCell>
          <IconButton aria-label="delete" size='medium'>
            <RemoveCircleOutlineIcon style={{ color: 'red', width: '16px', height: '16px' }} />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <>
      <TableContainer component={Container}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <PanelIconHeader /><Typography>{title}</Typography>
        </AccordionSummary>
        <ParticipantAccordionDetails>
          {data.participants && data.participants.length > 0 && (
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
                {data.participants.map(renderParticipantItem)}
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
    </>
  )
}

export default ParticipantManagement