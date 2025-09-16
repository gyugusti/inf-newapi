import React from 'react'

import Link from 'next/link'

import { emphasize, styled } from '@mui/material/styles'
import { Breadcrumbs, Typography, Icon } from '@mui/material'

const CustomBreadcrumb = ({ breadcrumbs }) => {
  return (
    <Breadcrumbs aria-label='breadcrumb' separator='›' style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Link underline='hover' color='inherit' href='/'>
        <Icon fontSize='1.2rem' icon='tabler:home' />
        Home
      </Link>
      {breadcrumbs.map((breadcrumb, index) => (
        <Typography key={index} color='textPrimary'>
          {index === breadcrumbs.length - 1 ? (
            <span>{breadcrumb.name}</span>
          ) : (
            <Link underline='hover' color='inherit' href={breadcrumb.path}>
              {breadcrumb.name}
            </Link>
          )}
        </Typography>
      ))}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumb
