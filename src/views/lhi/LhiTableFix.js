import { TABLE_IDS } from '@/configs/lkfConfig'
import SrpIzin from './tabel-fix/SrpIzin'
import Pekerja from './tabel-fix/Pekerja'
import Kesehatan from './tabel-fix/Kesehatan'
import PaparanSrp from './tabel-fix/PaparanSrp'
import DokumenRekaman from './tabel-fix/DokumenRekaman'
import Tld from './tabel-fix/Tld'
import SrpTanpaizin from './tabel-fix/SrpTanpaizin'

const COMPONENTS_MAP = {
  [TABLE_IDS.SRP_IZIN]: SrpIzin,
  [TABLE_IDS.PEKERJA]: Pekerja,
  [TABLE_IDS.KESEHATAN]: Kesehatan,
  [TABLE_IDS.SRP_PAPARAN]: PaparanSrp,
  [TABLE_IDS.DOKUMEN_REKAMAN]: DokumenRekaman,
  [TABLE_IDS.TLD]: Tld,
  [TABLE_IDS.SRP_NO_IZIN]: SrpTanpaizin
}

const LhiTableFix = ({ data, dataLhi, action }) => {
  const Component = COMPONENTS_MAP[data.jenis_tabel_id] || null

  return Component ? <Component data={data} action={action} detailLhi={dataLhi} /> : null
}

export default LhiTableFix
