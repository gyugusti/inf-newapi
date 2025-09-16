import React from 'react'

const HasilEvaluasiCetak = ({ hasilEvaId }) => {
  if (hasilEvaId === 1) {
    return <strong style={{ color: 'green' }}>Lengkap</strong>
  } else if (hasilEvaId === 2) {
    return <strong style={{ color: 'red' }}>Tidak Lengkap</strong>
  } else {
    return <strong style={{ color: 'blue' }}>Belum dievaluasi</strong>
  }
}

export default HasilEvaluasiCetak
