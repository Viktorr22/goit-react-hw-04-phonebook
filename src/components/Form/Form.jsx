import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormBox } from './Form.styled';

export function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const handleNameChange = event => {
    setName(event.currentTarget.value);
  };

  const [number, setNumber] = useState('');
  const handleNumberChange = event => {
    setNumber(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormBox onSubmit={handleSubmit}>
      <h3>Name</h3>
      <label>
        <input
          onChange={handleNameChange}
          type="text"
          value={name}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <h3>Number</h3>
      <label>
        <input
          onChange={handleNumberChange}
          type="tel"
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </FormBox>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
