import { AppBar, Paper, Tab, Tabs, Typography } from '@mui/material'
import { SyntheticEvent, useEffect, useState } from 'react'
import Controller from '../../../pages/api/index'
import { RequestDto, UsersForAdminDto } from '../../../types/server.dto';

export const Responses = () => {
  const [userValue, setUserValue] = useState(0);
  const [requestValue, setRequestValue] = useState(0);
  const [users, setUsers] = useState<UsersForAdminDto[]>([])
  const [user, setUser] = useState<UsersForAdminDto>()
  const [requests, setRequests] = useState<RequestDto[]>([])
  const handleChangeUser = async (event: SyntheticEvent, newValue: number) => {
    setUser(users[newValue])
    const userRequests = await Controller.getAllActiveRequestsForUser(users[newValue].id)
    setRequests(userRequests)
    setUserValue(newValue);
  };
  const handleChangeRequest = (event: SyntheticEvent, newValue: number) => {
    setRequestValue(newValue);
  };
  useEffect(() => {
    Controller.getAllUsers().then((users) => {
      setUsers(users)
      if (users.length) {
        Controller.getAllActiveRequestsForUser(users[0].id).then((req) => {
          setRequests(req)
        })

      }
    })
  }, [])
  return (
    <Paper sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', maxHeight: '80vh' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={userValue}
        onChange={handleChangeUser}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {users.map((el) => {
          return (
            <Tab key={el.id} label={el.name} />
          )
        })}
      </Tabs>
      <Paper sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', maxHeight: '80vh' }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
          value={requestValue}
          onChange={handleChangeRequest}
        >
          {requests.map((req) => {
            return (
              <Tab label={req.title} key={req.id} />
            )
          })}
        </Tabs>
        <Paper sx={{ padding: '1rem', width: '100%' }}>
          <Typography variant='body1'>
            {'asd'}
          </Typography>
        </Paper>
      </Paper>
    </Paper>
  )
}