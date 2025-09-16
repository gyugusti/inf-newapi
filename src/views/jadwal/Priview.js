// ** MUI Imports
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell from '@mui/material/TableCell'

// ** Configs
import themeConfig from '@/configs/themeConfig'

const MUITableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  '&:not(:last-child)': {
    paddingRight: `${theme.spacing(2)} !important`
  }
}))

const CalcWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const Preview = ({ detail }) => {
  // ** Hook
  const theme = useTheme()

  if (detail) {
    return (
      <Card>
        <CardContent sx={{ p: [`${theme.spacing(2)} !important`, `${theme.spacing(2)} !important`] }}>
          <TableContainer>
            <Table>
              <TableBody
                sx={{
                  '& .MuiTableCell-root': {
                    py: `${theme.spacing(2.5)} !important`,
                    fontSize: theme.typography.body1.fontSize
                  }
                }}
              >
                <TableRow>
                  <TableCell>Kode Area</TableCell>
                  <TableCell>{detail.kode_area}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Propinsi</TableCell>
                  <TableCell>{detail.propinsi?.nama}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tanggal Pelaksanaan</TableCell>
                  <TableCell>
                    {detail.tgl_mulai} s/d {detail.tgl_akhir} , {detail.hari} Hari
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jumlah Hari</TableCell>
                  <TableCell> {detail.hari} Hari</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Kontak</TableCell>
                  <TableCell>
                    {detail.nama_kontak} Telp. {detail.telp_kontak}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bidang</TableCell>
                  <TableCell>{detail.bidang?.nama}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status Jadwal </TableCell>
                  <TableCell>{detail.status?.nama}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

export default Preview
