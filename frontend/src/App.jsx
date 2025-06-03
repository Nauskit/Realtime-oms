
import './App.css'

function App() {

  return (
    <>
      <div>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <label for="username">Username</label>
          <input type='text' id='username'></input>
          <label for="password">Password</label>
          <input type='password' id='password'></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default App

