import React from 'react'

import { TABLE_IDS } from '@/configs/lkfConfig'
import SrpIzin from '../view-tabelfix/SrpIzin'
import Pekerja from '../view-tabelfix/Pekerja'
import Kesehatan from '../view-tabelfix/Kesehatan'
import PaparanSrp from '../view-tabelfix/PaparanSrp'
import DokumenRekaman from '../view-tabelfix/DokumenRekaman'
import Tld from '../view-tabelfix/Tld'
import SrpTanpaizin from '../view-tabelfix/SrpTanpaizin'

const COMPONENTS_MAP = {
  [TABLE_IDS.SRP_IZIN]: SrpIzin,
  [TABLE_IDS.PEKERJA]: Pekerja,
  [TABLE_IDS.KESEHATAN]: Kesehatan,
  [TABLE_IDS.SRP_PAPARAN]: PaparanSrp,
  [TABLE_IDS.DOKUMEN_REKAMAN]: DokumenRekaman,
  [TABLE_IDS.TLD]: Tld,
  [TABLE_IDS.SRP_NO_IZIN]: SrpTanpaizin
}

const ViewTabelFix = ({ data, detailLkf, action }) => {
  const Component = COMPONENTS_MAP[data.jenis_tabel_id] || null

  return Component ? <Component data={data} action={action} detailLkf={detailLkf} /> : null
}

export default ViewTabelFix
