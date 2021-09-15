import React, { useState, useEffect } from 'react';
import User from './User';
import UserForm from './UserForm';

import schema from './formSchema';
import axios from 'axios';
import * as yup from 'yup';

import './App.css';

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: ''
}

const initialUsers = [];
const initialDisabled = true;

function App() {
  const [users, setUsers] = useState([initialUsers]);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = newUser => {
    axios.post(`https://reqres.in/api/users`, newUser)
    .then(res => {
      setUsers([res.data, ...users]);
      setFormValues(initialFormValues);
    }).catch(err => {
      console.error(err);
      setFormValues(initialFormValues)
    })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
    .validate(value)
    .then(() => setFormErrors({ ...formErrors, [name]: ''}))
    .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({ 
      ...formValues, [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms
    }
    postNewUser(newUser);
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>New Users Form</h1></header>
      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      {
        users.map((user, idx) => {
          return (
            <User key={idx} details={user} />
          )
        })
      }
    </div>
  );
}

export default App;
