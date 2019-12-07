import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const AllNotes_Query = gql`
  {
    allNotes {
      title
      content
      id
      date
    }
  }
`;



const AllNotes = () => {
  const { loading, error, data } = useQuery(AllNotes_Query);
  if (loading) return '...loading';
  if (error) return `Error!! ${error.message}`;
  return (
    <div className='"container m-t-20"'>
      <h1 className="page-title">Notes</h1>
      <div className="notes-page">
        <div className="columns is-multiline">
          {data.allNotes.map(note => (
            <div className="column is-one-third" key={note.id}>
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">{note.title}</p>
                </header>
                <div className="card-content">
                  <div className="content">
                    {note.content}
                    <br />
                  </div>
                </div>
                <footer className="card-footer">
                  <Link to={`note ${note.id}`} className="card-footer-item">
                    Edit
                  </Link>
                  <a href="#" className="card-footer-item">
                    Delete
                  </a>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllNotes;
