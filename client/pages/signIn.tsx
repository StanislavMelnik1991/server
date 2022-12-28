
import { MainHead } from '../components/head/head'
import { Header } from '../components/header'
import { Footer } from '../components/footer/indext'
import { Button, Paper, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import Controller from './api/index'

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    console.log(localToken)
    setToken(localToken);
  }, [])
  return (
    <>
      <MainHead
        title='Войти'
      />
      <Header token={token} clear={setToken}/>
      <Paper sx={{ width: '100%', minHeight: '50vh', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
        <Paper variant='outlined' sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <TextField
            label='email'
            value={email}
            onChange={(ev) => {
              setEmail(ev.currentTarget.value)
            }}
            type={'email'}
            required={true}
          />
          <TextField
            label='Пароль'
            value={password}
            type={'password'}
            required={true}
            onChange={(ev) => {
              setPassword(ev.currentTarget.value)
            }}
          />
          <Button
            variant='contained'
            href='/'
            onClick={() => {
              Controller.loginUser({ email, password })
            }}
          >
            {'Войти'}
          </Button>
        </Paper>
      </Paper>
      <Footer />
    </>
  )
}
