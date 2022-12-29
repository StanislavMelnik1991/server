import { MainHead } from '../components/head/head'
import { Header } from '../components/header'
import { Footer } from '../components/footer/indext'
import { AppBar, Paper, Tab, Tabs, Typography } from '@mui/material'
import { SyntheticEvent, useEffect, useState } from 'react'
import { News } from '../components/main/news'
import { Requests } from '../components/main/requests'
import { Responses } from '../components/main/responses'
import { AboutUs } from '../components/main/about_us'
import { Contacts } from '../components/main/contacts'
import { ROLE } from '../constants/user.constants'



export default function Home() {
  const [value, setValue] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<ROLE>(ROLE.USER);
  useEffect(() => {
    const localToken = window.localStorage.getItem('token');
    const serverRole = window.localStorage.getItem('role');
    console.log(localToken)
    console.log(serverRole)
    setToken(localToken);
    if (serverRole === ROLE.ADMIN) {
      setRole(serverRole)
    }

  }, [])

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <MainHead
        title='ЖЭС-Обращения'
      />
      <Header token={token} clear={setToken} />
      <Paper variant='outlined'>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Новости" wrapped />
            <Tab label="Отправить обращение" disabled={!token} />
            <Tab label="Ответы" disabled={role !== ROLE.ADMIN} />
            <Tab label="О нас" />
            <Tab label="Контакты" />
          </Tabs>
        </AppBar>
        {value === 0 && <News />}
        {value === 1 && <Requests />}
        {value === 2 && <Responses />}
        {value === 3 && <AboutUs />}
        {value === 4 && <Contacts />}

      </Paper>
      <Footer />
    </>
  )
}
