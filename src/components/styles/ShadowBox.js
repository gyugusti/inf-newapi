import { Box } from '@mui/material'

const ShadowBox = ({ children, style, sx }) => {
  return (
    <Box
      sx={{
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: { xs: 2, md: 4 },
        overflow: 'hidden',
        whiteSpace: 'normal',
        borderRadius: 2,
        backgroundColor: 'background.paper',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx // Menggabungkan prop sx dari luar
      }}
      style={style} // Menerapkan prop style dari luar
    >
      {children}
    </Box>
  )
}

export default ShadowBox
