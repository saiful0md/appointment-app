import { useEffect } from 'react'

const useHelmet = ({ title, description }) => {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    if (description) {
      let metaTag = document.querySelector('meta[name="description"]')

      if (metaTag) {
        metaTag.setAttribute('content', description)
      } else {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('name', 'description')
        metaTag.setAttribute('content', description)
        document.head.appendChild(metaTag)
      }
    }
  }, [title, description])
}

export default useHelmet
