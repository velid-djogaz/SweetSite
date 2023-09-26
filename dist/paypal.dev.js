"use strict";

var _express = _interopRequireDefault(require("express"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _process$env = process.env,
    CLIENT_ID = _process$env.CLIENT_ID,
    APP_SECRET = _process$env.APP_SECRET;
var app = (0, _express["default"])();
var base = "https://api-m.sandbox.paypal.com";
app.use((0, _cors["default"])({
  origin: '*'
}));

var generateAccessToken = function generateAccessToken() {
  var auth, response, data;
  return regeneratorRuntime.async(function generateAccessToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])("".concat(base, "/v1/oauth2/token"), {
            method: "post",
            body: "grant_type=client_credentials",
            headers: {
              Authorization: "Basic ".concat(auth)
            }
          }));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          return _context.abrupt("return", data.access_token);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error("Failed to generate Access Token:", _context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

var createOrder = function createOrder() {
  var accessToken, url, payload, response;
  return regeneratorRuntime.async(function createOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(generateAccessToken());

        case 2:
          accessToken = _context2.sent;
          url = "".concat(base, "/v2/checkout/orders");
          payload = {
            intent: "CAPTURE",
            purchase_units: [{
              amount: {
                currency_code: "USD",
                value: "0.02"
              }
            }]
          };
          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ".concat(accessToken, "\u222B")
            },
            method: "POST",
            body: JSON.stringify(payload)
          }));

        case 7:
          response = _context2.sent;
          return _context2.abrupt("return", handleResponse(response));

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var capturePayment = function capturePayment(orderID) {
  var accessToken, url, response;
  return regeneratorRuntime.async(function capturePayment$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(generateAccessToken());

        case 2:
          accessToken = _context3.sent;
          url = "".concat(base, "/v2/checkout/orders/${orderID}/capture");
          _context3.next = 6;
          return regeneratorRuntime.awrap((0, _nodeFetch["default"])(url, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ".concat(accessToken, "\u222B")
            }
          }));

        case 6:
          response = _context3.sent;
          return _context3.abrupt("return", handleResponse(response));

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};

function handleResponse(response) {
  var errorMessage;
  return regeneratorRuntime.async(function handleResponse$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!(response.status === 200 || response.status === 201)) {
            _context4.next = 2;
            break;
          }

          return _context4.abrupt("return", response.json());

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap(response.text());

        case 4:
          errorMessage = _context4.sent;
          throw new Error(errorMessage);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

app.post("/orders", function _callee(req, res) {
  var response;
  return regeneratorRuntime.async(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(createOrder());

        case 3:
          response = _context5.sent;
          res.json(response);
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error("Failed to create order:", _context5.t0);
          res.status(500).json({
            error: "Failed to create order."
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app.post("/orders/:orderID/capture", function _callee2(req, res) {
  var orderID, response;
  return regeneratorRuntime.async(function _callee2$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          orderID = req.params.orderID;
          _context6.next = 4;
          return regeneratorRuntime.awrap(capturePayment(orderID));

        case 4:
          response = _context6.sent;
          res.json(response);
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error("Failed to create order:", _context6.t0);
          res.status(500).json({
            error: "Failed to capture order."
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.listen(9597, function () {
  console.log("listening on http://localhost:9597/");
});
//# sourceMappingURL=paypal.dev.js.map
