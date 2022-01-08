import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { nanoid } from 'nanoid';
import Filter from './component/Filter/filter';
import ContactList from './component/ContactList/ContactList';
import ContactForm from './component/ContactForm/ContactForm';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // addNewContact = newContact => {
  //   if (this.state.contacts.find(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
  //     toast.error('contact with such name already exists');
  //     return;
  //   }
  //   this.setState(prevState => ({
  //     contacts: [newContact, ...prevState.contacts],
  //   }));
  //   toast.success('contact added');
  // };
 addNewContact = (contactName) => {
    const contactToAdd = {
      ...contactName,
      id: nanoid(),
    };

    const theSameContact = this.state.contacts.some((contact) =>
      contact.name.toLowerCase().includes(contactName.name.toLowerCase())
    );

    if (theSameContact)
      return alert(`${contactName.name}  is already in contacts.`);
    else
      this.setState((state) => ({
        contacts: [...state.contacts, contactToAdd],
      }));
  };



  deleteContact = idBtn => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idBtn),
    }));
    toast.success('delete is complete');
  };

  handleChange = e => {
    const { name, value } = e.target;
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