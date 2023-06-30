import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiString from 'chai-string';
import { enableFetchMocks } from 'jest-fetch-mock';
import { TextEncoder, TextDecoder } from 'util';


chai.use(sinonChai);
chai.use(chaiString);

enableFetchMocks();
Object.assign(global, { TextDecoder, TextEncoder });
