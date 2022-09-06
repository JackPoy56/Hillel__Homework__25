import { createContext ,useState, useEffect } from 'react';

import './App.scss';
import Form from './Form/Form';
import List from './List/List';

export const MyStoreContext = createContext();

export const MAIN_BLOKS = {
  FORM: <Form/>,
  LIST: <List/>
}; 

function App() {
  const [showBlock, setShowBlock] = useState(MAIN_BLOKS.LIST);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {    
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((data) =>{
          setLoading(true);
          
          return data.json()})
      .then((data) => data.map( element => {
        const fullName = element.name.split(' ');

        const name =  fullName[0] === 'Mrs.' || fullName[0] === 'Mr.' ? `${fullName[0]} ${fullName[1]}`: fullName[0];
        const surname = fullName[0] === 'Mrs.' || fullName[0] === 'Mr.' ? fullName[2]: fullName[1];

        const newElement = {
          id: element.id,
          name: name,
          surname: surname,
          phone: element.phone,
        }

        return newElement;      
      })).then((data) => setUsers(data))
      .finally(() => setLoading(false));  
  }, [])

  const db = {
    showBlock,
    setShowBlock,
    users,
    setUsers,
    loading, 
    setLoading,
  }

  return (
    <MyStoreContext.Provider value={db}>
      <div className="App">
        <header>
          <button type="button" onClick={() => setShowBlock(MAIN_BLOKS.FORM)}>New contact</button>
          <button type="button" onClick={() => setShowBlock(MAIN_BLOKS.LIST)}>Contacts</button>
        </header>
        <div>
          {showBlock}
        </div>
      </div>
    </MyStoreContext.Provider>
  );
}

export default App;