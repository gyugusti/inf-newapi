import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import {
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  Pagination,
  Grid,
  TextField,
  MenuItem,
  Paper,
  IconButton
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import { Icon } from '@iconify/react/dist/iconify.js'

import CustomDialog from '@/components/widget/CustomDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import FormDokumentasi from './form/FormDokumentasi'
import { StyledTableCell } from '@/components/styles/StyledTable'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { deleteLhiDok, getDokumenlhi, setNamadoc, setTab } from '@/redux-store/lhi'
import { getLhiDok } from '@/redux-store/lhi/dataLhi'
import Loading from '@/components/Loading'

const Dokumentasi = ({ dataLhi }) => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [dataId, setDataId] = useState()
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)

  const handleClose = () => setOpen(false)

  const handleFormOpen = () => {
    setDataForm(dataLhi)
    setOpen(true)
  }

  const handleFormClose = () => setOpen(false)

  const handleDeleteClick = data => {
    setDataId(data.id)
    setShowConfirmationDel(true)
  }

  const { dataLhidok } = useSelector(store => store.lhi)

  const handleClickDownload = (id, nama) => {
    dispatch(setNamadoc(nama))
    dispatch(getDokumenlhi(id))
  }

  if (!dataLhi.dokumen || dataLhi.dokumen == '') {
    return <Loading />
  }

  return (
    <>
      <Grid>
        <Button variant='contained' size='medium' onClick={() => handleFormOpen()}>
          <Icon icon='tabler:upload' /> upload dokumen
        </Button>
      </Grid>
      <Grid>
        <Box>
          {dataLhi.dokumen &&
            dataLhi.dokumen.map((item, index) => {
              return (
                <div key={index}>
                  <StyledTableCell scope='row'>{index + 1}</StyledTableCell>
                  <StyledTableCell>{item.judul_dokumen} </StyledTableCell>
                  <StyledTableCell>
                    <IconButton color='primary' onClick={() => handleClickDownload(item.id, item.judul_dokumen)}>
                      <Icon icon='tabler:arrow-down-circle' fontSize={20} />
                    </IconButton>
                    <IconButton color='primary' onClick={() => handleDeleteClick(item)}>
                      <Icon icon='tabler:trash' fontSize={20} />
                    </IconButton>
                  </StyledTableCell>
                </div>
              )
            })}
        </Box>
      </Grid>
      {open && <FormDokumentasi data={dataForm} open={open} handleClose={handleFormClose} />}

      <KonfirmasiDialog
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        Id={dataId}
        onConfirm={dataId => {
          if (dataId !== 'no') {
            dispatch(deleteLhiDok({ id: dataId }))
            dispatch(setTab(dataId))
          }

          setShowConfirmationDel(false)
        }}
        message='Data Ini akan dihapus'
      />
    </>
  )
}

export default Dokumentasi
