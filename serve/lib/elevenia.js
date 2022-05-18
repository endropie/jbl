const Axios = require('axios');
const convert = require("xml-js");

const api = Axios.create({
  baseURL: 'http://api.elevenia.co.id',
  headers: {
    openapikey: '721407f393e84a28593374cc2b347a98',
    'Content-Type': 'application/xml',
    'Accept-Charset': 'utf-8',
  }
});

const parseTextFn = function(value, parentElement) {
          
    try {
        const parentOfParent = parentElement._parent;
        const pOpKeys = Object.keys(parentElement._parent);
        const keyNo = pOpKeys.length;
        const keyName = pOpKeys[keyNo - 1];
        const arrOfKey = parentElement._parent[keyName];
        const arrOfKeyLen = arrOfKey.length;
        if (arrOfKeyLen > 0) {
            const arr = arrOfKey;
            const arrIndex = arrOfKey.length - 1;
            arr[arrIndex] = value;
        } else {
            parentElement._parent[keyName] = value;
        }
    } catch (e) {}
}

module.exports = {
  api,
  getProducts: (page = 1) => {
    return new Promise((resolve, reject) => {
      api
        .get(`/rest/prodservices/product/listing?page=${page}`)
        .then((res) => {
          const data = JSON.parse(
            convert.xml2json(res.data, {
              compact: true,
              spaces: 2,
              ignoreDeclaration: true,
              ignoreAttributes: true,
              ignoreCdata: true,
              trim: true,
              textFn: parseTextFn,
            })
          );
          resolve({ data: data.Products?.product || [] });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getProduct: (id) => {
    return new Promise((resolve, reject) => {
      api
        .get(`/rest/prodservices/product/details/${id}`)
        .then((res) => {
          const data = JSON.parse(
            convert.xml2json(res.data, {
              compact: true,
              spaces: 2,
              ignoreDeclaration: true,
              ignoreAttributes: true,
              ignoreCdata: true,
              textFn: parseTextFn,
            })
          );

          resolve({ data: data.Product });
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  parseProduct: (e) => {
    
    return {
      code: e.prdNo || null,
      nama: e.prdNm || null,
      sku: e.sellerPrdCd || null,
      harga: e.selPrc || null,
      gambar1: e.prdImage01 || null,
      gambar2: e.prdImage02 || null,
      gambar3: e.prdImage03 || null,
      gambar4: e.prdImage04 || null,
      keterangan: e.htmlDetail || null,
    };
  },
};
