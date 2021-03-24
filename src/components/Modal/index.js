import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'

import { DialogTitle } from './styles'

export const ConfirmDeleteDialog = ({
  title,
  body,
  onDelete,
  onClose,
  visible
}) => {
  return (
    <Dialog onClose={onClose} open={visible} maxWidth='lg'>
      <DialogTitle disableTypography>
        <Typography variant='h6'>{title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <MuiDialogContent dividers>
        <Typography gutterBottom>
          {body}
        </Typography>
      </MuiDialogContent>
      <MuiDialogActions>
        <Button autoFocus onClick={onDelete} color='primary'>
          Confirm
        </Button>
      </MuiDialogActions>
    </Dialog>
  )
}
