class Request {
  constructor() {
    this.url = "/api";
    this.options = {};
    this.method = "GET";
    this.headers = {};
    this.body = "";
  }

  setUrl(url) {
    this.url += url;
    return this;
  }

  setMethod(method) {
    this.method = method;
    return this;
  }

  setHeaders(token) {
    if (!token) {
      this.headers = {
        "Content-Type": "application/json",
      };
    } else {
      this.headers = {
        Authorization: token,
        "Content-Type": "application/json",
      };
    }
    return this;
  }

  setBody(body) {
    this.body = JSON.stringify(body);
    return this;
  }

  setOptions() {
    this.options = {
      method: this.method,
      headers: this.headers,
      body: this.body ? this.body : null,
    };
    return this;
  }

  send() {
    return fetch(this.url, this.options).then((res) => res.json());
  }
}

export default Request;
