import { useEffect, useMemo } from 'react'

import { useTheme } from '@mui/material/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { useSession } from 'next-auth/react'

import { useDispatch, useSelector } from 'react-redux'

import fasilitasMenu from '@/data/navigation/fasilitasMenu'
import menuData from '@/data/navigation/menuData'
import { countRegistrasiSrpoto, countRegistrasiSrpval } from '@/redux-store/counting'
import themeConfig from '@configs/themeConfig'
import CustomChip from '@core/components/mui/Chip'
import { useSettings } from '@core/hooks/useSettings'
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import useVerticalNav from '@menu/hooks/useVerticalNav'
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'
import { Menu, MenuItem, MenuSection, SubMenu } from '@menu/vertical-menu'

// Utility function to check access based on roles
const hasAccess = (itemRoles, userRoles) => {
  if (!itemRoles || itemRoles.length === 0) return true

  return itemRoles.some(role => userRoles.includes(role))
}

// Recursive function to filter menu items based on roles
const filterMenuData = (menuData, userRoles) => {
  return menuData
    .filter(item => hasAccess(item.roles, userRoles))
    .map(item => {
      if (item.children) {
        const filteredChildren = filterMenuData(item.children, userRoles)

        return { ...item, children: filteredChildren }
      }

      return item
    })
}

// Inject CustomChip into menu items with matching IDs
const injectSuffix = item => {
  const { id, totalRegsrpval, totalRegsrpoto } = item

  if (id === 'validator' && totalRegsrpval > 0) {
    return {
      ...item,
      suffix: <CustomChip label={totalRegsrpval} size='small' color='error' round='true' />
    }
  }

  if (id === 'koordinator' && totalRegsrpoto > 0) {
    return {
      ...item,
      suffix: <CustomChip label={totalRegsrpoto} size='small' color='error' round='true' />
    }
  }

  return item
}

// Recursively inject suffix badges
const injectSuffixRecursively = (items, totalRegsrpval, totalRegsrpoto, userRoles) => {
  return items.map(item => {
    const itemWithCounts = { ...item, totalRegsrpval, totalRegsrpoto, userRoles }
    const itemWithSuffix = injectSuffix(itemWithCounts)

    if (itemWithSuffix.children) {
      return {
        ...itemWithSuffix,
        children: injectSuffixRecursively(itemWithSuffix.children, totalRegsrpval, totalRegsrpoto, userRoles)
      }
    }

    if (itemWithSuffix.section && itemWithSuffix.items) {
      return {
        ...itemWithSuffix,
        items: injectSuffixRecursively(itemWithSuffix.items, totalRegsrpval, totalRegsrpoto, userRoles)
      }
    }

    return itemWithSuffix
  })
}

const VerticalMenu = ({ scrollMenu }) => {
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { isBreakpointReached, transitionDuration } = verticalNavOptions
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const { data: session } = useSession()
  const userRoles = useMemo(() => session?.user?.roles || [], [session])
  const { updateSettings, settings } = useSettings()

  const dispatch = useDispatch()
  const { totalRegsrpval, totalRegsrpoto } = useSelector(store => store.counting)

  useEffect(() => {
    if (userRoles.length > 0) {
      // Check if the user has 'verifikator' role
      if (userRoles.includes('verifikator')) {
        dispatch(countRegistrasiSrpval(userRoles)) // Dispatch for 'verifikator'
      }

      if (userRoles.includes('koordinator')) {
        dispatch(countRegistrasiSrpoto(userRoles)) // Dispatch for 'koordinators'
      }
    }
  }, [dispatch, userRoles]) // Runs whenever userRoles change

  const hasPemohonRole = useMemo(
    () => userRoles.includes('pemohon_admin') || userRoles.includes('pemohon_tambahan'),
    [userRoles]
  )

  useEffect(() => {
    if (hasPemohonRole && settings.semiDark === false) {
      themeConfig.semiDark = true
      updateSettings({ semiDark: true })
    }
  }, [hasPemohonRole, settings.semiDark, updateSettings])

  const baseMenuData = hasPemohonRole ? fasilitasMenu : menuData
  const filteredMenuData = filterMenuData(baseMenuData, userRoles)
  const menuWithSuffix = injectSuffixRecursively(filteredMenuData, totalRegsrpval, totalRegsrpoto, userRoles)

  const renderMenuItems = menuItems => {
    return menuItems.map((item, index) => {
      const suffix = item.suffix
        ? typeof item.suffix === 'function'
          ? item.suffix(userRoles, totalRegsrpval, totalRegsrpoto)
          : item.suffix
        : null // Default to null if suffix doesn't exist

      if (item.children) {
        return (
          <SubMenu key={index} label={item.label} icon={item.icon} suffix={suffix}>
            {renderMenuItems(item.children)}
          </SubMenu>
        )
      } else if (item.section) {
        return (
          <MenuSection key={index} label={item.section}>
            {item.items.map((subItem, subIndex) => (
              <MenuItem
                key={subIndex}
                href={subItem.href}
                icon={subItem.icon || null}
                target={subItem.target || '_self'}
                suffix={
                  subItem.suffix
                    ? typeof subItem.suffix === 'function'
                      ? subItem.suffix(userRoles, totalRegsrpval, totalRegsrpoto)
                      : subItem.suffix
                    : null
                }
              >
                {subItem.label}
              </MenuItem>
            ))}
          </MenuSection>
        )
      } else {
        return (
          <MenuItem
            key={index}
            href={item.href}
            icon={item.icon || null}
            suffix={suffix}
            target={item.target || '_self'}
          >
            {item.label}
          </MenuItem>
        )
      }
    })
  }

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => (
          <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
            <i className='tabler-chevron-right' />
          </StyledVerticalNavExpandIcon>
        )}
        renderExpandedMenuItemIcon={{
          icon: <i className='tabler-circle text-xs' />
        }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        {renderMenuItems(menuWithSuffix)}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
