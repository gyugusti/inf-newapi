import OptionMenu from '@/@core/components/option-menu'

const ActionsColumn = ({ row, handleShowDokumen, handleShowLog, view = 'registrasi' }) => {
  const { reg_srp_id, tahap_reg_id, fas_id, flag_valid, no_reg, no_seri } = row.original

  const iconButtonProps = { size: 'medium' }
  const iconClassName = 'text-textSecondary'

  const getLogOption = () => ({
    text: 'Log Proses',
    icon: 'tabler-timeline',
    menuItemProps: { onClick: () => handleShowLog(reg_srp_id, fas_id) }
  })

  if (view === 'registrasi') {
    return (
      <div className='flex items-center'>
        <OptionMenu
          iconButtonProps={{ size: 'medium' }}
          iconClassName='text-textSecondary'
          options={[getLogOption()]}
        />
      </div>
    )
  }

  return null
}

export default ActionsColumn
