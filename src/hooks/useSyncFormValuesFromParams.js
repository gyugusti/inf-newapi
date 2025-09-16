import { useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

const useSyncFormValuesFromParams = ({ configs = [], setValue }) => {
  const searchParams = useSearchParams()

  useEffect(() => {
    configs.forEach(({ paramName, options = [], matchField = 'value' }) => {
      const paramValue = searchParams.get(paramName)

      if (paramValue && options.length > 0) {
        const found = options.find(item => String(item[matchField]) === String(paramValue))

        if (found) {
          setValue(paramName, found[matchField])
        }
      }
    })
  }, [configs, searchParams, setValue])
}

export default useSyncFormValuesFromParams
