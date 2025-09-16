import { useState } from 'react'

import Modal from '@/views/admin-referensi/Modal'

const useModalForm = initialData => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState(initialData || {})

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSave = updatedData => {
    setData(updatedData)
    handleClose()
  }

  return {
    isOpen,
    data,
    handleOpen,
    handleClose,
    handleSave
  }
}

export default useModalForm
