// MUI Imports
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

const TablePaginationComponent = ({ total, per_page, current_page, onPageChange }) => {
  const totalPages = Math.ceil(total / per_page) // Hitung jumlah halaman

  const startEntry = total === 0 ? 0 : (current_page - 1) * per_page + 1
  const endEntry = Math.min(current_page * per_page, total)

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>{`Showing ${startEntry} to ${endEntry} of ${total} entries`}</Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={totalPages}
        page={current_page}
        onChange={(_, page) => onPageChange(page)} // Gunakan callback agar fleksibel
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
