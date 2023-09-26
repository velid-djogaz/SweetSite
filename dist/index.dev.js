"use strict";

var _express = _interopRequireDefault(require("express"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

require("dotenv/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
var port = process.env.PORT || 5500;
var environment = process.env.ENVIRONMENT || 'sandbox';
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';
/**
 * Creates an order and returns it as a JSON response.
 * @function
 * @name createOrder
 * @memberof module:routes
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The request body containing the order information.
 * @param {string} req.body.intent - The intent of the order.
 * @param {object} res - The HTTP response object.
 * @returns {object} The created order as a JSON response.
 * @throws {Error} If there is an error creating the order.
 */

app.post('/create_order', function (req, res) {
  get_access_token().then(function (access_token) {
    var order_data_json = {
      'intent': req.body.intent.toUpperCase(),
      'purchase_units': [{
        'amount': {
          'currency_code': 'USD',
          'value': '100.00'
        }
      }]
    };
    var data = JSON.stringify(order_data_json);
    (0, _nodeFetch["default"])(endpoint_url + '/v2/checkout/orders', {
      //https://developer.paypal.com/docs/api/orders/v2/#orders_create
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(access_token)
      },
      body: data
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      res.send(json);
    }); //Send minimal data to client
  })["catch"](function (err) {
    console.log(err);
    res.status(500).send(err);
  });
});
/**
 * Completes an order and returns it as a JSON response.
 * @function
 * @name completeOrder
 * @memberof module:routes
 * @param {object} req - The HTTP request object.
 * @param {object} req.body - The request body containing the order ID and intent.
 * @param {string} req.body.order_id - The ID of the order to complete.
 * @param {string} req.body.intent - The intent of the order.
 * @param {object} res - The HTTP response object.
 * @returns {object} The completed order as a JSON response.
 * @throws {Error} If there is an error completing the order.
 */

app.post('/complete_order', function (req, res) {
  get_access_token().then(function (access_token) {
    (0, _nodeFetch["default"])(endpoint_url + '/v2/checkout/orders/' + req.body.order_id + '/' + req.body.intent, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer ".concat(access_token)
      }
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log(json);
      res.send(json);
    }); //Send minimal data to client
  })["catch"](function (err) {
    console.log(err);
    res.status(500).send(err);
  });
}); // Helper / Utility functions
//Servers the index.html file

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/index.html');
}); //Servers the style.css file

app.get('/style.css', function (req, res) {
  res.sendFile(process.cwd() + '/style.css');
}); //Servers the script.js file

app.get('/script.js', function (req, res) {
  res.sendFile(process.cwd() + '/script.js');
}); //PayPal Developer YouTube Video:
//How to Retrieve an API Access Token (Node.js)
//https://www.youtube.com/watch?v=HOkkbGSxmp4

function get_access_token() {
  var auth = "".concat(client_id, ":").concat(client_secret);
  var data = 'grant_type=client_credentials';
  return (0, _nodeFetch["default"])(endpoint_url + '/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': "Basic ".concat(Buffer.from(auth).toString('base64'))
    },
    body: data
  }).then(function (res) {
    return res.json();
  }).then(function (json) {
    return json.access_token;
  });
}

app.listen(port, function () {
  console.log("Server listening at http://localhost:".concat(port));
});
//# sourceMappingURL=index.dev.js.map
