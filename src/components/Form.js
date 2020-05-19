import React from 'react';

const Form = ({
  handleFileChange,
  handleTextChange,
  handleSubmit,
  classes,
  formData,
  fileName,
  showErrorText,
}) => {
  const renderSpan = (name) => {
    if (showErrorText && !formData[name].valid) {
      return (
        <span
          className={
            !formData[name].valid
              ? `${classes.formError} ${classes.show}`
              : classes.formError
          }
        >
          Enter {`${name}`}
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.inputSection}>
        <label htmlFor="name">Name</label>
        <input
          style={{
            border: `${
              !formData.name.valid
                ? '0.2rem solid var(--covidPink)'
                : '0.2rem solid var(--covidGreen)'
            }`,
          }}
          id="name"
          placeholder="Your Name"
          type="text"
          name="name"
          value={formData.name.value}
          onChange={(e) => handleTextChange(e)}
        />
        {renderSpan('name')}
      </div>
      <div className={classes.inputSection}>
        <label htmlFor="imageTitle">Photo Title</label>
        <input
          style={{
            border: `${
              !formData.imageTitle.valid
                ? '0.2rem solid var(--covidPink)'
                : '0.2rem solid var(--covidGreen)'
            }`,
          }}
          id="imageTitle"
          placeholder="Image Title"
          type="text"
          name="imageTitle"
          value={formData.imageTitle.value}
          onChange={(e) => handleTextChange(e)}
        />
        {renderSpan('imageTitle')}
      </div>
      <div className={classes.inputSection}>
        <label htmlFor="email">Email</label>
        <input
          style={{
            border: `${
              !formData.email.valid
                ? '0.2rem solid var(--covidPink)'
                : '0.2rem solid var(--covidGreen)'
            }`,
          }}
          id="email"
          placeholder="email"
          type="email"
          name="email"
          value={formData.email.value}
          onChange={(e) => handleTextChange(e)}
        />
        {renderSpan('email')}
      </div>
      <div className={classes.inputSection}>
        <label htmlFor="phone">Phone</label>
        <input
          style={{
            border: `${
              !formData.phone.valid
                ? '0.2rem solid var(--covidPink)'
                : '0.2rem solid var(--covidGreen)'
            }`,
          }}
          id="phone"
          placeholder="phone"
          type="tel"
          name="phone"
          value={formData.phone.value}
          onChange={(e) => handleTextChange(e)}
        />
        {renderSpan('phone')}
      </div>
      <div className={classes.inputSection}>
        <label htmlFor="description">Description</label>
        <textarea
          style={{
            border: `${
              !formData.description.valid
                ? '0.2rem solid var(--covidPink)'
                : '0.2rem solid var(--covidGreen)'
            }`,
          }}
          id="description"
          placeholder="A short description of your photo..."
          type="text"
          name="description"
          value={formData.description.value}
          onChange={(e) => handleTextChange(e)}
        ></textarea>
        {renderSpan('description')}
      </div>

      <div className={classes.inputSection}>
        <label htmlFor="photo">{fileName}</label>
        <input type="file" name="photo" onChange={(e) => handleFileChange(e)} />
      </div>

      <input className={classes.formBtn} type="submit" value="Submit" />
    </form>
  );
};

export default Form;
