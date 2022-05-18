import React from "react";
import {
  Container,
  List,
  Segment,
} from "semantic-ui-react";


export default function FooterLayout ({ content }) {

  return (
    <div>
      {/* FOOTER */}
      <Segment
        inverted
        style={{
          backgroundColor: "#766052",
          margin: "2em 0em 0em",
          padding: "1em 0em",
        }}
        vertical
      >
        <Container textAlign="center">
          {/* <Icon name="box" size="big" /> */}
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
}
