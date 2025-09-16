// FloatingDialogActions.jsx
import { DialogActions, useTheme } from '@mui/material'

export default function FloatingDialogActions({ children, sx = {} }) {
  const theme = useTheme()

  return (
    <DialogActions
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        justifyContent: 'center',
        py: 2,
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        ...sx // allow override
      }}
    >
      {children}
    </DialogActions>
  )
}
