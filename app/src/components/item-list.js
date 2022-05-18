import React, { useEffect, useState } from 'react';
import { Button, Icon, Segment } from 'semantic-ui-react';
import API from '../lib/axios';
import ItemCard from './item-card';
import ItemShow from './item-show';
import Loading from './loading';


export default function ItemList() {
  
  const [loadmore, setLoadmore] = useState(true);
  const [modalID, setModalID] = useState(null);

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const fetch = (offset = 0, callback = undefined) => {
      setLoading(true)
      API.get(`/api/items?offset=${offset}`)
          .then((res) => {
              setRows((w) => w.concat(...res.data?.rows))
              setLoadmore(res.data?.rows?.length ? true : false)

              if (callback) callback() 
          }).catch((err) => {
              
          })
          .finally(() => {
            setTimeout(() => {
              setLoading(false)
            }, 2000);
          });
  };

  const setScrollBottom = () => {
      setTimeout(() => {
          window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
          });
      }, 500);
  }

  const Loadmore = () => (
    <>
      <Segment vertical align="center" padded hidden={ !loadmore }>
          <Button onClick={() => fetch(rows.length, setScrollBottom) } >LOAD MORE</Button>
      </Segment>
    </>
  )

  useEffect(() => {
    fetch();
  }, [])

  return (
    <>
      <Loading show={loading} />
      <div style={{ margin: "2rem 0" }}>
        <div>
          <div className="doubling five column ui grid">
            {rows.map((e, key) => (
              <div
                key={key}
                className="column cursor-pointer"
                onClick={() => setModalID(e.id)}
              >
                <ItemCard name={e.nama} price={e.harga} imgsrc={e.gambar1} />
              </div>
            ))}
          </div>

          <Loadmore />
        </div>

        <div
          hidden={rows.length}
          className="column"
          style={{ textAlign: "center", margin: "5rem auto", color: "#898383" }}
        >
          <h1 style={{}}>Record is emty. Please syncronization.</h1>
          <Icon
            name="cloud download"
            size="huge"
            style={{ textAlign: "center", margin: "2rem auto" }}
          />
        </div>

        <ItemShow modalID={modalID} setClose={() => setModalID(null)} />
      </div>
    </>
  );
}