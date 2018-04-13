import http from 'http';
import request from 'request';
import expect from 'expect';
import '../dist/index.js';


let options = {
  url: 'http://127.0.0.1:1337',
  headers: {
    'Content-Type': 'text/plain'
  }
};

describe('Example Node Server', () => {
  it('should return text', done => {
    request.get(options, function (err, res, body) {
      expect(res.statusCode).toEqual(200);
      console.log(body);
      expect(body.length).toBeGreaterThan(0);
      done();
    });
  });
});