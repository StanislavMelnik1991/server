import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import styles from '../../styles/components/Header.module.css'


import { Home } from '@mui/icons-material/';
import { Dispatch, SetStateAction } from 'react';

export const Header = ({ token, clear }: { token: string | null, clear: Dispatch<SetStateAction<string | null>> }) => {
  return (
    <AppBar position={'static'} color={'default'}>
      <Toolbar disableGutters={true} className={styles.toolbar}>
        <IconButton color='primary' href='/'>
          <Home
            fontSize='large'
          />
          <div>
            <Typography variant={'h1'} fontSize={'1.5rem'}>
              {'«ЖЭС-обращения»'}
            </Typography>
            <Typography variant={'h3'} fontSize={'0.8rem'}>
              {'Платформа для подачи обращений'}
            </Typography>
          </div>
        </IconButton>
        <Toolbar>
          {!token && <Button href='/signIn'>{'Войти'}</Button>}
          {!token && <Button href='/signUp'>{'Регистрация'}</Button>}
          {!!token && <Button onClick={() => {
            window.localStorage.clear();
            clear(null);
          }}>{'Выйти'}</Button>}
        </Toolbar>
      </Toolbar>
    </AppBar>
  )
}