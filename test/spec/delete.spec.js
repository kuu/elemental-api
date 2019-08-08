const test = require('ava');
const sinon = require('sinon');
const rewire = require('rewire');

test('delete', async t => {
  const host = 'example.com';
  const user = 'John';
  const pass = 'Password';
  const path = '/path/to/endpoint';
  const params = {abc: 'def', ghi: 123};
  const options = {secure: true};
  const mockFetch = {
    fetch() {
      // console.log(`[mockFetch] url=${url}, params=${params}`);
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        headers: {
          get: h => {
            const header = h.toLowerCase();
            if (header === 'content-type') {
              return 'application/xml';
            }
            return 0;
          }
        },
        body: {
          dataHandler: null,
          on: bodyOn
        }
      });
    }
  };
  function bodyOn(type, handler) {
    if (type === 'data') {
      this.dataHandler = handler;
    } else if (type === 'end') {
      process.nextTick(() => {
        this.dataHandler(Buffer.from('abc'));
        handler();
      });
    }
    return {dataHandler: this.dataHandler, on: bodyOn};
  }
  const spyFetch = sinon.spy(mockFetch, 'fetch');
  const mockRequest = rewire('../../lib/request');
  mockRequest.__set__({fetch: mockFetch.fetch});
  const ElementalApi = rewire('../../lib');
  const {ParallelStream} = mockRequest;
  ElementalApi.__set__({ParallelStream});
  const api = new ElementalApi(host, user, pass, options);
  const result = await api.delete(path, params);
  t.is(result, 'abc');
  t.is(spyFetch.callCount, 1);
  t.is(spyFetch.getCall(0).args[0], `https://${host}${path}?abc=def&ghi=123`);
  t.is(spyFetch.getCall(0).args[1].method, 'DELETE');
});
