import React from 'react';

const NewNote = () => {
  return (
    <div className="m-t-20">
      <h1 className="page-title">Create New Note</h1>
      <div className="newnote-page m-t-20">
        <form>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input type="text" placeholder="title goes here" />
            </div>
          </div>
          <div className="field">
            <label className="label">Content</label>
            <div className="control">
              <textarea className="textarea" rows="10" placeholder="content goes here"></textarea>
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
};

export default NewNote;
