import React from 'react';

import './Form.scss';
import { useContext, useState, useRef, useEffect } from 'react';
import { MyStoreContext, MAIN_BLOKS } from '../App';

export default function Form() {
    const data = useContext(MyStoreContext);
    const input = useRef('');
    const regPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
   
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [phonePlaceholder, setPhonePlaceholder] = useState('');

    const newUser = {
        id: Date.now(),
        name: name,
        surname: surname,
        phone: phone,
    }

    const showList = (block) => {
        return data.setShowBlock(block);
    };

    const addUser = (user) => {
        if (newUser.name === '') {
            document.querySelector('#name').classList.add('error');

            return;
        } else if (newUser.surname === '') {
            document.querySelector('#surname').classList.add('error');

            return;
        } else if (newUser.phone === '' || newUser.phone.match(regPhone) === null) {
            setPhonePlaceholder('Field filled incorrectly ;(');
            setPhone('');
            document.querySelector('#phone').classList.add('error');

            return;
        } else {
            data.setUsers([...data.users, user ]);
            data.setShowBlock(MAIN_BLOKS.LIST);
        }
    };

    useEffect(() => {
        input.current.focus();
    }, [name]);

    return (
        <div className="Form">
            <div>
                <p>Name: 
                    <input 
                        ref={input}
                        type="text" 
                        id='name' 
                        value={name} 
                        onChange={(e) => {
                            e.target.classList.remove('error');
                            setName(e.target.value);
                        }}
                    />
                </p>
                <p>Surnam: 
                    <input 
                        type="text"
                        id='surname' 
                        value={surname}
                        onChange={(e) => {
                            e.target.classList.remove('error');
                            setSurname(e.target.value);
                        }}
                    />
                </p>
                <p>Phone: 
                    <input 
                        type="text" 
                        id='phone' 
                        value={phone} 
                        placeholder={phonePlaceholder}
                        autoComplete='tel'
                        onChange={(e) => {
                            e.target.classList.remove('error');
                            setPhone(e.target.value);
                        }}
                    />
                </p>
            </div>
            <div>
                <p>
                    <button onClick={() => addUser(newUser)}>Save</button>
                    <button onClick={() => showList(MAIN_BLOKS.LIST)}>Сancel</button>
                </p>
            </div>
        </div>
    )
}