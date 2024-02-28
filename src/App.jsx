import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

/**
 *  In JavaScript, functions declared with const using arrow function syntax are hoisted, 
 * which means they are moved to the top of their scope during the compilation phase. 
 * This hoisting allows the function to be accessible even before its actual declaration in the code.
 * 
 */
const getReadEmails = (emails) => emails.filter(email => !email.read) //olästa mail ska räknas som antal i inbox
const getStarredEmails = (emails) => emails.filter(email => email.starred)


function App() {
  // Use initialEmails for state
  //console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails) //element i denna lista ändras ej. endast i return så filtreras email med hide read
  const [hideRead, setHideRead] = useState(false)


  //when the state of a React component changes, it triggers a re-render of the component
  //Eftersom map funktionen bara kör en operation på varje item i listan är alla items kvar i updatedEmails
  const toggleRead = (targetEmail) => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  const toggleStar = (targetEmail) => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, starred: !email.starred } : email
      )
    setEmails(updatedEmails)
  }

  //För hide read
  let filteredEmails = emails //måste vara utanför då det är initiala renderingen

  if (hideRead) { //eftersom hideRead är ett state så uppdateras email listan varje gång checkboxens onChange metod körs
    filteredEmails = getReadEmails(filteredEmails);
  }


  return (
    <div className="app">
      <Header />

      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => { }}
          >
            <span className="label">Inbox</span>
            <span className="count">{getReadEmails(filteredEmails).length}</span>
          </li>

          <li
            className="item"
            onClick={() => { }}
          >
            <span className="label">Starred</span>
            <span className="count">{getStarredEmails(filteredEmails).length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={(e) => setHideRead(e.target.checked)}  //e.target.checked represents the updated state of the checkbox after the change. It's a boolean value indicating whether the checkbox is now checked or unchecked. target=this checkbox
            />
          </li>
        </ul>
      </nav>

      <main className="emails">{/* Render a list of emails here */}
        <ul>
          {filteredEmails.map((email, index) => (
          <li className={`email ${email.read ? 'read' : 'unread'}`} // olika css styles
          key={index}>

          <div className="select">
            <input
              className="select-checkbox"
              type="checkbox" 
              checked={email.read}
              onChange={() => toggleRead(email)}
              />
          </div>

          <div className="star">
            <input
              className="star-checkbox"
              type="checkbox"
              checked={email.starred}
              onChange={() => toggleStar(email)}
            />
          </div>

          <div className="sender">{email.sender}</div>
          <div className="title">{email.title}</div>
        </li>
          ))}
        
        </ul>
      </main>
    </div>
  )
}

export default App
