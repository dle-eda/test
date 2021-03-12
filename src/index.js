import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import ParticipantManagement from './containers/ParticipantManagement'
import reportWebVitals from './reportWebVitals'
import rootStore from './store/rootStore'
import { client } from './api'

ReactDOM.render(
  <Provider store={rootStore}>
    <ApolloProvider client={client}>
      <ParticipantManagement />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
