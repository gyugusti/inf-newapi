import { Tabs, Paper } from '@mui/material'

export default function CustomVerticalNav({ value, onChange, children, ...rest }) {
  return (
    <Paper elevation={1} sx={{ display: 'flex', height: '100%', borderRadius: 2 }}>
      <Tabs
        orientation='vertical' // <== Vertical
        value={value}
        onChange={onChange}
        variant='scrollable'
        scrollButtons='auto'
        {...rest}
        sx={{
          borderRight: '1px solid #e0e0e0', // Separator line kanan
          '& .MuiTabs-indicator': { display: 'none' }, // Remove indicator
          '& .MuiTab-root': {
            justifyContent: 'flex-start',
            alignItems: 'center',
            textAlign: 'left',
            minHeight: 48,
            textTransform: 'none',
            borderRadius: 1,
            fontWeight: 500,
            color: '#555',
            '&.Mui-selected': {
              backgroundColor: '#1976d2',
              color: '#fff'
            }
          }
        }}
      >
        {children}
      </Tabs>
    </Paper>
  )
}
