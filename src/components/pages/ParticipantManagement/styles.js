import styled from 'styled-components'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Accordion from 'components/Accordion'
import Button from 'components/Button'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

export const Container = styled(Accordion)`
  &&.MuiAccordion-root.Mui-expanded:first-child {
    margin: 0;
  }
  &{
    border-radius: 8px;
  }
`

export const AddParticipantButton = styled(Button)`
  margin-top: 20px;
  width: 160px
`

export const SaveButton = styled(Button)`
  && {
    margin-top: 20px;
  }
`

export const ParticipantAccordionDetails = styled(AccordionDetails)`
  flex-direction: column;
`

export const PanelIconHeader = styled(MailOutlineIcon)`
  &{
    margin-right: 10px;
  }
`
export const EmptyList = styled.tr`
  margin-top: 6px;
`