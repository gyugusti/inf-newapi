import React from 'react'

const StatusKonfirmasi = ({ konfirmasi }) => {
  switch (konfirmasi) {
    case 0:
      return <strong style={{ color: 'blue' }}>Belum di konfirmasi</strong>

    case 1:
      return <strong style={{ color: 'green' }}>Bersedia</strong>

    case 2:
      return <strong style={{ color: 'red' }}>Jadwal Ulang</strong>

    case 3:
      return <strong style={{ color: 'red' }}>Tidak ada kegiatan</strong>

    default:
      return <strong>-</strong>
  }
}

export default StatusKonfirmasi
