import { mount } from "auth/AuthApp";
import React, { useRef, useEffect } from "react"; // useRef allows us to get a reference to an html element,
import { useHistory } from "react-router-dom"; // useHistory allows us to get access to the browser history object

export default ({ onSignIn }) => {
  const ref = useRef(null); // get a reference to the div with id of 'marketing-dev-root'
  const history = useHistory(); // get access to the browser history object

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname, // pass in the initial path to the marketing app
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location; // get the current pathname from the browser history object

        if (pathname !== nextPathname) {
          // if the current pathname is not equal to the next pathname
          history.push(nextPathname); // when the marketing app navigates, update the container browser history object
        }
      },
      onSignIn
    }); // call the mount function from the marketing app and pass in the reference to the div
    history.listen(onParentNavigate); // listen for navigation events and call the onParentNavigate function
  }, []); // only run this effect one time

  return <div ref={ref} />; // return the div with the reference
};
