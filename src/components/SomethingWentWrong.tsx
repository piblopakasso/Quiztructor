import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/system'

const TypographyPrimary = styled(Typography)({
  padding: '24px 0 24px 0',
  fontSize: '32px'
})
const TypographySecondary = styled(Typography)(({ theme }) => ({
  paddingTop: '4px',
  fontSize: '16px',
  color: theme.palette.text.secondary
}))

export default function SomethingWentWrong({ details }: { details: string }) {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  return (
    <Container>
      <TypographyPrimary>Sorry, something went wrong :(</TypographyPrimary>
      <TypographySecondary>
        Please refresh the page or try later
      </TypographySecondary>
      <TypographySecondary
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'even-between',
          cursor: 'pointer',
          '&:hover': {
            color: 'warning.light'
          }
        }}
      >
        Details
        <ExpandMoreIcon
          sx={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        />
      </TypographySecondary>
      <Collapse in={open}>
        <TypographySecondary>Error: {details}</TypographySecondary>
      </Collapse>
    </Container>
  )
}
