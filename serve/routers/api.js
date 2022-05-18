"use strict";

const Home = require("../controllers/home");
const Item = require("../controllers/items");

module.exports = [
  {
      method: "GET",
      path: "/",
      handler: Home,
      config: {
        description: "Welcome"
      }
  },
  {
    method: "GET",
    path: "/api/items",
    handler: Item.list,
    config: {
      description: "Gets all the product items"
    }
  },
  {
    method: "GET",
    path: "/api/items/{id}",
    handler: Item.show,
    config: {
      description: "Get a product item"
    }
  },
  {
    method: "GET",
    path: "/api/pull-items",
    handler: Item.pull,
    config: {
      description: "Pulls all the product items"
    }
  }
];
