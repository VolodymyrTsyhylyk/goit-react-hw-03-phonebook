import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import { nanoid } from 'nanoid';
import Filter from './component/Filter/filter';
import ContactList from './component/ContactList/ContactList';
import ContactForm from './component/ContactForm/ContactForm';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addNewContact = newContact => {
    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      toast.error('contact with such name already exists');
      return;
    }
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
    toast.success('contact added');
  };

  deleteContact = idBtn => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idBtn),
    }));
    toast.success('delete is complete');
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <>
        <Toaster />
        <h1>Phonebook</h1>
        <ContactForm addNewContact={this.addNewContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={this.handleChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;