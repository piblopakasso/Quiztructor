import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import InventoryIcon from '@mui/icons-material/Inventory'
import DesignServicesIcon from '@mui/icons-material/DesignServices'

import CustomMenuButton from './components/CustomMenuButton'
import FoldingSecondaryMenu from './components/FoldingSecondaryMenu'

const addOptions = ['New Question', 'New Topic', 'New Mechanic']
const browseOptions = ['Questions', 'Topics', 'Mechanics']

export default function Navbar() {
  const [openedMenu, setOpenedMenu] = useState<string | null>(null)
  const [selectedMenuOption, setSelectedMenuOption] = useState<string | null>(
    null
  )

  const toggleMenu = (menu: string | null) => {
    setOpenedMenu((prev) => (prev === menu ? null : menu))
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <Button
            sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            variant="contained"
            size="large"
            disableElevation
            component={RouterLink}
            to="/"
            onClick={() => {
              setSelectedMenuOption(null)
              setOpenedMenu(null)
            }}
          >
            LOGO
          </Button>
          <CustomMenuButton
            opened={openedMenu === 'add'}
            selectedOption={selectedMenuOption}
            options={addOptions}
            onClick={() => toggleMenu('add')}
          >
            <AddBoxIcon fontSize="small" />
            Add
          </CustomMenuButton>
          <CustomMenuButton
            opened={openedMenu === 'browse'}
            selectedOption={selectedMenuOption}
            options={browseOptions}
            onClick={() => toggleMenu('browse')}
          >
            <InventoryIcon fontSize="small" />
            Browse
          </CustomMenuButton>

          <Button
            sx={{
              gap: 1,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderBottom: '2px solid',
              borderBottomColor:
                selectedMenuOption === 'create'
                  ? 'secondary.main'
                  : 'transparent'
            }}
            variant="contained"
            size="large"
            disableElevation
            component={RouterLink}
            to="/create"
            onClick={() => {
              setSelectedMenuOption('create')
              setOpenedMenu(null)
            }}
          >
            <DesignServicesIcon fontSize="small" />
            Create
          </Button>
        </Toolbar>
      </AppBar>

      <FoldingSecondaryMenu
        selected={selectedMenuOption}
        handleClick={setSelectedMenuOption}
        open={openedMenu === 'add'}
        path={'add'}
        menuItems={addOptions}
      />
      <FoldingSecondaryMenu
        selected={selectedMenuOption}
        handleClick={setSelectedMenuOption}
        open={openedMenu === 'browse'}
        path={'browse'}
        menuItems={browseOptions}
      />
    </Box>
  )
}
