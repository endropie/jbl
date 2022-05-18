"use strict";

const elevenia = require("./../lib/elevenia");
const { useEloquent } = require("./../lib/database");

module.exports = {
  show: async (request, h) => {
    try {
      const { rows } = await request.pgsql.query(
        "SELECT * FROM items WHERE id = $1 LIMIT 1",
        [request.params.id]
      );

      if (rows.length) return h.response({ row: rows[0] }).code(200);
    } catch {}
    return h.response({ message: "The product not found" }).code(404);
  },

  list: async (request, h) => {
    const db = useEloquent(request.pgsql)

    const { rows, total } = await db.getProducts(request)

    return h.response({ total, rows }).code(200);
  },

  push: async (request, h) => {
    return h.response("COMMING SOON").code(200);
  },

  pull: async (request, h) => {

    const db = useEloquent(request.pgsql)
    
    try {
      await request.pgsql.query("BEGIN");

      let page = 1, record = [], rows = [], invalid = {};

      while (page > 0) {
        const { data } = await elevenia.getProducts(page);

        if(!data.length) {
          page = 0;
          break;
        }

        const promises = data
          .map(async(e) => {

            return new Promise(async(resolve) => {
              e = elevenia.parseProduct(e);
              record.push(e);
              if (!e?.sku || typeof e.sku === "object") {
                invalid[e.code] = "sku undefined"
                return resolve(null);
              }
  
              const hasCode = await db.hasItemCode(e.code);
              if (hasCode) {
                return resolve(null);
              }
  
              const hasSKU = await db.hasItemSKU(e.sku);
              if (hasSKU) {
                invalid[e.code] = `sku [${e.sku}] duplicate`;
                return resolve(null);
              }
  
              const { data } = await elevenia.getProduct(e.code);
              return resolve(elevenia.parseProduct(data));
            })
          })
        
        for (let promise of promises) {
          const e = await promise;
          if (e) {
          try {
              await db.insertItem(e);
              rows.push(e);
            } catch (error) {
              invalid[e.code] = error
            }
          }
        }
        page++;
      }

      const total = record.length;

      await request.pgsql.query("COMMIT");

      rows = rows.map(e => ({code: e.code, sku: e.sku, nama: e.nama}))

      return h.response({ total, rows, invalid }).code(200);
    } catch (error) {
      await request.pgsql.query("ROLLBACK");
      throw error;
    }
  },
};
