import styled from 'styled-components'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const DeleteIcon = styled(RemoveCircleOutlineIcon)`
  color: red;
  width: 16px;
  height: 16px;
`