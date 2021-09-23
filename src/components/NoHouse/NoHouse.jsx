import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../utils/url';
import styles from './NoHouse.module.scss';

export default class NoHouse extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
        <img src={`${BASE_URL}/img/not-found.png`} alt="NOT HOUSES" className={styles.img} />
        <p className={styles.msg}>{children}</p>
      </div>
    );
  }
}

NoHouse.propTypes = {
  children: PropTypes.string.isRequired,
};
