import HttpClient from './httpClient';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('HttpClient', () => {
  it('Metod GET', () => {
    const httpClient = new HttpClient('');
    const requestSpy = sinon.spy(httpClient, 'request');
    httpClient.get('/test');

    chai.expect(requestSpy).to.have.been.calledWith('https://ya-praktikum.tech/api/v2/test', { method: 'GET' });
  });

  it('Metod PUT', () => {
    const httpClient = new HttpClient('');
    const requestSpy = sinon.spy(httpClient, 'request');
    httpClient.put('/test');

    chai.expect(requestSpy).to.have.been.calledWith('https://ya-praktikum.tech/api/v2/test', {
      method: 'PUT',
    });
  });

  it('Metod POST', () => {
    const httpClient = new HttpClient('');
    const requestSpy = sinon.spy(httpClient, 'request');
    httpClient.post('/test');

    chai.expect(requestSpy).to.have.been.calledWith('https://ya-praktikum.tech/api/v2/test', { method: 'POST' });
  });

  it('Metod DELETE', () => {
    const httpClient = new HttpClient('');
    const requestSpy = sinon.spy(httpClient, 'request');
    httpClient.delete('/test', {});

    chai.expect(requestSpy).to.have.been.calledWith('https://ya-praktikum.tech/api/v2/test', { method: 'DELETE' });
  });
});
