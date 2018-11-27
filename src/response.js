import api from "./api";

let success = result => {
  return new api.ApiResponse(
    result,
    {
      contentType: "application/json"
    },
    200
  );
};
let error = (msg, id) => {
  return new api.ApiResponse(
    {
      jsonrpc: "2.0",
      error: {
        code: -12345,
        message: msg,
        data: null
      },
      id: id
    },
    {
      contentType: "application/json"
    },
    403
  );
};

export { success, error };
