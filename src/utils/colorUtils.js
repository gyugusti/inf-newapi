export const WARNA_HIJAU = 'green'

export const WARNA_KUNING = 'yellow'

export const WARNA_MERAH = 'red'

export function warnaStriker(nilai) {
  if (nilai >= 70 && nilai <= 100) {
    return WARNA_HIJAU
  } else if (nilai >= 50 && nilai < 70) {
    return WARNA_KUNING
  } else {
    return WARNA_MERAH
  }
}
