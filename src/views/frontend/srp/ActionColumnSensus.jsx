import OptionMenu from '@/@core/components/option-menu'

const ActionColumnSensus = ({
  row,
  handleShowDokumen,
  handleShowLog,
  handleKirimClick,
  handleDeleteClick,
  view = 'registrasi'
}) => {
  const { reg_srp_id, tahap_reg_id, fas_id, flag_valid, no_reg, no_seri } = row.original

  const iconButtonProps = { size: 'medium' }
  const iconClassName = 'text-textSecondary'

  const getLogOption = () => ({
    text: 'Log Proses',
    icon: 'tabler-timeline',
    menuItemProps: { onClick: () => handleShowLog(reg_srp_id, fas_id) }
  })

  const getDokumenOption = () => ({
    text: 'Dokumen',
    icon: 'tabler-copy',
    menuItemProps: { onClick: () => handleShowDokumen(reg_srp_id, fas_id) }
  })

  const getKirimOption = () => ({
    text: 'Kirim Validator',
    icon: 'tabler-send',
    menuItemProps: { onClick: () => handleKirimClick(reg_srp_id) }
  })

  const getDeleteOption = () => ({
    text: 'Delete',
    icon: 'tabler-trash',
    menuItemProps: { onClick: () => handleDeleteClick(reg_srp_id) }
  })

  return (
    <div className='flex items-center'>
      <OptionMenu
        iconButtonProps={{ size: 'medium' }}
        iconClassName='text-textSecondary'
        options={[
          getLogOption(),
          getKirimOption(),
          getDeleteOption(),
          {
            text: 'Update',
            icon: 'tabler-edit',
            href: {
              pathname: `/frontend/srp-sensus/update/${reg_srp_id}`,
              query: { id: reg_srp_id, ...row.original }
            },
            linkProps: { className: 'flex items-center gap-2 is-full plb-2 pli-4' }
          },
          getDokumenOption()
        ]}
      />
    </div>
  )
}

export default ActionColumnSensus
