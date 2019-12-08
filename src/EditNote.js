import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { notify } from 'react-notify-toast';
import gql from 'graphql-tag';

const Note_Query = gql`
  query getNote($id: ID!) {
    getNote(id: $id) {
      id
      title
      content
      date
    }
  }
`;
const Update_Note = gql`
  mutation updateNote($id: ID!, $title: String!, $content: String!) {
    updateNote(id: $id, input: { title: $title, content: $content }) {
      id
      title
      content
      date
    }
  }
`;

const EditNote = withRouter(({ match, history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [updateNote] = useMutation(Update_Note);

  const { loading, error, data } = useQuery(Note_Query, {
    variables: {
      id: match.params.id,
    },
  });

  const note = data;
  console.log(note);

  if (loading) return <div>Getting Note</div>;
  if (error) return <div>Error Getting Note</div>;
  return (
    <div className="container m-t-20">
      <h1 className="page-title"> Edit Note</h1>
      <div className="newnote-page m-t-20">
        <form
          onSubmit={e => {
            e.preventDefault();
            updateNote({
              variables: {
                id: note.getNote.id,
                title: title ? title : note.getNote.title,
                content: content ? content : note.getNote.content,
              },
            });
            notify.show('edited Note processed', 'success');
            history.push('/');
          }}
        >
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={note.getNote.title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <textarea
                className="textarea"
                rows="10"
                placeholder="Content goes here"
                defaultValue={note.getNote.content}
                onChange={e => setContent(e.target.value)}
                required
              ></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default EditNote;
