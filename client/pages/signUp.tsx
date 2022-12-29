
import { MainHead } from '../components/head/head'
import { Header } from '../components/header'
import { Footer } from '../components/footer/indext'
import { Button, Paper, TextField } from '@mui/material'
import Controller from './api/index'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Home from '.'

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter()

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
      <Header token={token} clear={setToken} />
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
            label='Имя'
            value={name}
            onChange={(ev) => {
              setName(ev.currentTarget.value)
            }}
            type={'text'}
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
          <TextField
            label='Повторите пароль'
            value={password2}
            type={'password'}
            required={true}
            onChange={(ev) => {
              setPassword2(ev.currentTarget.value)
            }}
          />
          <Button
            variant='contained'
            onClick={() => {
              if (password === password2) {
                const serverToken = Controller.createUser({ email, name, password })
                serverToken.then(()=>{
                  router.push('/', undefined, {shallow: true})
                })
              }
            }}>
            {'Регистрация'}
          </Button>
        </Paper>
      </Paper>
      <Footer />
    </>
  )
}
