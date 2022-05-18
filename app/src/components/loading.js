import { Loader, Segment } from "semantic-ui-react";

export default function Loading ({ show }) {
    
  return (
    !show ||
    <Segment 
      inverted
      style={{ position: "fixed", width: "100vw", height: "100vh", top: 0, left: 0, zIndex: 100, opacity: 0.5 }}
    >
      <Loader active />
      {/* <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" /> */}
    </Segment>
  )
};
