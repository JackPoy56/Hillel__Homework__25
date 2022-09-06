import React from 'react';

import './UserСontacts.scss';
import { useContext } from 'react';
import { MyStoreContext } from '../App';

export default function UserСontacts ({name, surname, phone, id}) {
    const data = useContext(MyStoreContext);
 
    const removeUser = (id) => {
        data.setUsers(data.users.filter(user => {
          return user.id !== id;
        }))
    };

    return (
        <div className="UserСontacts" id={id}>
            <p>{name}</p>
            <p>{surname}</p>
            <p>{phone}</p>
            <p>
                <button type='button' onClick={() => removeUser(id)}>Delete</button>
            </p>
        </div>
    )
}