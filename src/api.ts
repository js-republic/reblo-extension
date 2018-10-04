import * as rp from 'request-promise';
import { config } from './config';
import { Endpoint } from './endpoints';

interface RpOptionsBody {
	[key: string]: string;
}

interface RpOptions {
	method: string;
	uri: string;
	body?: RpOptionsBody | null;
	json?: boolean;
}

export class Api {

	apiUrl: string = config.apiUrl;

	sendFileChange(userId: string): void {

		const body: RpOptionsBody = {
			userId,
		};

		this.post(Endpoint.SEND_FILE_CHANGE, 'POST', body);
	}

	post(uri: string, method: string, body: RpOptionsBody) {

		const options: RpOptions = {
		    method,
		    uri: `${this.apiUrl}/${uri}`,
		    json: true,
		    body,
		};

		console.log('options', options);

		rp(options).then((response: any) => {
			console.log('response', response);
		}).catch((err: any) => {
			console.log('err', err);
		});
	}
}
