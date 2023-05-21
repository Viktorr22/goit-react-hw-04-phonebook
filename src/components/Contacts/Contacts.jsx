import PropTypes from 'prop-types';
import {
  ContactMarkupList,
  ContactMarkupItem,
  ContactMarkupButton,
} from './Contacts.styled';

export function ContactList({ contacts, onDeleteContact }) {
  return (
    <ContactMarkupList>
      {contacts.map(({ id, name, number }) => (
        <ContactMarkupItem key={id}>
          {name}: {number}
          <ContactMarkupButton onClick={() => onDeleteContact(id)}>
            Delete
          </ContactMarkupButton>
        </ContactMarkupItem>
      ))}
    </ContactMarkupList>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
