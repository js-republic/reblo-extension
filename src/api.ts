import * as rp from 'request-promise';
import { RequestPromise } from 'request-promise';
import * as moment from 'moment';

import { RequestOptions, RequestOptionsBody } from './api.interface';
import { config } from './config';
import { Endpoint } from './endpoints';

export class Api {
  private readonly apiUrl: string = config.apiUrl;

  sendUser(userId: string): void {
    const body: RequestOptionsBody = {
      userId
    };
    this.post(Endpoint.SEND_USER, 'POST', body)
      .then((response: {}) => {
        console.log('send user response', response);
      })
      .catch((err: {}) => {
        console.log('err', err);
      });
  }

  sendLineOfCode(userId: string, lineOfCode: number): void {
    const timestamp: number = moment().valueOf();
    const body: RequestOptionsBody = {
      userId,
      timestamp,
      lineOfCode
    };

    this.post(Endpoint.SEND_LINE_OF_CODE, 'POST', body)
      .then((response: {}) => {
        console.log('send line of code response', response);
      })
      .catch((err: {}) => {
        console.log('err', err);
      });
  }

  sendFileChange(userId: string, filename: string, langage: string): void {
    const timestamp: number = moment().valueOf();

    const body: RequestOptionsBody = {
      userId,
      filename,
      langage,
      timestamp
    };

    this.post(Endpoint.SEND_FILE_CHANGE, 'POST', body)
      .then((response: {}) => {
        console.log('Send file change response', response);
      })
      .catch((err: {}) => {
        console.log('err', err);
      });
  }

  private post(
    uri: string,
    method: string,
    body: RequestOptionsBody
  ): RequestPromise {
    const options: RequestOptions = {
      method,
      uri: `${this.apiUrl}/${uri}`,
      json: true,
      body
    };

    console.log('request has been sent !!', uri, options);
    return rp(options);
  }
}
