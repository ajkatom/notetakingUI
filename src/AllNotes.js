import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { notify } from 'react-notify-toast';

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

const Delete_Note = gql`
  mutation deleteNote($id: ID) {
    deleteNote(id: $id) {
      title
      content
      id
    }
  }
`;

const AllNotes = () => {
  const { loading, error, data } = useQuery(AllNotes_Query);
  const [deleteNote] = useMutation(Delete_Note, {
    update(cache, { data: { deleteNote } }) {
      const { allNotes } = cache.readQuery({ query: AllNotes_Query });
      const notes = allNotes.filter(note => note.id !== deleteNote.id);
      cache.writeQuery({
        query: AllNotes_Query,
        data: { allNotes: notes },
      });
    },
  });
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
                  <Link to={`note/${note.id}`} className="card-footer-item">
                    Edit
                  </Link>
                  <button
                    onClick={e => {
                      e.preventDefault();
                      deleteNote({ variables: { id: note.id } });
                      notify.show('Note Deleted!!', 'success');
                    }}
                    className="card-footer-item"
                  >
                    Delete
                  </button>
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
