import OptionMenu from '@/@core/components/option-menu'

const ActionsColumn = ({
  row,
  handleShowDokumen,
  handleShowLog,
  handleShowDispo,
  handleKirimClick,
  handleKirimOtorisator,
  handleDeleteClick,
  handleSelesai,
  handleKembalikan,
  handleTolak, // Menambahkan handleTolak agar tidak error
  view = 'registrasi'
}) => {
  const { reg_srp_id, tahap_reg_id, fas_id, flag_valid, no_reg, no_seri } = row.original

  const iconButtonProps = { size: 'medium' }
  const iconClassName = 'text-textSecondary'


  // Fungsi untuk menampilkan opsi "Dokumen" agar tidak berulang
  const getDokumenOption = () => ({
    text: 'Dokumen',
    icon: 'tabler-copy',
    menuItemProps: { onClick: () => handleShowDokumen(reg_srp_id, fas_id) }
  })

  const getLogOption = () => ({
    text: 'Log Proses',
    icon: 'tabler-timeline',
    menuItemProps: { onClick: () => handleShowLog(reg_srp_id, fas_id) }
  })

  const getDispoOption = () => ({
    text: 'Disposisi',
    icon: 'tabler-arrow-iteration',
    menuItemProps: { onClick: () => handleShowDispo(reg_srp_id, row.original) }
  })

  if (view === 'registrasi') {
    return (
      <div className='flex items-center'>
        <OptionMenu
          iconButtonProps={{ size: 'medium' }}
          iconClassName='text-textSecondary'
          options={
            tahap_reg_id > 0
              ? [getDokumenOption(), getLogOption()]
              : [
                  {
                    text: 'Kirim Validator',
                    icon: 'tabler-send',
                    menuItemProps: { onClick: () => handleKirimClick(reg_srp_id) }
                  },
                  {
                    text: 'Delete',
                    icon: 'tabler-trash',
                    menuItemProps: { onClick: () => handleDeleteClick(reg_srp_id) }
                  },
                  {
                    text: 'Update',
                    icon: 'tabler-edit',
                    href: {
                      pathname: `/inspektur/registrasi-srp/form-registrasi`,
                      query: { id: reg_srp_id, ...row.original }
                    },
                    linkProps: { className: 'flex items-center gap-2 is-full plb-2 pli-4' }
                  },
                  getDokumenOption(),
                  getLogOption()
                ]
          }
        />
      </div>
    )
  }

  if (view === 'validator') {
    const options = [
      {
        text: 'Detail Validasi',
        icon: 'tabler-eye',
        href: `/validasi-srp/${reg_srp_id}`,
        linkProps: { className: 'flex items-center gap-2 is-full plb-2 pli-4' }
      },
      getDokumenOption(),
      getLogOption()
    ]

    if (tahap_reg_id === 1) {
      options.unshift({
        text: 'Kirim Otorisator',
        icon: 'tabler-send',
        menuItemProps: { onClick: () => handleKirimOtorisator(reg_srp_id) }
      })
    }

    return <OptionMenu iconButtonProps={iconButtonProps} iconClassName={iconClassName} options={options} />
  }

  if (view === 'koordinator') {
    const options = [
      {
        text: 'Detail Validasi',
        icon: 'tabler-eye',
        href: `/validasi-srp/${reg_srp_id}`,
        linkProps: { className: 'flex items-center gap-2 is-full plb-2 pli-4' }
      },
      getLogOption()
    ]

    if (tahap_reg_id === 2) {
      options.unshift({
        text: 'Kembalikan',
        icon: 'tabler-rewind-backward-10',
        menuItemProps: { onClick: () => handleKembalikan(reg_srp_id) }
      })

      if (flag_valid === -1) {
        options.unshift({ text: 'Tolak', icon: 'tabler-x', menuItemProps: { onClick: () => handleTolak(reg_srp_id) } })
      } else {
        options.unshift({
          text: 'Selesai',
          icon: 'tabler-check',
          menuItemProps: { onClick: () => handleSelesai(reg_srp_id) }
        })
      }
    }

    return <OptionMenu iconButtonProps={{ size: 'medium' }} iconClassName='text-textSecondary' options={options} />
  }

  if (view === 'disposisi') {
    const options = [getDispoOption(), getLogOption()]

    return <OptionMenu iconButtonProps={{ size: 'medium' }} iconClassName='text-textSecondary' options={options} />
  }

  return null
}

export default ActionsColumn
