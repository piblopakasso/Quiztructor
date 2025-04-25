import React, { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import SomethingWentWrong from '../components/SomethingWentWrong'

type Topic = {
  name: string
  count: number
}

export default function AddNewTopic() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [newTopic, setNewTopic] = useState('')
  const [inputError, setInputError] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/topics')
      .then((res) => res.json())
      .then(setTopics)
      .catch((err) => {
        console.error(err)
        setFetchError('Не вдалося завантажити список тем')
      })
  }, [])

  useEffect(() => {
    const trimmed = newTopic.trim()

    if (
      topics.some((topic) => topic.name.toLowerCase() === trimmed.toLowerCase())
    ) {
      setInputError('Тема вже існує')
    } else {
      setInputError(null)
    }
  }, [newTopic, topics])

  const handleAdd = async () => {
    if (inputError) return

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newTopic.trim(), count: 0 })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Помилка при збереженні')
      }

      setTopics((prev) => [...prev, { name: newTopic.trim(), count: 0 }])
      setNewTopic('')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setInputError(err.message)
      } else {
        setInputError('Невідома помилка')
      }
    } finally {
      setLoading(false)
    }
  }

  if (fetchError) {
    return <SomethingWentWrong details={fetchError} />
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ padding: '24px 32px' }}
      onSubmit={async (e) => {
        e.preventDefault()
        await handleAdd()
      }}
    >
      <Box>
        <Box sx={{ maxHeight: '72px', paddingBottom: '32px' }}>
          <TextField
            label="Enter new topic"
            variant="outlined"
            size="small"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            error={!!inputError}
            helperText={inputError}
          />
          <Button
            variant="contained"
            disabled={!!inputError || loading}
            onClick={handleAdd}
            sx={{ height: '40px', marginLeft: '8px' }}
          >
            <Typography sx={{ fontSize: '14px' }}>Add</Typography>
          </Button>
        </Box>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {topics.map((topic, index) => (
          <Chip
            key={index}
            label={`${topic.name} ${topic.count}`}
            sx={{
              backgroundColor:
                topic.name === newTopic.trim() ? 'error.main' : 'primary.light',
              color: 'primary.contrastText',
              marginBottom: '8px'
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}
