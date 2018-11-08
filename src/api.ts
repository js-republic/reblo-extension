import * as rp from 'request-promise';
import { RequestPromise } from 'request-promise';
import * as moment from 'moment';

import { RequestOptions, RequestOptionsBody } from './api.interface';
import { config } from './config';
import { Endpoint } from './endpoints';

export class Api {
  private readonly apiUrl: string = config.apiUrl;

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
        console.log('response', response);
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

    console.log('request has been sent !!', options);
    return rp(options);
  }
}
