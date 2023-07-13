import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react'; // useRef allows us to get a reference to an html element, 
// useEffect allows us to run some code only once when the component is first rendered

export default () => {
  const ref = useRef(null); // get a reference to the div with id of 'marketing-dev-root'
  
  useEffect(() => {
    mount(ref.current); // call the mount function from the marketing app and pass in the reference to the div
  }, []); // only run this useEffect function once, when the component is first
  
  return <div ref={ref} />; // return the div with the reference
};