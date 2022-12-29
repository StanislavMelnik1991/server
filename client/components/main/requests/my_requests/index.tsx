import { AppBar, Paper, Tab, Tabs, Typography } from '@mui/material'
import { SyntheticEvent, useEffect, useState } from 'react'
import Controller from '../../../../pages/api/index'
import { ShortRequestDto } from '../../../../types/server.dto'

export const MyRequests = () => {
  const [userRequests, setUserRequests] = useState<Array<ShortRequestDto>>([])
  const [message, setMessage] = useState<string>('')
  const [value, setValue] = useState(0);
  const [horizontalValue, setHorizontalValue] = useState(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [id, setId] = useState(0)
  const handleChange = async (ev: SyntheticEvent, newValue: number) => {
    const newId = userRequests[newValue].id
    setId(newId)
    switch (horizontalValue) {
      case 0:
        const req = await Controller.getUserRequest(newId)
        setMessage(req.message)
        setIsDone(req.isDone)
        break;
      case 1:

        break
      default:
        break;
    }
    setValue(newValue);
    setHorizontalValue(0);
  };
  const horizontalValueHandleChange = async (ev: SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 0:
        const req = await Controller.getUserRequest(id)
        setMessage(req.message)
        setIsDone(req.isDone)
        break;
      case 1:
        const res = await Controller.getUserResponse(id)
        setMessage(res.message)
        break
      default:
        break;
    }
    setHorizontalValue(newValue);
  };

  useEffect(() => {
    const newReq = Controller.getAllUserRequests()
    newReq.then((res) => {
      setUserRequests(res.requests)
      if (res.requests.length) {
        setId(res.requests[0].id)
        Controller.getUserRequest(res.requests[0].id).then((ev) => {
          setMessage(ev.message)
          setIsDone(ev.isDone)
        })
      }
    })
  },
    [])

  return (
    <Paper sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', maxHeight: '80vh' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {userRequests.map((el) => {
          return (
            <Tab key={el.id} label={el.title} />
          )
        })}
      </Tabs>
      <Paper sx={{ width: '100%' }} variant={'elevation'}>
        <Tabs
          value={horizontalValue}
          onChange={horizontalValueHandleChange}
          centered
        >
          <Tab label={'Текст обращения'} />
          <Tab label={'Ответ'} disabled={!isDone} />
        </Tabs>
        <Paper sx={{ height: '100%', padding: '1rem' }}>
          <Typography variant='body1'>
            {message}
          </Typography>
        </Paper>
      </Paper>
    </Paper>
  )
}