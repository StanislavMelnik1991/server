import { AppBar, Paper, Tab, Tabs, Typography } from '@mui/material'
import { SyntheticEvent, useEffect, useState } from 'react'
import Controller from '../../../../pages/api/index'

export const MyRequests = () => {
  const [userRequests, setUserRequests] = useState<Array<any>>([])
  useEffect(() => {
    const newReq = Controller.getAllUserRequests()
    newReq.then((res) => {
      setUserRequests(res.requests)
    })
  },
    [])

  return (
    <Paper>
      {userRequests.map((el) => {
        return (
          <Typography variant='h4' key={el.id}>{el.title}</Typography>
        )
      })}
    </Paper>
  )
}