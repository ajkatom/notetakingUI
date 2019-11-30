import React from 'react';

const EditNote = () => {
  return (
    <div className="container m-t-20">
      <h1 className="page-title"> Edit Note</h1>
      <div className="newnote-page m-t-20">
        <form>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input className="input" type="text" placeholder="Title" />
            </div>
          </div>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <textarea className="textarea" rows="10" placeholder="Content goes here"></textarea>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button class="button is-link">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
