import { Component } from 'react';
import { Form, Section, ContactList, Filter } from 'components';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('Contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('Contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = data => {
    const { name, number } = data;

    if (
      this.state.contacts.find(
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

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilteredContact = () => {
    const { filter, contacts } = this.state;
    const lowerFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerFilter)
    );
  };

  render() {
    const filteredContact = this.getFilteredContact();
    const { formSubmitHandler, changeFilter, deleteContact } = this;
    const { filter } = this.state;

    return (
      <Section>
        <h1>Phonebook</h1>
        <Form onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        {this.state.contacts.length === 0 ? (
          <p>There is no contacts</p>
        ) : (
          <>
            <Filter text={filter} onChangeFilter={changeFilter} />
            <ContactList
              contacts={filteredContact}
              onDeleteContact={deleteContact}
            />
          </>
        )}
      </Section>
    );
  }
}
