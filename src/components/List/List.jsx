import React from 'react';

import './List.scss';
import UserСontacts from '../UserСontacts/UserСontacts';
import { useContext } from 'react';
import { MyStoreContext } from '../App';

export default function List() {
    const data = useContext(MyStoreContext);

    return (
        <div className="List">
            <div className="block">
                <p>Имя</p>
                <p>Фамилия</p>
                <p>Телефон</p>
                <p>Действия</p>
            </div>
            {data.loading && <p className="loading">Loading Contacts...</p>}
            {!data.loading && data.users.map( (user) => (
                <UserСontacts key={user.id} id={user.id} name={user.name} phone={user.phone} surname={user.surname} />
            ))
            }
        </div>
    )
}