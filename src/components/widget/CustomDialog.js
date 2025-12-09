import React from 'react'

import { Dialog, DialogContent, DialogTitle, DialogActions, Fade, IconButton, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Icon } from '@iconify/react/dist/iconify.js'

const CustomDialog = ({ open, handleClose, title, children, actions, maxWidth, titleAction }) => {
  const CustomCloseButton = styled(IconButton)(({ theme }) => ({
    top: 0,
    right: 0,
    color: 'grey.500',
    position: 'absolute',
    boxShadow: theme.shadows[2],
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.background.paper} !important`,
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
      transform: 'translate(7px, -5px)'
    }
  }))

  return (
    <Dialog
      fullWidth
      open={open}
      scroll='body'
      maxWidth={maxWidth}
      onClose={() => {
        console.log('CustomDialog handleClose triggered')
        handleClose() // Ensuring handleClose is triggered
      }}
      PaperProps={{
        style: { overflow: 'visible' } // Allow overflow to position the close button outside the dialog's content area
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2, pr: theme => theme.spacing(6) }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>{title}</Box>
        {titleAction}
        <CustomCloseButton onClick={handleClose}>
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </CustomCloseButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  )
}

export default CustomDialog
