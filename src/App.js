import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import MessagesList from './components/MessagesList'
import AddMessage from './components/AddMessage'

const App = () => (
  <div id="container">
    <Sidebar />
    <section id="main">
      <MessagesList />
      <AddMessage />
    </section>
  </div>
)

export default App
