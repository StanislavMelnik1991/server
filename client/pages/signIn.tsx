
import { MainHead } from '../components/head/head'
import { Header } from '../components/header'
import { Footer } from '../components/footer/indext'
import { Button, Paper, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import Controller from './api/index'
import { useRouter } from 'next/router'

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter()
  
  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    setToken(localToken);
  }, [])
  return (
    <>
      <MainHead
        title='Войти'
      />
      <Header token={token} clear={setToken}/>
      <Paper sx={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center' }}>
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
            onClick={() => {
              const serverToken = Controller.loginUser({ email, password })
              serverToken.then(()=>{
                router.push('/', undefined, {shallow: true})
              })
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
