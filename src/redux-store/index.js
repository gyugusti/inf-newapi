// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

import ikk from './admin-referensi/ikk'
import inkf from './admin-referensi/inkf'
import kategoriJenjang from './admin-referensi/kategori-jenjang'
import kelKegiatan from './admin-referensi/kelompok-kegiatan'
import lkfJenisTabel from './admin-referensi/lkf-jenis-tabel'
import syaratItem from './admin-referensi/syarat-item'
import tabel from './admin-referensi/tabel-setting'
import temuan from './admin-referensi/temuan'
import akun from './admin-user'
import authUser from './auth'
import counting from './counting'
import dataInspeksi from './data-inspeksi'
import dataUmum from './data-umum'
import fihi from './fihi'
import dataFihi from './fihi/dataFihi'
import jadwal from './jadwal'
import jadwalFas from './jadwal-fas'
import jadwalKoor from './jadwal-koord'
import lhi from './lhi'
import dataLhi from './lhi/dataLhi'
import lkf from './lkf'
import dataLkf from './lkf/dataLkf'
import pdf from './pdf'
import refbalis from './referensi-balis'
import refInfara from './referensi-infara'
import sbi from './sbi'
import validasiData from './validasi-data'

export const store = configureStore({
  reducer: {
    authUser,
    kelKegiatan,
    kategoriJenjang,
    refbalis,
    refInfara,
    lkfJenisTabel,
    syaratItem,
    inkf,
    temuan,
    ikk,
    tabel,
    jadwal,
    jadwalKoor,
    jadwalFas,
    akun,
    sbi,
    lkf,
    dataLkf,
    pdf,
    fihi,
    dataFihi,
    lhi,
    dataLhi,
    dataInspeksi,
    dataUmum,
    validasiData,
    counting
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})
