import React from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const Loading = () => {
  return (
    <Box sx={{ mt: 11, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <CircularProgress sx={{ mb: 4 }} />
      <Typography>Loading...</Typography>
    </Box>
  )
}

export default Loading
