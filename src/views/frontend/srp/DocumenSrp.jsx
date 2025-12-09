import { Fragment, useEffect, useState } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '@/components/Loading'
import CustomDialog from '@/components/widget/CustomDialog'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { downloadDokfile, setNamadoc } from '@/redux-store/pdf'
import { deleteDocReg, dokumenRegSumber } from '@/redux-store/validasi-data'
import FormDokumen from './FormDokumen'

const DocumenSrp = ({ fasId, regsrpId, open, handleClose }) => {
  const dispatch = useDispatch()
  const [isModal2Open, setIsModal2Open] = useState(false) // Control state for Modal2
  const [jenis, setJenis] = useState()
  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const { isLoading, tab, listDokumenSrp, tahap_reg_id } = useSelector(store => store.validasiData)

  useEffect(() => {
    if (regsrpId) {
      dispatch(dokumenRegSumber(regsrpId))
    }
  }, [dispatch, regsrpId, tab])

  const handleModal2Open = jenisval => {
    setIsModal2Open(true)
    setJenis(jenisval)
  }

  const handleModal2Close = () => {
    setIsModal2Open(false)
  }

  const handleModal2Success = () => {
    setIsModal2Open(false)
    dispatch(dokumenRegSumber(regsrpId))
  }

  const handleClickDownload = (id, nama) => {
    dispatch(setNamadoc(nama))
    dispatch(downloadDokfile(id)).then(result => {
      if (downloadDokfile.fulfilled.match(result)) {
        const blob = result.payload
        const fileUrl = URL.createObjectURL(blob)

        // Buka file di tab baru
        const newWindow = window.open()

        if (newWindow) {
          newWindow.document.write(`<iframe src="${fileUrl}" width="100%" height="100%" style="border:none;"></iframe>`)
        } else {
          alert('Popup blocked. Please allow popups for this site.')
        }

        // Optional: revoke URL setelah beberapa saat
        setTimeout(() => {
          URL.revokeObjectURL(fileUrl)
        }, 10000)
      } else {
        alert('Gagal mengunduh file.')
      }
    })
  }

  const handleDeleteClick = data => {
    setDataId(data.id)
    setShowConfirmationDel(true)
  }

  return (
    <Fragment>
      <CustomDialog
        open={open && !isModal2Open} // Show Modal1 only if Modal2 is not open
        handleClose={handleClose}
        title='Data Dokumen Registrasi Sumber'
        maxWidth='lg'
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell component='th'>NO</TableCell>
                    <TableCell>Jenis Dokumen </TableCell>
                    <TableCell>Nama</TableCell>
                    <TableCell>Registrasi Dokumen</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDokumenSrp &&
                    listDokumenSrp.map((item, index) => {
                      const jenisDokumen =
                        item.jenis_dokumen_id === 1
                          ? 'Foto SRP'
                          : item.jenis_dokumen_id === 2
                            ? 'Sertifikat'
                            : 'Lainnya' // Default jika ada jenis lain

                      return (
                        <TableRow key={index}>
                          <TableCell scope='row'>{index + 1}</TableCell>
                          <TableCell>{jenisDokumen}</TableCell>
                          <TableCell>{item.nama}</TableCell>
                          <TableCell>
                            {item.reg_doc.length > 0
                              ? item.reg_doc.map((doc, idx) => (
                                  <div key={idx}>
                                    {doc.data_dok && (
                                      <>
                                        <IconButton
                                          color='primary'
                                          onClick={() =>
                                            handleClickDownload(doc.data_dok.dok_file_id, doc.data_dok.nama_file)
                                          }
                                        >
                                          <Icon icon='tabler:download' fontSize={20} />
                                        </IconButton>
                                        <label htmlFor='' fontSize={1}>
                                          {doc.data_dok.nama_file}
                                        </label>
                                        <IconButton color='warning' onClick={() => handleDeleteClick(doc)}>
                                          <Icon icon='tabler:trash' fontSize={20} />
                                        </IconButton>
                                      </>
                                    )}
                                  </div>
                                ))
                              : 'Tidak ada dokumen'}

                            <IconButton
                              variant='tonal'
                              aria-label='Tambah Dokumen'
                              color='success'
                              onClick={() => handleModal2Open(item.jenis_dokumen_id)}
                            >
                              <Icon icon='tabler:circle-plus' />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Fragment>
        )}
      </CustomDialog>

      <FormDokumen
        open={isModal2Open}
        jenis={jenis}
        handleClose={handleModal2Close}
        regsrpId={regsrpId}
        fasId={fasId}
        edit={false}
        onSuccess={handleModal2Success}
      />

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          if (dataId !== 'no') {
            dispatch(deleteDocReg({ id: dataId }))
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </Fragment>
  )
}

export default DocumenSrp
