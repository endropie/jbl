import React, { useState } from 'react'
import API from "../lib/axios";
import { Button, Form, Image, Modal } from 'semantic-ui-react'

export default function ItemShow({ modalID, setClose }) {

    const [loading, setLoading] = useState(false);
    const [row, setRow] = useState(null);
    const [imager, setImager] = useState(null);
    const [ishtml, setIshtml] = useState(false);

    const fetch = (id) => {
      setLoading(true)
      API.get(`/api/items/${id}`)
        .then((res) => {
          setRow(res.data.row);
          setImager(res.data.row.gambar1);
        })
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    };

    const onMounted = () => {
        setTimeout(() => {
            fetch( modalID);
        }, 200);
    };

    const onClosed = () => {
        setClose();
        setRow(null);
    }

    const ModalContent = () =>
      !row || (
        <Modal.Content>
          <Modal.Description>
            <div class="stackable ui grid">
              <div class="six wide column">
                <Image
                  src={imager || "/blank-image.png"}
                  style={{ height: "60vh" }}
                />

                <div class="ui grid">
                  <div class="four column padded row">
                    <Image
                      centered
                      bordered
                      className="cursor-pointer"
                      src={row?.gambar1}
                      style={{ height: "40px" }}
                      onClick={() => setImager(row?.gambar1)}
                      hidden={!row?.gambar1}
                    />
                    <Image
                      centered
                      bordered
                      className="cursor-pointer"
                      position="center"
                      src={row?.gambar2}
                      style={{ height: "40px" }}
                      onClick={() => setImager(row?.gambar2)}
                      hidden={!row?.gambar2}
                    />
                    <Image
                      centered
                      bordered
                      className="cursor-pointer"
                      position="center"
                      src={row?.gambar3}
                      style={{ height: "40px" }}
                      onClick={() => setImager(row?.gambar3)}
                      hidden={!row?.gambar3}
                    />
                    <Image
                      centered
                      bordered
                      className="cursor-pointer"
                      position="center"
                      src={row?.gambar4}
                      style={{ height: "40px" }}
                      onClick={() => setImager(row?.gambar4)}
                      hidden={!row?.gambar4}
                    />
                  </div>
                </div>
              </div>
              <div class="ten wide column">
                <Form>
                  <Form.Field>
                    <label>NAMA</label>
                    <input value={row?.nama} />
                  </Form.Field>
                  <Form.Field>
                    <label>SKU</label>
                    <input value={row?.sku} />
                  </Form.Field>

                  <Form.Field>
                    <label>
                      KETERANGAN
                      <Button
                        compact
                        size="mini"
                        hidden={ishtml}
                        onClick={() => setIshtml((v) => !v)}
                      >
                        {ishtml ? "view" : "html"}
                      </Button>
                    </label>
                    <textarea value={row?.keterangan} hidden={!ishtml} />
                    <div
                      dangerouslySetInnerHTML={{ __html: row?.keterangan }}
                      hidden={ishtml}
                    />
                  </Form.Field>

                  <Button type="submit">Submit</Button>
                </Form>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      );

  return (
    <Modal
      loading={ loading }
      onMount={onMounted}
      onClose={onClosed}
      open={Boolean(modalID)}
      style={{ minHeight: "92vh", minWidth: "90vw", }}
    >
      <Modal.Header>Product #{row?.code} </Modal.Header>
      <ModalContent />
      <Modal.Actions>
        <Button onClick={() => onClosed()}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}