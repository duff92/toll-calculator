import { styled } from '@mui/material/styles'
import React from 'react'

const StyledSkipLink = styled('a')(({ theme }) => ({
  position: 'absolute',
  left: '-999px',
  width: '1px',
  height: '1px',
  top: 'auto',
  overflow: 'hidden',
  zIndex: theme.zIndex.appBar + 1,

  '&:focus, &:active': {
    left: '0',
    top: '0',
    width: 'auto',
    height: 'auto',
    overflow: 'visible',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 600,
    margin: 10,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    textDecoration: 'none',
    display: 'block',
  },
}))

const SkipLink: React.FC = () => {
  return (
    <StyledSkipLink href="#main-content">
      Skip to main content
    </StyledSkipLink>
  )
}

export default SkipLink
