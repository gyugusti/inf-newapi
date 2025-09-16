// ** MUI Imports
import Pagination from '@mui/material/Pagination'

const PaginationCustom = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize)

  if (pagesCount === 1) return null
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)

  return (
    <div className='demo-space-y'>
      <Pagination count={pagesCount} page={currentPage} onChange={onPageChange} />
    </div>
  )
}

export default PaginationCustom
