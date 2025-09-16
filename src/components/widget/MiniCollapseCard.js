import { useState } from 'react'

import { Card, CardHeader, CardContent, Collapse, IconButton } from '@mui/material'
import { Icon } from '@iconify/react'

const MiniCollapseCard = ({ title, children, defaultExpanded = true }) => {
  const [expanded, setExpanded] = useState(defaultExpanded)

  const handleToggle = () => setExpanded(!expanded)

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: 'subtitle2', fontWeight: 600 }}
        action={
          <IconButton onClick={handleToggle}>
            <Icon icon={expanded ? 'tabler:chevron-up' : 'tabler:chevron-down'} />
          </IconButton>
        }
        sx={{ px: 3, py: 2 }}
      />
      <Collapse in={expanded}>
        <CardContent sx={{ pt: 1, px: 3, pb: 2 }}>{children}</CardContent>
      </Collapse>
    </Card>
  )
}

export default MiniCollapseCard
