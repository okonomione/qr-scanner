import {config} from '../config/config';
import {IListing} from '../data/data';

export interface IListingService {
  getListing(listingId: string): Promise<IListing>;
}

export abstract class BaseService {
  protected async post(
    url: string,
    headers?: {[key: string]: string},
  ): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cap-tok': 'M0onC@ke1',
        ...headers,
      },
    });

    if (response.status !== 200) {
      console.log('Error fetching items', JSON.stringify(response, null, 2));
    }
    const jsonResponse = await response.json();

    return jsonResponse;
  }

  protected async get(url: string, headers?: any): Promise<any> {
    const header = {
      'Content-Type': 'application/json',
      'x-cap-tok': 'M0onC@ke1',
      ...headers,
    };

    const response = await fetch(url, {headers: header})
      .catch(e => {
        console.error(e);
        return e;
      })
      .then(r => {
        return r;
      });

    if (response.status !== 200) {
      console.error('headers', header);
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

export class AnalyticsService extends BaseService {
  async getGraphData(id: string, grade: number): Promise<any> {
    const url = config.serviceConfig.getMarketDataGraph;

    const ident = Buffer.from(id).toString('base64');
    const gde = Buffer.from(grade.toString()).toString('base64');

    return this.get(url, {
      'x-q-cid': ident,
      'x-q-cgde': gde,
    });
  }

  async getSummaryData(id: string, grade: number): Promise<any> {
    const url = config.serviceConfig.getMarketDataSummary;

    const ident = Buffer.from(id).toString('base64');
    const gde = Buffer.from(grade.toString()).toString('base64');

    return this.get(url, {
      'x-q-cid': ident,
      'x-q-cgde': gde,
    });
  }
}
