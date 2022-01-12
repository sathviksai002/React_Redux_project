import React from 'react';
import './App.css';

function App(props) {
  return(
    <div className="form">
      <h1>hello anu</h1>
      <form onSubmit="submit">
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" />
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App;