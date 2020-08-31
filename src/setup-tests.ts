import { config } from 'dotenv';
import { join } from 'path';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiString from 'chai-string';
import { enableFetchMocks } from 'jest-fetch-mock';


config({path: join(process.cwd(), './env/.env.test')});

chai.use(sinonChai);
chai.use(chaiString);

enableFetchMocks();
