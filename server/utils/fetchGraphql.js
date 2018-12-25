"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
function fetchGraphql(url) {
    return node_fetch_1.default(url, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            query: `
      query getAllProducts {
        allProducts {
          id
          productModel
        }
        allShops {
          id
          shopName
        }
        allCategories {
          id
          categoryDescription {
            categoryName
          }
        }
      }
      `
        })
    }).then((res) => {
        return res.json();
    });
}
exports.default = fetchGraphql;
