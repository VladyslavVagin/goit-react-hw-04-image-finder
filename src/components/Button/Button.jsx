import React from 'react'
import css from './Button.module.css'
import PropTypes from 'prop-types';

const Button = ({onClick}) => {
  return (
    <div className={css.buttonContainer}>
         <button type='button' className={css.showbutton} onClick={onClick}>Load more</button>
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Button