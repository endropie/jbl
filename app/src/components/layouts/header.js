import React, { useState } from "react";
import API from "./../../lib/axios";
import {
  Accordion,
  Button,
  Container,
  Dropdown,
  Header,
  Icon,
  Menu,
  Modal,
  ModalContent,
  Visibility,
} from "semantic-ui-react";
import Loading from "../loading";

const menuStyle = {
  backgroundColor: "transparent",
  border: "none",
  borderRadius: 0,
  boxShadow: "none",
  marginBottom: "1em",
  marginTop: "2em",
  transition: "box-shadow 0.5s ease, padding 0.5s ease",
};

const fixedMenuStyle = {
  backgroundColor: "#c39d84",
  border: "1px solid #c19d84",
  boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
};


export default function HeaderLayout ({ content }) {

  const [menuFixed, setMenuFixed] = useState(false);

  const stickTopMenu = () => setMenuFixed(true);

  const unStickTopMenu = () => setMenuFixed(false);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  const [activeContent, setActiveContent] = useState(null);

  const setModalClose = () => {
    setModal(null);
    setActiveContent(null);
    window.location.reload();
  }

  const setModalCloseReload = () => {
    setModalClose();
    window.location.reload();
  }

  const pull = (callback = undefined) => {
    setLoading(true);
    API.get(`/api/pull-items`)
      .then((res) => {
        console.warn("PULL", res);
        // setModal(res.data)
        const { total, invalid, rows } = res.data;
        setModal({ total, invalid, newtotal: rows.length });
        if (callback) callback();
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Loading show={loading} />
      <Container style={{ marginTop: "2em" }}>
        <Header as="h1">CATALOG SIMPLE</Header>
        <p style={{ maxWidth: "500px" }}>
          The integrated elevenia marketplace business system application. Can
          be catalog managed easily and systematically. Becouse you can directly
          cross-listing to the marketplace
        </p>
      </Container>

      <Visibility
        onBottomPassed={stickTopMenu}
        onBottomVisible={unStickTopMenu}
        once={false}
      >
        <Menu
          borderless
          fixed={menuFixed ? "top" : undefined}
          style={menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container>
            <Menu.Item header>
              <Icon name="box" />
              Product catalog
            </Menu.Item>

            <Menu.Menu position="right">
              <Dropdown
                text="More &nbsp;"
                icon="angle double down"
                pointing
                className="link item"
              >
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Icon name="sync alternate" />
                    Reload
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => pull()}>
                    <Icon name="cloud download" />
                    Get Pull from marketpalce
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Container>
        </Menu>
      </Visibility>

      <Modal open={Boolean(modal)} size="mini">
        <Modal.Header>
          Get pull from <strong>Elevenia.com</strong>
        </Modal.Header>
        <ModalContent>
          <Accordion>
            <Accordion.Title>
              <Icon name="dropdown" />
              {`All Product available ${modal?.total || "no"} record`}
            </Accordion.Title>
            <Accordion.Title
              onClick={() =>
                setActiveContent((s) => (s === null ? "new" : null))
              }
            >
              <Icon name="dropdown" />
              {`New Product syncronize ${modal?.newtotal || "no"} record`}
            </Accordion.Title>

            {/* <Accordion.Content active={activeContent === "new"}>
              <ol>
                { modal?.rows?.map((m, i) => (<li key={i}>{m}</li> )) }
              </ol>
            </Accordion.Content> */}
            <Accordion.Title
              active={activeContent === "invalid"}
              onClick={() =>
                setActiveContent((s) => (s === null ? "invalid" : null))
              }
            >
              <Icon name="dropdown" />
              {`Product syncronize Invalid ${
                Object.keys(modal?.invalid || {}).length ?? "no"
              } record`}
            </Accordion.Title>
            <Accordion.Content active={activeContent === "invalid"}>
              {Object.keys(modal?.invalid || {}).map((code) => (
                <li key={code}>
                  {code}: {modal?.invalid[code]}
                </li>
              ))}
            </Accordion.Content>
          </Accordion>
        </ModalContent>
        <Modal.Actions>
          <Button onClick={() => setModalCloseReload()} positive>
            Reload now
          </Button>
          <Button onClick={() => setModalClose()} positive>
            Later
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
