import { useState, useEffect } from 'react';
import { Form, Section, ContactList, Filter } from 'components';
import { nanoid } from 'nanoid';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('Contacts')) ?? initialContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  // export function App() {
  //   const [contacts, setContacts] = useState([
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ]);
  //   const [filter, setFilter] = useState('');

  //   useEffect(() => {
  //     const localContacts = localStorage.getItem('Contacts');
  //     const parseContacts = JSON.parse(localContacts);
  //     return () => {
  //       if (parseContacts) {
  //         setContacts(parseContacts);
  //       }
  //     };
  //   }, []);

  //   useEffect(() => {
  //     localStorage.setItem('Contacts', JSON.stringify(contacts));
  //   }, [contacts]);

  const formSubmitHandler = data => {
    const { name, number } = data;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getFilteredContact = () => {
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerFilter)
    );
  };

  return (
    <Section>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <p>There is no contacts</p>
      ) : (
        <>
          <Filter text={filter} onChangeFilter={changeFilter} />
          <ContactList
            contacts={getFilteredContact()}
            onDeleteContact={deleteContact}
          />
        </>
      )}
    </Section>
  );
}
