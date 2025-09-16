import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { textAlign } from '@mui/system'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.light,
    border: `1px solid ${theme.palette.divider}`,
    textAlign: 'center'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: `1px solid ${theme.palette.divider}`,
    borderColor: 'grey.500'
  }
}))

const TableCellNoRow = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    border: `0px`
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    border: `0px`
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  }
}))

export { StyledTableCell, TableCellNoRow, StyledTableRow }
