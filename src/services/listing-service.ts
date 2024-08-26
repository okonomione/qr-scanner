import {config} from '../config/config';
import {IListing} from '../data/data';

export interface IListingService {
  getListing(listingId: string): Promise<IListing>;
}

export abstract class BaseService {
  protected async post(url: string): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cap-tok': 'M0onC@ke1',
      },
    });

    if (response.status !== 200) {
      console.log('Error fetching items', JSON.stringify(response, null, 2));
    }
    const jsonResponse = await response.json();

    return jsonResponse;
  }

  protected async get(url: string): Promise<any> {
    console.log('---------------------------------url 123', url);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-cap-tok': 'M0onC@ke1',
      },
    })
      .catch(e => {
        console.error(e);
        return e;
      })
      .then(r => {
        console.log('-----------------------', r);
        return r;
      });

    if (response.status !== 200) {
      console.log('Error fetching items', JSON.stringify(response, null, 2));
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  }
}

export class ListingService extends BaseService implements IListingService {
  getListing(listingId: string): Promise<IListing> {
    const url = config.serviceConfig.getListingUrl;
    return this.get(`${url}/${listingId}/AU`);
  }
}
