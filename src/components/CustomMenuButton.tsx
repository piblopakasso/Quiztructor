import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import Box from '@mui/material/Box'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface CustomMenuButtonProps extends ButtonProps {
  opened: boolean
  selectedOption: string | null
  options: string[]
}

export default function CustomMenuButton({
  opened,
  children,
  selectedOption,
  options,
  ...buttonProps
}: CustomMenuButtonProps) {
  const highlightFoldingMenu = (array: string[]) => {
    return array.includes(selectedOption ?? '')
      ? 'secondary.main'
      : 'transparent'
  }

  return (
    <Button
      sx={{
        gap: 1,
        backgroundColor: opened ? 'primary.dark' : 'primary.main',
        '&:hover': {
          backgroundColor: 'primary.dark'
        },
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottom: '2px solid',
        borderBottomColor: () => highlightFoldingMenu(options)
      }}
      variant="contained"
      size="large"
      disableElevation
      endIcon={
        <Box
          sx={{
            display: 'flex',
            transition: 'transform 0.3s ease',
            transform: opened ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <KeyboardArrowDownIcon />
        </Box>
      }
      {...buttonProps}
    >
      {children}
    </Button>
  )
}
