import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiString from 'chai-string';
import { enableFetchMocks } from 'jest-fetch-mock';

chai.use(sinonChai);
chai.use(chaiString);

enableFetchMocks();
