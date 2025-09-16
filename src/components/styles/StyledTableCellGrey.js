import TableCell from '@mui/material/TableCell'
import { useTheme } from '@mui/material/styles'

export default function StyledTableCellGrey(props) {
  const theme = useTheme()

  const backgroundColor = theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#eee'

  return <TableCell sx={{ backgroundColor }} {...props} />
}
