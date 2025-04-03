import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/system'

import { Question } from '../types/questions'
import { fetchQuestions } from '../api/fetchQuestions'
import SomethingWentWrong from '../components/SomethingWentWrong'

const CustomAccordion = styled(Accordion)({
  boxShadow: 'none',
  width: '100%'
})
const CustomAccordionSummary = styled(AccordionSummary)({ padding: 0 })
const CustomAccordionDetails = styled(AccordionDetails)({ padding: 0 })

export default function BrowseQuestions() {
  const [data, setData] = useState<Question[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchQuestions()
      .then(setData)
      .catch((error) => {
        console.error('Помилка завантаження:', error)
        setError(error.message)
      })
  }, [])

  return error ? (
    <SomethingWentWrong details={error} />
  ) : (
    <Box sx={{ padding: '8px 24px' }}>
      <List>
        {data.map((data, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: '8px',
              paddingTop: '8px',
              border: '1px solid',
              borderRadius: '12px',
              borderColor: 'primary.main'
            }}
          >
            <ListItem>
              <ListItemIcon sx={{ minWidth: '24px' }}>
                <Typography>{data.id}.</Typography>
              </ListItemIcon>

              <ListItemIcon title="Was used" sx={{ minWidth: '32px' }}>
                <CheckCircleOutlineIcon
                  sx={{
                    color: data.used ? 'success.main' : 'error.main'
                  }}
                />
              </ListItemIcon>

              <ListItemIcon title="Can be reused" sx={{ minWidth: '32px' }}>
                <PublishedWithChangesIcon
                  sx={{
                    color: data.reused ? 'success.main' : 'error.main'
                  }}
                />
              </ListItemIcon>

              <Stack direction="row" spacing={1}>
                {data.topics.map((topic, index) => (
                  <Chip
                    key={index}
                    label={topic}
                    sx={{
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText'
                    }}
                  />
                ))}
              </Stack>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={data.mainText}
                secondary={data.additionalText}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <CustomAccordion slotProps={{ heading: { component: 'h5' } }}>
                <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontSize: '14px' }} component="span">
                    Question mechanics
                  </Typography>
                </CustomAccordionSummary>
                <CustomAccordionDetails>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ paddingBottom: '8px' }}
                  >
                    {data.mechanics.map((mechanic, index) => (
                      <Chip key={index} label={mechanic} />
                    ))}
                  </Stack>
                </CustomAccordionDetails>
              </CustomAccordion>
            </ListItem>

            {data.quizzes !== null && (
              <div>
                <Divider />

                <ListItem>
                  <CustomAccordion slotProps={{ heading: { component: 'h5' } }}>
                    <CustomAccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontSize: '14px' }} component="span">
                        Quizzes
                      </Typography>
                    </CustomAccordionSummary>
                    <CustomAccordionDetails>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ paddingBottom: '8px' }}
                      >
                        {data.quizzes?.map((quiz, index) => (
                          <Chip key={index} label={quiz} />
                        ))}
                      </Stack>
                    </CustomAccordionDetails>
                  </CustomAccordion>
                </ListItem>
              </div>
            )}
          </Box>
        ))}
      </List>
    </Box>
  )
}
