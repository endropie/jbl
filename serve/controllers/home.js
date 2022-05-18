"use strict";

module.exports = async (request, h) => {

  const result = {
    name: 'API: JBL - simple',
    version: 'v1.0.0',
    build: 'with Happi.js v20.2.2',
  };

  return h.response(result).code(200);
};