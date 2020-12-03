import api from "./api";

const success = result => {
  return new api.ApiResponse(
    result,
    {
      contentType: "application/json"
    },
    200
  );
};
const error = (msg, id) => {
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
