type BodyElement = string | number;

export interface RequestOptionsBody {
  [key: string]: BodyElement;
}

export interface RequestOptions {
  method: string;
  uri: string;
  body?: RequestOptionsBody | null;
  json?: boolean;
}
