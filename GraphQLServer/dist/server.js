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

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst graphql_yoga_1 = __webpack_require__(/*! graphql-yoga */ \"graphql-yoga\");\r\nconst teams_1 = __webpack_require__(/*! ./schema/teams */ \"./src/server/schema/teams.ts\");\r\nconst teams_2 = __webpack_require__(/*! ./resolvers/teams */ \"./src/server/resolvers/teams.ts\");\r\nconst express = __webpack_require__(/*! express */ \"express\");\r\nconst PORT = 2000;\r\nconst pubsub = new graphql_yoga_1.PubSub();\r\nconst app = express();\r\nconst server = new graphql_yoga_1.GraphQLServer({ typeDefs: teams_1.typeDefs, resolvers: teams_2.resolvers, context: { pubsub } });\r\n// server.use(express.json())\r\n// server.use(express.static(\"../../../public\"))\r\nconst options = {\r\n    port: PORT\r\n};\r\nserver.start(options, ({ port }) => {\r\n    console.log(`Graphql Server started, listening on port  ${port} for incoming requests.`);\r\n});\r\n\n\n//# sourceURL=webpack://realtimefeedapp/./src/server/index.ts?");

/***/ }),

/***/ "./src/server/resolvers/teams.ts":
/*!***************************************!*\
  !*** ./src/server/resolvers/teams.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.resolvers = void 0;\r\nconst Teams = __webpack_require__(/*! ../data/jsonData.json */ \"./src/server/data/jsonData.json\");\r\nconst graphql_yoga_1 = __webpack_require__(/*! graphql-yoga */ \"graphql-yoga\");\r\nconst pubsub = new graphql_yoga_1.PubSub();\r\nexports.resolvers = {\r\n    Query: {\r\n        getTeam(parent, args) {\r\n            const id = parseInt(args.id, 10);\r\n            let Team = Teams[0];\r\n            for (var i = 0; i < Teams.length; i++) {\r\n                if (id == Teams[i].id) {\r\n                    Team = Teams[i];\r\n                }\r\n            }\r\n            if (Team.id == id) {\r\n                return Team;\r\n            }\r\n            else {\r\n                throw (\"No Team was found\");\r\n            }\r\n        },\r\n        getAllTeams() {\r\n            pubsub.publish('getAllTeams', {\r\n                getAllTeams: {\r\n                    results: Teams\r\n                }\r\n            });\r\n            return Teams;\r\n        }\r\n    },\r\n    Mutation: {\r\n        createTeam(parent, args) {\r\n            const newTeam = Object.assign({}, args.input);\r\n            if (newTeam != undefined) {\r\n                Teams.push(Object.assign({}, args.input));\r\n            }\r\n            pubsub.publish('Team', {\r\n                Team: {\r\n                    results: Teams\r\n                }\r\n            });\r\n            return newTeam;\r\n        },\r\n        updateTeam(parent, args) {\r\n            const Team = Object.assign({}, args.input);\r\n            for (var i = 0; i < Teams.length; i++) {\r\n                if (Team.id == Teams[i].id) {\r\n                    Teams[i].name = Team.name;\r\n                    Teams[i].points = Team.points;\r\n                }\r\n            }\r\n            pubsub.publish('Team', {\r\n                Team: {\r\n                    results: Teams\r\n                }\r\n            });\r\n            return Teams;\r\n        }\r\n    },\r\n    Subscription: {\r\n        Team: {\r\n            subscribe(parent, args) {\r\n                return pubsub.asyncIterator('Team');\r\n            }\r\n        },\r\n        getAllTeams: {\r\n            subscribe(parent, args) {\r\n                return pubsub.asyncIterator('getAllTeams');\r\n            }\r\n        }\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://realtimefeedapp/./src/server/resolvers/teams.ts?");

/***/ }),

/***/ "./src/server/schema/teams.ts":
/*!************************************!*\
  !*** ./src/server/schema/teams.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.typeDefs = void 0;\r\nexports.typeDefs = `\r\ninput TeamInput {\r\n    id: Int\r\n    name: String\r\n    points: Int\r\n}\r\ntype Team {\r\n    id: Int\r\n    name: String\r\n    points: Int\r\n}\r\ntype Mutation {\r\n    createTeam(input: TeamInput): Team\r\n    updateTeam(input: TeamInput): Team\r\n}\r\ntype Query {\r\n    getTeam(id: Int): Team\r\n    getAllTeams: [Team!]\r\n}\r\ntype TeamSubscriptionMutation {\r\n    results: [Team!]\r\n}\r\n\r\ntype TeamSubscriptionQuery {\r\n    results: [Team!]\r\n}\r\ntype Subscription {\r\n    Team: TeamSubscriptionMutation!\r\n    getAllTeams: TeamSubscriptionQuery\r\n}\r\n`;\r\n\n\n//# sourceURL=webpack://realtimefeedapp/./src/server/schema/teams.ts?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

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

eval("module.exports = JSON.parse('[{\"id\":4,\"name\":\"Arsenal\",\"points\":35},{\"id\":1,\"name\":\"Liverpool\",\"points\":120},{\"id\":2,\"name\":\"Manchester City\",\"points\":135},{\"id\":3,\"name\":\"Manchester United\",\"points\":2},{\"id\":5,\"name\":\"Chelsea\",\"points\":678},{\"id\":6,\"name\":\"Tottenham Hotspur\",\"points\":8},{\"id\":6,\"name\":\"Leicester City\",\"points\":8},{\"id\":8,\"name\":\"West Ham United\",\"points\":89}]');\n\n//# sourceURL=webpack://realtimefeedapp/./src/server/data/jsonData.json?");

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