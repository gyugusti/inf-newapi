import { useEffect, useRef, useState } from 'react'

import { Checkbox, Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@/@core/components/mui/TextField'

import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'

const AlamatTambah = prop => {
  const dispatch = useDispatch()
  const sifatRef = useRef()

  const ikk = prop.ikk

  const [selectedRows, setSelectedRows] = useState([])

  // const [inputs, setInputs] = useState(alamat)
  const [alamats, setAlamats] = useState(prop.alamat)

  const handleRowCheckboxChange = rowId => {
    const selectedIndex = selectedRows.indexOf(rowId)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, rowId)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1))
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1))
    }

    // Update selected rows state
    setSelectedRows(newSelected)
  }

  // Function to handle checkbox click
  const handleCheckboxClick = (event, rowId) => {
    event.stopPropagation() // Prevent row selection when checkbox is clicked
    handleRowCheckboxChange(rowId)
  }

  const handleInputChange = (alamat_id, e) => {
    const selectedValue = e.target.value

    const updatedAlamat = alamats.map(item => {
      if (item.alamat_id === alamat_id) {
        return { ...item, sifat: selectedValue }
      }

      return item
    })

    setAlamats(updatedAlamat)
  }

  return (
    <>
      {alamats.map((item, index) => {
        const { alamat_id, fas_id, nama, alamat, kode_pos, telp, jadwal_akhir, jadwal_draft, temuan, sifat } = item

        // eslint-disable-next-lie react-hooks/rules-of-hooks

        return (
          <TableRow key={index}>
            <TableCell scope='row'>
              {index + 1} .{nama} - {alamat} , {kode_pos}, {telp}
            </TableCell>
            <TableCell>
              SRP : {alamat_id} <br /> IZIN : {fas_id}
            </TableCell>
            <TableCell>
              {jadwal_akhir?.kode_area} <br />
              {jadwal_akhir?.tgl_mulai} - {jadwal_akhir?.tgl_akhir}
            </TableCell>
            <TableCell>
              {jadwal_draft?.kode_area} <br />
              {jadwal_draft?.tgl_mulai} - {jadwal_draft?.tgl_akhir}
            </TableCell>
            <TableCell>
              {temuan.length > 0 ? (
                temuan.map((temu, index) => <div key={index}>{temu.kode_temuan}</div>)
              ) : (
                <i>Temuan tidak ada </i>
              )}
            </TableCell>
            <TableCell>{ikk?.nilai_total}</TableCell>
            <TableCell>
              <input type='hidden' name='fas_id' id={`fas${alamat_id}`} value={fas_id} />
              <input type='hidden' defaultValue='1' id={`sifat${alamat_id}`} name='sifat' value={sifat} />
              <CustomTextField
                fullWidth
                select
                label=''
                defaultValue='1'
                onChange={e => handleInputChange(alamat_id, e)}
              >
                <MenuItem value='1'>Berkala</MenuItem>
                <MenuItem value='2'>Verifikasi Perizinan</MenuItem>
                <MenuItem value='3'>Sewaktu-waktu</MenuItem>
              </CustomTextField>
            </TableCell>
            <TableCell padding='checkbox'>
              <Checkbox
                className='row'
                name='pilih'
                value={alamat_id}
                checked={selectedRows.includes(alamat_id)}
                onChange={e => handleCheckboxClick(e, alamat_id)}
              />
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}

export default AlamatTambah
