import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({
  children,
  to,
  href,
  type = 'primary',
  size = 'medium',
  onClick,
  className = '',
  disabled = false,
  fullWidth = false,
  ...props
}) => {
  const classes = `btn btn-${type} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`;

  // Button variants
  const buttonVariants = {
    hover: {
      scale: 1.03,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.97
    }
  };

  // If it's a link within the app
  if (to) {
    return (
      <motion.div
        className="btn-wrapper"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Link to={to} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  // If it's an external link
  if (href) {
    return (
      <motion.div
        className="btn-wrapper"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <a 
          href={href} 
          className={classes} 
          target="_blank" 
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      </motion.div>
    );
  }

  // If it's a button
  return (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
