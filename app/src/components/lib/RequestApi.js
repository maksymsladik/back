import Request from "./Request";

class RequestApi {
  static get(url, token) {
    return new Request()
      .setUrl(url)
      .setMethod("GET")
      .setHeaders(token)
      .setOptions()
      .send();
  }

  static post(path, body, token) {
    return new Request()
      .setUrl(path)
      .setMethod("POST")
      .setHeaders(token)
      .setBody(body)
      .setOptions()
      .send();
  }

  static deleteThis(path, token) {
    return new Request()
      .setUrl(path)
      .setMethod("DELETE")
      .setHeaders(token)
      .setBody()
      .setOptions()
      .send();
  }

  static deleteThese(path, token) {
    return new Request()
      .setUrl(path)
      .setMethod("DELETE")
      .setHeaders(token)
      .setBody()
      .setOptions()
      .send();
  }
}

export default RequestApi;
