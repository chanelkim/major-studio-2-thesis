// Source: https://github.com/cooperhewitt/node-cooperhewitt
var cooperhewitt = require("node-cooperhewitt");

var api_token = "<657c180a00b71ad5bf34d5f64f282a99>";

var method = "cooperhewitt.objects.getRandom";
var args = { access_token: api_token };

cooperhewitt.call(method, args, function (rsp) {
  console.log(rsp);
});
// Note: require method not working, maybe due to browser incompatibility

// // Module Method
// import cooperhewitt from "../node_modules/node-cooperhewitt";

// const api_token = "<657c180a00b71ad5bf34d5f64f282a99>";

// const method = "cooperhewitt.objects.getRandom";
// const args = { access_token: api_token };

// cooperhewitt.call(method, args, (rsp) => {
//   console.log(rsp);
// });
