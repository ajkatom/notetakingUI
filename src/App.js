import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AllNotes from './AllNotes';
import NewNote from './NewNote';
import EditNote from './EditNote';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar App-header" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                notesQL
              </Link>
            </div>
            <div className="navbar-end">
              <Link to="/" className="navbar-item">
                All Notes
              </Link>
              <Link to="/newnote" className="navbar-item">
                New Note
              </Link>
            </div>
          </nav>

          <Route exact path="/" component={AllNotes} />
          <Route exact path="/newnote" component={NewNote} />
          <Route exact path="/note/:id" component={EditNote} />
        </div>
      </Router>
    );
  }
}

export default App;
