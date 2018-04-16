import React from 'react'
import { connect } from 'react-redux'

const Sidebar = ({ users }) => (
  <aside id="sidebar" className="sidebar">
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </aside>
)

export default connect(state => ({
  users: state.users
}), {})(Sidebar)
