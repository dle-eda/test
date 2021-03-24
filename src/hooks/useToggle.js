import { useState } from 'react'

const useToggle = () => {
  const [on, setOn] = useState(false)

  return { on, setOn }
}

export default useToggle