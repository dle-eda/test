import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import ParticipantManagement from './containers/ParticipantManagement'
import reportWebVitals from './reportWebVitals'
import rootStore from './store/rootStore'
import { client } from './api'
import useList from './hooks/useList'
import { participantListContext } from './contexts/index'

const ListProvider = ({ children }) => {
  const listContext = useList()

  return (
    <participantListContext.Provider value={listContext}>
      {children}
    </participantListContext.Provider>
  )
}

ReactDOM.render(
  <Provider store={rootStore}>
    <ApolloProvider client={client}>
      <ListProvider>
        <ParticipantManagement />
      </ListProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
