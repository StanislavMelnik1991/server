import { AppBar, Typography } from '@mui/material'
import styles from '../../styles/components/Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <AppBar position={'static'}>
        <Typography variant='h2' fontSize={'1.5rem'}>
        {'"ЖЭС - обращения" © 2022.'}
        </Typography>
      </AppBar>      
    </footer>
  )
}