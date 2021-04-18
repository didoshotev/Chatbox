import { Link } from 'react-router-dom'
import React from 'react'

// const RouterLink = props => <Link to={props.linkTo} {...props}/>
const RouterLink =  React.forwardRef((props, ref) => <Link innerRef={ref} to={props.linkto} {...props} />);
export default RouterLink