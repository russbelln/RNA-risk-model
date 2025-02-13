export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = "75.101.241.138"; // IP de tu EC2 Backend

    const modifiedRequest = new Request(url, request);
    return fetch(modifiedRequest);
  }
};
