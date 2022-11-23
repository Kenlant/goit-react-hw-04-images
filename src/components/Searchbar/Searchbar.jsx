import { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  render() {
    const { onSubmit } = this.props;

    const {
      Searchbar: searchBarClassName,
      SearchForm: searchFormClassName,
      [`SearchForm-button`]: searchFormBtnClassName,
      [`SearchForm-button-label`]: searchFormBtnLabelClassName,
      [`SearchForm-input`]: searchFormInputClassName,
    } = styles;

    return (
      <header className={searchBarClassName}>
        <Formik
          initialValues={{ searchTerm: `` }}
          onSubmit={(values, actions) => {
            actions.resetForm();
            onSubmit(values);
          }}
          reset
        >
          <Form className={searchFormClassName}>
            <button className={searchFormBtnClassName} type="submit">
              <span className={searchFormBtnLabelClassName}>Search</span>
            </button>

            <Field
              className={searchFormInputClassName}
              type="text"
              name="searchTerm"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </Form>
        </Formik>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
