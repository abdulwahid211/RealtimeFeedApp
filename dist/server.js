/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst graphql_yoga_1 = __webpack_require__(/*! graphql-yoga */ \"graphql-yoga\");\r\nconst cars_1 = __webpack_require__(/*! ./schema/cars */ \"./src/server/schema/cars.ts\");\r\nconst cars_2 = __webpack_require__(/*! ./resolvers/cars */ \"./src/server/resolvers/cars.ts\");\r\nconst PORT = 2000;\r\nconst pubsub = new graphql_yoga_1.PubSub();\r\nconst users = [];\r\nconst server = new graphql_yoga_1.GraphQLServer({ typeDefs: cars_1.typeDefs, resolvers: cars_2.resolvers, context: { pubsub } });\r\nconst options = {\r\n    port: PORT,\r\n};\r\nserver.start(options, ({ port }) => {\r\n    console.log(`Graphql Server started, listening on port  ${port} for incoming requests.`);\r\n});\r\n\n\n//# sourceURL=webpack://realtimefeedapp/./src/server/index.ts?");

/***/ }),

/***/ "./src/server/resolvers/cars.ts":
/*!**************************************!*\
  !*** ./src/server/resolvers/cars.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.resolvers = void 0;\r\nconst Cars = __webpack_require__(/*! ../data/jsonData.json */ \"./src/server/data/jsonData.json\");\r\nconst graphql_yoga_1 = __webpack_require__(/*! graphql-yoga */ \"graphql-yoga\");\r\nconst pubsub = new graphql_yoga_1.PubSub();\r\nexports.resolvers = {\r\n    Query: {\r\n        getCar(parent, args) {\r\n            const id = parseInt(args.id, 10);\r\n            let car = Cars[0];\r\n            for (var i = 0; i < Cars.length; i++) {\r\n                if (id == Cars[i].id) {\r\n                    car = Cars[i];\r\n                }\r\n            }\r\n            if (car.id == id) {\r\n                return car;\r\n            }\r\n            else {\r\n                throw (\"No Car is found\");\r\n            }\r\n        },\r\n        getCars() {\r\n            pubsub.publish('getCars', {\r\n                getCars: {\r\n                    query: 'getCars',\r\n                    data: Cars\r\n                }\r\n            });\r\n            return Cars;\r\n        }\r\n    },\r\n    Mutation: {\r\n        createCar(parent, args) {\r\n            const car = Object.assign({}, args.input);\r\n            if (car != undefined) {\r\n                Cars.push(Object.assign({}, args.input));\r\n            }\r\n            pubsub.publish('car', {\r\n                car: {\r\n                    mutation: 'Added',\r\n                    data: car\r\n                }\r\n            });\r\n            return car;\r\n        }\r\n    },\r\n    Subscription: {\r\n        car: {\r\n            subscribe(parent, args) {\r\n                return pubsub.asyncIterator('car');\r\n            }\r\n        },\r\n        getCars: {\r\n            subscribe(parent, args) {\r\n                return pubsub.asyncIterator('getCars');\r\n            }\r\n        }\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://realtimefeedapp/./src/server/resolvers/cars.ts?");

/***/ }),

/***/ "./src/server/schema/cars.ts":
/*!***********************************!*\
  !*** ./src/server/schema/cars.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.typeDefs = void 0;\r\nexports.typeDefs = `\r\ninput CarInput {\r\n    id: Int!\r\n    name: String!\r\n    description: String!\r\n    value: Int!\r\n}\r\ntype Car {\r\n    id: Int!\r\n    name: String!\r\n    description: String!\r\n    value: Int!\r\n}\r\ntype Mutation {\r\n    createCar(input: CarInput): Car!\r\n    updateCar(id: Int!, input: CarInput): Car!\r\n}\r\ntype Query {\r\n    getCar(id: Int): Car!\r\n    getCars: [Car!]!\r\n}\r\ntype CarSubscriptionMutation {\r\n    mutation: String!\r\n    data: Car!\r\n}\r\n\r\ntype CarSubscriptionQuery {\r\n    query: String!\r\n    data: [Car!]!\r\n}\r\ntype Subscription {\r\n    car: CarSubscriptionMutation!\r\n    getCars: CarSubscriptionQuery\r\n}\r\n\r\n`;\r\n\n\n//# sourceURL=webpack://realtimefeedapp/./src/server/schema/cars.ts?");

/***/ }),

/***/ "graphql-yoga":
/*!*******************************!*\
  !*** external "graphql-yoga" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("graphql-yoga");

/***/ }),

/***/ "./src/server/data/jsonData.json":
/*!***************************************!*\
  !*** ./src/server/data/jsonData.json ***!
  \***************************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('[{\"id\":4,\"name\":\"At et magnam iusto reiciendis eaque nesciunt.\",\"description\":\"Et aut exercitationem et laborum enim consequatur minima cum quo. Sed accusamus atque veritatis nisi error voluptatibus suscipit. Voluptatum omnis pariatur ducimus. Nisi dolor placeat sunt repellat. Nam ad officia debitis qui non. Quia quo consequatur voluptatibus voluptas molestias.\",\"value\":35},{\"id\":1,\"name\":\"Omnis nulla tenetur exercitationem exercitationem.\",\"description\":\"Iure ratione aut a exercitationem nam magnam labore eveniet magnam. Laborum excepturi explicabo atque saepe voluptates cum aut error. Vitae est est modi facilis. Omnis qui tempore. Et ut rerum ullam ducimus veniam.\",\"value\":120},{\"id\":2,\"name\":\"Eum est facilis tempore aut velit.\",\"description\":\"Saepe nulla ex qui tempora iure impedit voluptas. Nemo ullam qui et rerum. Dolor doloremque aliquam rerum numquam labore. Sint quas sit fugit quaerat similique sunt.\",\"value\":135},{\"id\":3,\"name\":\"Similique cum eligendi porro nihil.\",\"description\":\"Commodi eius vel deserunt aut omnis ipsam dignissimos. Debitis est facilis earum et consectetur in. Consequatur fugiat sed. Et hic pariatur dolorum est. Asperiores voluptas laborum quas laboriosam odit aut et sapiente sint.\",\"value\":2},{\"id\":5,\"name\":\"Assumenda explicabo et magnam vitae facilis totam voluptatibus alias.\",\"description\":\"Iste autem rem neque dicta non velit. Vitae voluptatum in doloremque. Est facilis est autem omnis numquam dignissimos. Aperiam quia dicta itaque ducimus placeat suscipit consequatur maxime. Ipsa autem voluptatum.\",\"value\":678},{\"id\":6,\"name\":\"Inventore accusantium sit ea veritatis natus qui aspernatur pariatur dolores.\",\"description\":\"Odit explicabo repellendus molestiae perferendis minima consequuntur nesciunt. Atque eum dolores. Rerum quod cum delectus.\",\"value\":8},{\"id\":7,\"name\":\"Et sunt in error et recusandae ut animi ut.\",\"description\":\"Autem commodi ea sapiente quos officiis. Voluptatem eligendi qui et quis neque dolore tempore consectetur eveniet. Aspernatur iste culpa omnis voluptas. Quos esse amet soluta et eum maiores voluptas.\",\"value\":3500},{\"id\":8,\"name\":\"Et delectus nihil unde ipsam vel ut architecto.\",\"description\":\"Tempore omnis similique. Voluptatem consequatur est odit beatae velit ex. Fugiat in ratione labore exercitationem illo et et nam voluptatem. Expedita vero in incidunt voluptas deserunt odio.\",\"value\":89}]');\n\n//# sourceURL=webpack://realtimefeedapp/./src/server/data/jsonData.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.ts");
/******/ 	
/******/ })()
;