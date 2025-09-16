export const getUniqueValues = (data, type) => {
  let unique = data.map(item => item[type])

  if (type === 'colors') {
    unique = unique.flat()
  }

  return [...new Set(unique)]
}

export const stringLimit = (string, limit) => {
  return string.substring(0, limit)
}

export const formatDates = (tglAwal, tglAkhir) => {
  const awal_dd = tglAwal.substring(8, 10)
  const awal_mm = tglAwal.substring(5, 7)
  const awal_yyyy = tglAwal.substring(0, 4)

  const akhir_dd = tglAkhir.substring(8, 10)
  const akhir_mm = tglAkhir.substring(5, 7)
  const akhir_yyyy = tglAkhir.substring(0, 4)

  if (tglAwal === tglAkhir) {
    return fullDay(tglAwal)
  } else {
    if (awal_yyyy === akhir_yyyy) {
      if (awal_mm === akhir_mm) {
        return `${awal_dd} - ${fullDay(tglAkhir)}`
      } else {
        return `${fullDay(tglAwal).slice(0, -4)} s.d ${fullDay(tglAkhir)}`
      }
    } else {
      return `${fullDay(tglAwal)} s.d ${fullDay(tglAkhir)}`
    }
  }
}

export const fullDay = date => {
  // for example:
  const day = date.substring(8, 10)
  const month = date.substring(5, 7)
  const year = date.substring(0, 4)

  return `${day} ${getMonthName(month)} ${year}`
}

export const fullDayTime = dateStr => {
  if (!dateStr || dateStr === '0000-00-00 00:00:00') return 'Invalid Date'

  const dateObj = new Date(dateStr)

  if (isNaN(dateObj)) return 'Invalid Date'

  const day = String(dateObj.getDate()).padStart(2, '0')
  const month = getMonthName(String(dateObj.getMonth() + 1).padStart(2, '0'))
  const year = dateObj.getFullYear()
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')

  return `${day} ${month} ${year}, ${hours}:${minutes}`
}

const getMonthName = month => {
  // for example:
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  return months[month - 1]
}
