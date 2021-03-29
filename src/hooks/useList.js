import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PARTICIPANTS } from 'queries'

const useList = () => {
  const [list, setList] = useState([])
  const { data, error, loading, networkStatus } = useQuery(GET_PARTICIPANTS, {
    fetchPolicy: 'cache-and-network',
    onCompleted() {
      setList(data['participant'].map(item => ({ ...item, mutated: false })))
    }
  })

  const updateItem = (updateData) => {
    const result = list.map(item => {
      return item.id === updateData.id ? { ...item, ...updateData } : item
    })
    setList(result)
  }

  return {
    list,
    error,
    loading,
    networkStatus,
    updateItem
  }
}

export default useList