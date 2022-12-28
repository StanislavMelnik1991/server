import { AppBar, Paper, Tab, Tabs, Typography } from '@mui/material'
import { SyntheticEvent, useEffect, useState } from 'react'
import { MyRequests } from './my_requests';
import { NewRequest } from './new_request';

export const Requests = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Paper>
      <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Новое обращение" wrapped />
            <Tab label="Мои обращения" />
          </Tabs>
        </AppBar>
        {value === 0 && <NewRequest />}
        {value === 1 && <MyRequests />}
    </Paper>
  )
}