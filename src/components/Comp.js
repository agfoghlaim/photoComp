import React, { useState } from 'react';
import classes from './Comp.module.css';
import Form from './Form';
import { validate } from '../util-functions';
const key = process.env.REACT_APP_CLOUDINARY;
console.log(key)
const Comp = () => {
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [showErrorText, setShowErrorText] = useState(false);
  const [stateForm, setFormData] = useState({
    name: {
      fieldName: 'name',
      value: '',
      type: 'text',
      placeholder: 'name',
      valid: false,
      rules: {
        required: true,
        min: 2,
        max: 50,
      },
    },
    email: {
      fieldName: 'email',
      value: '',
      type: 'email',
      placeholder: 'email',
      valid: false,
      rules: {
        required: true,
        min: 6,
        max: 50,
        isProbablyEmail: true,
      },
    },
    phone: {
      fieldName: 'phone',
      value: '',
      type: 'phone',
      placeholder: 'phone',
      valid: false,
      rules: {
        required: true,
        min: 6,
        max: 50,
      },
    },
    imageTitle: {
      fieldName: 'imageTitle',
      value: '',
      type: 'text',
      placeholder: 'imageTitle',
      valid: false,
      rules: {
        required: true,
        min: 2,
        max: 50,
      },
    },
    description: {
      fieldName: 'description',
      value: '',
      type: 'text',
      placeholder: 'description',
      valid: false,
      rules: {
        required: true,
        min: 2,
        max: 500,
      },
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [uploadedFile, setUploadedFile] = useState({});
  const clearForm = () => {
    const copy = { ...stateForm };

    for (let i in copy) {
      copy[i].value = '';
      copy[i].valid = false;
    }
    setFormData(copy);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const appendFormData = () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ninetotwelve');
    formData.append('context', stateForm);
    formData.append(
      'context',
      `name=${stateForm.name.value}|alt=${stateForm.description.value}|caption=${stateForm.description.value}|email=${stateForm.email.value}|phone=${stateForm.phone.value}|title=${stateForm.imageTitle.value}`
    );
    return formData;
  };
  const handleTextChange = (e, id) => {
    setShowErrorText(false);
    const copy = { ...stateForm };
    const relevantField = { ...copy[e.target.id] };
    relevantField.value = e.target.value;
    relevantField.valid = validate(relevantField.value, relevantField.rules);
    copy[e.target.id] = relevantField;

    let formValid = true;
    for (let i in copy) {
      formValid = copy[i].valid && formValid;
    }
    setFormIsValid(formValid);
    setFormData(copy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid || !file) {
      setShowErrorText(true);
      return;
    }

    setSubmitted(false);
    setFailed(false);

    const formData = appendFormData();
    console.log('FormData', formData);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${key}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const json = await res.json();
      console.log('Json ', json);

      if (json.error) {
        console.log('here');
        setFailed(true);
        setSubmitted(false);
      } else {
        setSubmitted(true);
        setUploadedFile(json.secure_url);
      }
    } catch (err) {
      console.log(err);
      setFailed(true);
    }
    clearForm();
  };

  return (
    <section className={classes.section}>
      {!submitted && !failed ? (
        <>
          <h2>Entry Form</h2>
          <Form
            formData={stateForm}
            showErrorText={showErrorText}
            handleFileChange={handleFileChange}
            handleTextChange={handleTextChange}
            handleSubmit={handleSubmit}
            classes={classes}
            fileName={fileName}
          />
        </>
      ) : submitted ? (
        <>
          <p className={classes.formSuccess}>Thank You!</p>
          <img src={uploadedFile} />
        </>
      ) : failed ? (
        <p className={classes.formFail}>
          Something went wrong.
          <small>Please refresh the page and try again.</small>
        </p>
      ) : null}
    </section>
  );
};

export default Comp;
