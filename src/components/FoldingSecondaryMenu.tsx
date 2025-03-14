import React from 'react'
import { Link as RouterLink } from 'react-router'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function FoldingSecondaryMenu({
  selected,
  handleClick,
  open,
  path,
  menuItems
}: {
  selected: string | null
  handleClick: (item: string) => void
  open: boolean
  path: string
  menuItems: string[]
}) {
  const createPath = (text: string) => {
    return text.toLowerCase().replace(' ', '_')
  }

  return (
    <Collapse in={open}>
      <Box
        sx={{
          gap: 1,
          padding: '6px 24px',
          backgroundColor: 'primary.light'
        }}
      >
        {menuItems.map((item, index) => (
          <Button
            key={index}
            sx={{
              borderBottom: '2px solid',
              borderRadius: 0,
              borderBottomColor:
                selected === item ? 'secondary.main' : 'transparent',
              padding: '6px 14px',
              marginLeft: '8px',
              color: '#fff'
            }}
            onClick={() => {
              handleClick(item)
            }}
            component={RouterLink}
            to={`${path}/${createPath(item)}`}
          >
            {item}
          </Button>
        ))}
      </Box>
    </Collapse>
  )
}
