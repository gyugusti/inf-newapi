import OptionMenu from '@/@core/components/option-menu'

const ActionsColumnRegistrasi = ({ row, handleShowDokumen, handleShowLog, view = 'registrasi' }) => {
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

  return (
    <div className='flex items-center'>
      <OptionMenu
        iconButtonProps={{ size: 'medium' }}
        iconClassName='text-textSecondary'
        options={[
          getLogOption(),
          {
            text: 'Update',
            icon: 'tabler-edit',
            href: {
              pathname: `/frontend/srp-registrasi/update/${reg_srp_id}`,
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

export default ActionsColumnRegistrasi
