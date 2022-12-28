import { Paper, Typography } from '@mui/material'

export const News = () => {
  return (
    <Paper>
      
      <Typography variant='h4'>
        {'Заголовок новости'}
      </Typography>
      <Typography variant='body1'>
        {'текст новости'}
      </Typography>
    </Paper>
  )
}