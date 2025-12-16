import { Fragment, useEffect, useState } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js'
import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '@/components/Loading'
import CustomDialog from '@/components/widget/CustomDialog'
import { downloadDokfile, setNamadoc } from '@/redux-store/pdf'
import { dokumenRegSumber } from '@/redux-store/validasi-data'
import FormAddSrpdoc from './FormAddSrpdoc'

const DocRegistSrp = ({ fasId, regsrpId, open, handleClose, inlineMode = false }) => {
  const dispatch = useDispatch()
  const [isModal2Open, setIsModal2Open] = useState(false) // Control state for Modal2

  const { isLoading, listDokumenSrp, tahap_reg_id } = useSelector(store => store.validasiData)
  const safeHandleClose = handleClose || (() => {})

  useEffect(() => {
    if (regsrpId) {
      dispatch(dokumenRegSumber(regsrpId))
    }
  }, [dispatch, regsrpId])

  const handleModal2Open = () => setIsModal2Open(true) // Open Modal2

  const handleModal2Close = () => {
    setIsModal2Open(false)
    safeHandleClose(true)
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

  const Content = () =>
    isLoading ? (
      <Loading />
    ) : (
      <Fragment>
        <Button variant='tonal' color='error' size='small' onClick={handleModal2Open} sx={{ mb: 2 }}>
          <Icon icon='tabler:rotate-rectangle' fontSize={15} />
          Tambah Dokumen Baru
        </Button>

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
                                      onClick={() => handleClickDownload(doc.data_dok.dok_file_id, doc.data_dok.nama_file)}
                                    >
                                      <Icon icon='tabler:download' fontSize={20} />
                                    </IconButton>
                                    <label htmlFor='' fontSize={1}>
                                      {doc.data_dok.nama_file}
                                    </label>
                                  </>
                                )}
                              </div>
                            ))
                          : 'Tidak ada dokumen'}
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    )

  return (
    <Fragment>
      {inlineMode ? (
        <Box
          sx={{
            borderRadius: 3,
            border: '1px solid #e7eaf2',
            boxShadow: '0px 4px 12px rgba(15, 23, 42, 0.06)',
            backgroundColor: '#fbfcff',
            p: 3
          }}
        >
          <Content />
        </Box>
      ) : (
        <CustomDialog
          open={open && !isModal2Open} // Show Modal1 only if Modal2 is not open
          handleClose={handleClose}
          title='Data Dokumen Registrasi Sumber'
          maxWidth='lg'
        >
          <Content />
        </CustomDialog>
      )}

      <FormAddSrpdoc
        open={isModal2Open}
        handleClose={handleModal2Close}
        regsrpId={regsrpId}
        fasId={fasId}
        edit={false}
      />
    </Fragment>
  )
}

export default DocRegistSrp
