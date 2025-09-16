import React, { useState , useEffect } from 'react'

import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Button, IconButton } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch, useSelector } from 'react-redux'

import Loading from '@/components/Loading'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { StyledTableRow, StyledTableCell } from '@/components/styles/StyledTable'
import FormPenilaianIkk from './form/FormPenilaianIkk'

const PenilaianIkk = ({ action, dataLhi, ikk }) => {
  const inkf = dataLhi.inkf
  const [ikkInkf, setIkkInkf] = useState(ikk)
  const [inkfId, setInkfId] = useState(false)
  const [nilaiTotal, setNilaiTotal] = useState(0)
  const [nilaiIkk, setNilaiIkk] = useState(0)

  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)

  const [dataForm, setDataForm] = useState()

  const handleModalOpen = id => {
    setInkfId(id)
    setOpen(true)
  }

  const handleModalEdit = (id, data) => {
    setInkfId(id)
    setOpen(true)
    setEdit(true)
    setDataForm(data)
  }

  const handleModalClose = () => {
    setOpen(false)
    setEdit(false)
    setDataForm('')
  }

  useEffect(() => {
    let total = 0

    inkf.forEach(item => {
      setNilaiIkk(1)

      if (item.ikkNilai) {
        const sum = (item.ikkNilai.nilai * item.bobot) / 100

        total += sum
      } else {
        setNilaiIkk(0)
      }
    })
    setNilaiTotal(total)
  }, [inkf])

  useEffect(() => {
    const itemIkk = ikk.filter(rows => rows.inkf_id === inkfId)

    setIkkInkf(itemIkk)
  }, [inkfId, ikk])

  if (!inkf || inkf == '') {
    return <Loading />
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component='th'>NO</StyledTableCell>
              <StyledTableCell>IKF </StyledTableCell>
              <StyledTableCell>Bobot </StyledTableCell>
              <StyledTableCell>Ikk Nilai</StyledTableCell>
              <StyledTableCell>Nilai </StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {inkf.map((item, index) => {
              return (
                <TableRow key={index}>
                  <StyledTableCell scope='row'>{index + 1}</StyledTableCell>
                  <StyledTableCell>{item.nama}</StyledTableCell>
                  <StyledTableCell>{item.bobot} %</StyledTableCell>
                  <StyledTableCell>{item.ikkNilai?.nilai} </StyledTableCell>
                  <StyledTableCell>{item.ikkNilai.nilai && (item.ikkNilai.nilai * item.bobot) / 100}</StyledTableCell>
                  <StyledTableCell>
                    {item.ikkNilai.ikk_nilai_id ? (
                      <IconButton color='primary' onClick={() => handleModalEdit(item.inkf_id, item.ikkNilai)}>
                        <Icon icon='tabler:edit' fontSize={20} />
                      </IconButton>
                    ) : (
                      <IconButton color='primary' onClick={() => handleModalOpen()}>
                        <Icon icon='tabler:plus' fontSize={20} />
                      </IconButton>
                    )}
                  </StyledTableCell>
                </TableRow>
              )
            })}
            <StyledTableRow>
              <StyledTableCell colSpan={6}>
                <b> Nilai ikk total : {nilaiTotal} </b>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {open && (
        <FormPenilaianIkk ikk={ikkInkf} data={dataForm} open={open} handleClose={handleModalClose} edit={edit} />
      )}
    </>
  )
}

export default PenilaianIkk
