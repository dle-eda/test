// flow
import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TextField from 'components/TextField'
import Autocomplete from 'components/Autocomplete'
import PhoneNumber from 'components/PhoneNumber'
import { DeleteIcon } from './styles'

type ParticipantItemProps = {
  id: Number,
  email: String,
  phone: Number,
  first_name: String,
  last_name: String,
  group: String,
  onDelete: Function,
  onChange: Function
}

const ParticipantItem = ({
  id,
  email,
  phone,
  first_name,
  last_name,
  group,
  onDelete,
  onChange
}: ParticipantItemProps) => {

  const onDeleteHandler = () => {
    onDelete(id)
  }
  const onChangeTextInput = (value, key) => {
    onChange({ id, [key]: value, mutated: true })
  }
  
  const onChangeGroupHandler = (event) => {
    console.error('onChangeGroupHandler', event)
  }
  return (
    <TableRow key={id}>
      <TableCell component="th" scope="row">
        <TextField defaultValue={email} onChange={(event) => onChangeTextInput(event.target.value, 'email')}/>
      </TableCell>
      <TableCell><PhoneNumber value={phone} onChange={value => onChangeTextInput(value, 'phone')}/></TableCell>
      <TableCell><TextField defaultValue={first_name} onChange={(event) => onChangeTextInput(event.target.value, 'first_name')}/></TableCell>
      <TableCell><TextField defaultValue={last_name} onChange={(event) => onChangeTextInput(event.target.value, 'last_name')}/></TableCell>
      <TableCell>
        <Autocomplete
          options={[]}
          inputValue={group}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          onChange={onChangeGroupHandler}
        />
      </TableCell>
      <TableCell>
        <IconButton aria-label="delete" size='medium' onClick={onDeleteHandler}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
export default ParticipantItem