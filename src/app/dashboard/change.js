import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class BlankPage extends Component {
  render() {
    return (
      <div>
        <h1>BlankPage</h1>
        <Link className="text-white font-weight-medium" to="/dashboard">Back to home</Link>
      </div>
    )
  }
}

export default BlankPage
