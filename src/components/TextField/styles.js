import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'

const StyledTextField = styled(TextField)`
  .MuiInput-underline:before {
    border-bottom: none;
  }
`

export default StyledTextField