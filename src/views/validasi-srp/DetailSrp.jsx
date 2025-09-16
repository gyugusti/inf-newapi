'use client'

import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import ShadowBox from '@/components/styles/ShadowBox'

const DetailSrp = ({ detailRegsrp = {}, assign = null, dense = false }) => {
  const cellPad = dense ? 0.5 : 1

  const TableShell = ({ children, title }) => (
    <ShadowBox sx={{ mt: 0, p: dense ? 2 : 3 }}>
      <h5>{title}</h5>
      <Table
        size='small'
        sx={{
          '& th, & td': { py: cellPad, px: 1.25 },
          '& thead th:first-of-type': { width: 180 }
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell component='th'>Field</TableCell>
            <TableCell>Nilai</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </ShadowBox>
  )

  const MasterBox = () => (
    <ShadowBox sx={{ mt: dense ? 1 : 2, p: dense ? 2 : 3 }}>
      <h5>Data Master Sumber Ter-Assign</h5>
      <Table
        size='small'
        sx={{
          '& th, & td': { py: cellPad, px: 1.25 },
          '& thead th:first-of-type': { width: 180 }
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell component='th'>Field</TableCell>
            <TableCell>Nilai</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component='th'>Kode Sumber</TableCell>
            <TableCell>
              {detailRegsrp.master_sumber && detailRegsrp.master_sumber.master_sumber_id?.toString().padStart(7, '0')}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th'>Master ID</TableCell>
            <TableCell>{detailRegsrp.master_sumber?.master_id ?? '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th'>Merk</TableCell>
            <TableCell>{detailRegsrp.master_sumber?.nama ?? '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th'>Tipe</TableCell>
            <TableCell>{detailRegsrp.master_sumber?.tipe ?? '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th'>No Seri</TableCell>
            <TableCell>{detailRegsrp.master_sumber?.no_seri ?? '-'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ShadowBox>
  )

  const jenis = Number(detailRegsrp?.jenis_sumber_id)

  return (
    <>
      {jenis === 2 && (
        <>
          <TableShell title='Detail Unit Sumber Radiasi Pengion'>
            <TableRow>
              <TableCell component='th'>Merk</TableCell>
              <TableCell>{detailRegsrp.merk_sumber?.nama ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Tipe</TableCell>
              <TableCell>{detailRegsrp.tipe ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>No Seri</TableCell>
              <TableCell>{detailRegsrp.no_seri ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Tahun Produksi</TableCell>
              <TableCell>{detailRegsrp.tahun_produksi ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Pabrikan</TableCell>
              <TableCell>{detailRegsrp.pabrikan ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Sifat</TableCell>
              <TableCell>{detailRegsrp.sifat ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Bentuk</TableCell>
              <TableCell>{detailRegsrp.bentuk ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Aktivitas / Tgl Aktivitas / Satuan</TableCell>
              <TableCell>
                {detailRegsrp.aktivitas ?? '-'}, {detailRegsrp.tgl_aktivitas ?? '-'},{' '}
                {detailRegsrp.satuan_aktivitas?.nama_satuan ?? '-'}
              </TableCell>
            </TableRow>
          </TableShell>

          {assign && <MasterBox />}
        </>
      )}

      {jenis === 1 && (
        <>
          <TableShell title='Detail Tabung Sumber Radiasi Pengion'>
            <TableRow>
              <TableCell component='th'>Tipe Tabung</TableCell>
              <TableCell>{detailRegsrp.tipe_tabung ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>No Seri Tabung</TableCell>
              <TableCell>{detailRegsrp.no_seri_tabung ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Merk Tabung</TableCell>
              <TableCell>{detailRegsrp.tabung?.nama ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Kv</TableCell>
              <TableCell>
                {detailRegsrp.kv ?? '-'}, {detailRegsrp.satuan_kv?.nama_satuan ?? '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Ma</TableCell>
              <TableCell>
                {detailRegsrp.ma ?? '-'}, {detailRegsrp.satuan_ma?.nama_satuan ?? '-'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Sifat</TableCell>
              <TableCell>{detailRegsrp.sifat ?? '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component='th'>Bentuk</TableCell>
              <TableCell>{detailRegsrp.bentuk ?? '-'}</TableCell>
            </TableRow>
          </TableShell>

          {assign && <MasterBox />}
        </>
      )}
    </>
  )
}

export default DetailSrp
