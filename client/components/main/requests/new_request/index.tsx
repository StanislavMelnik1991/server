import { Button, Paper, TextField } from '@mui/material'
import { useState } from 'react'
import Controller from '../../../../pages/api/index'

export const NewRequest = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  return (
    <Paper sx={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
      <Paper variant='outlined' sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
          label='Заголовок'
          value={title}
          onChange={(ev) => {
            setTitle(ev.currentTarget.value)
          }}
          type={'text'}
          required={true}
        />
        <TextField
          label='Текст'
          value={message}
          type={'text'}
          required={true}
          onChange={(ev) => {
            setMessage(ev.currentTarget.value)
          }}
        />
        <Button
          variant='contained'
          onClick={() => {
            Controller.createUserRequest({ message, title })
          }}
        >
          {'Отправить'}
        </Button>
      </Paper>
    </Paper>
  )
}