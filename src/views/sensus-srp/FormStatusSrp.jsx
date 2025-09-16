import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import CustomDialog from '@/components/widget/CustomDialog'
import Loading from '@/components/Loading'

const FormStatusSrp = ({ datasrp, regsrpId, open, handleClose }) => {

  const dispatch = useDispatch()
  
   const defaultValues = {
    validator_id: ''
  }

    const {
      control,
      handleSubmit,
      setValue,
      watch,
      formState: { errors }
    } = useForm({ defaultValues })
  
    const onSubmit = dataform => {
    }


  return (
    <Fragment>
      <CustomDialog
        open={open} // Show Modal1 only if Modal2 is not open
        handleClose={handleClose}
        title='Form Disposisi Sumber'
        maxWidth='xs'
      >
        {/* {isLoading ? (
          <Loading /> 
        ) : ( */}
          <Fragment>
            <form id='myForm' onSubmit={handleSubmit(onSubmit)}></form>
          </Fragment>
        {/* )} */}
      </CustomDialog>
    </Fragment>
  )
}

export default FormStatusSrp
