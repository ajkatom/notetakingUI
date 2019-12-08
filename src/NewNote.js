import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const New_Note = gql`
  mutation createNote($title: String!, $content: String!) {
    createNote(input: { title: $title, content: $content }) {
      id
      title
      content
      date
    }
  }
`;

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

const NewNote = withRouter(({ history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [createNote] = useMutation(New_Note, {
    update(cache, { data: { createNote } }) {
      const { allNotes } = cache.readQuery({ query: AllNotes_Query });
      cache.writeQuery({
        query: AllNotes_Query,
        data: { allNotes: allNotes.conact([createNote]) },
      });
    },
  });
  return (
    <div className="m-t-20">
      <h1 className="page-title">Create New Note</h1>
      <div className="newnote-page m-t-20">
        <form
          onSubmit={e => {
            e.preventDefault();
            createNote({
              variables: {
                title,
                content,
                date: Date.now(),
              },
              refetchQueries: [{ query: AllNotes_Query }],
            });
            history.push('/');
          }}
        >
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input
                type="text"
                name="title"
                placeholder="title goes here"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <textarea
                className="textarea"
                rows="10"
                name="content"
                placeholder="content goes here"
                value={content}
                onChange={e => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button classname="button is-link">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default NewNote;
