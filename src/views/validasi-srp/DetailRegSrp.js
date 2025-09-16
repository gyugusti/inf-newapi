import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material'
import Grid from '@mui/material/Grid2'

const DetailRegSrp = ({ detailRegsrp }) => {
  return (
    <>
      {Number(detailRegsrp.jenis_sumber_id) === 2 && (
        <Grid container>
          <Grid item='true' xl={12} md={6} xs={12} sm={12} paddingRight={2}>
            <h5>Detail Unit Sumber Radiasi Pengion</h5>
            <Table size='small' sx={{ border: '1px solid #ccc', borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  {[
                    'Merk',
                    'Tipe',
                    'No Seri',
                    'Tahun Produksi',
                    'Pabrikan',
                    'Aktivitas / Tanggal Aktivitas / Satuan'
                  ].map((label, idx) => (
                    <TableCell key={idx} sx={{ border: '1px solid #ccc', fontWeight: 'bold' }}>
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.merk_sumber?.nama}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.tipe}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.no_seri}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.tahun_produksi}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.pabrikan}</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc' }}>
                    {detailRegsrp.aktivitas}, {detailRegsrp.tgl_aktivitas}, {detailRegsrp.satuan_aktivitas?.nama_satuan}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )}

      {Number(detailRegsrp.jenis_sumber_id) === 1 && (
        <>
          <h5>Detail Tabung Sumber Radiasi Pengion</h5>
          <Table sx={{ border: '1px solid #ccc', borderCollapse: 'collapse' }}>
            <TableHead>
              <TableRow>
                {[
                  'Merk',
                  'Tipe',
                  'No Seri',
                  'Tahun Produksi',
                  'Pabrikan',
                  'Tipe Tabung',
                  'No Seri Tabung',
                  'Merk Tabung',
                  'Kv',
                  'Ma'
                ].map((label, idx) => (
                  <TableCell key={idx} sx={{ border: '1px solid #ccc', fontWeight: 'bold' }}>
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.merk_sumber?.nama}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.tipe}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.no_seri}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.tahun_produksi}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.pabrikan}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.tipe_tabung}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.no_seri_tabung}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>{detailRegsrp.tabung?.nama}</TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>
                  {detailRegsrp.kv}, {detailRegsrp.satuan_kv?.nama_satuan}
                </TableCell>
                <TableCell sx={{ border: '1px solid #ccc' }}>
                  {detailRegsrp.ma}, {detailRegsrp.satuan_ma?.nama_satuan}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      )}
    </>
  )
}

export default DetailRegSrp
