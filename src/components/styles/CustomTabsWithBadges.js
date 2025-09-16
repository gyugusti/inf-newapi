import { Tabs, Paper, useTheme } from '@mui/material'

export default function CustomTabsWithBadges({ value, onChange, children, ...rest }) {
  const theme = useTheme()

  return (
    <Paper elevation={1} sx={{ px: 2, py: 1, borderRadius: 2, mb: 2 }}>
      <Tabs
        value={value}
        onChange={onChange}
        variant='scrollable'
        scrollButtons='auto'
        {...rest}
        sx={{
          borderBottom: 'none', // Hapus border bawah
          '& .MuiTabs-indicator': { display: 'none' }, // Hilangkan garis indicator
          '& .MuiTab-root': {
            minHeight: 40,
            minWidth: 140,
            textTransform: 'none',
            fontWeight: 500,
            color: theme.palette.text.secondary,
            borderRadius: 2,
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText
            }
          }
        }}
      >
        {children}
      </Tabs>
    </Paper>
  )
}
