import { expect } from 'chai';
import { HttpError } from '@35up/http-client';
import { handleApiError } from './errors';


describe('errors', () => {
  describe('handleApiError', () => {
    describe('the status code is 400', () => {
      const error = new HttpError(
        {errors: 'bla'},
        new Response(null, {status: 400}),
      );

      it('returns an Error with the errors data', async () => {
        expect(handleApiError(error))
          .to.be.an.instanceof(Error)
          .and.to.have.property('details', error.data.errors);
      });
    });

    describe('the status code is different', () => {
      const error = new HttpError(
        {errors: 'bla'},
        new Response(null, {status: 500}),
      );

      it('returns undefined', async () => {
        expect(handleApiError(error)).to.be.undefined;
      });
    });
  });
});
