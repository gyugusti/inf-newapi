import React from 'react'

const LabelStatus = ({ id }) => {
  switch (id) {
    case 1:
      return <strong style={{ color: 'green' }}>Disetujui</strong>

    default:
      return <strong style={{ color: 'blue' }}>Menunggu Persetujuan</strong>
  }
}

export default LabelStatus
