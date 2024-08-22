import {ISearchResultItem} from '../data/data';

export interface IListingService {
  getListings(): Promise<ISearchResultItem[]>;
}

export abstract class BaseService {
  public fetchItems = async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-cap-tok': 'M0onC@ke1',
          x_q_f: 'Kjoq',
          x_q_re: 'Kjoq',
          x_q_c: '0',
        },
      });

      if (response.status !== 200) {
        console.log('Error fetching items', response);
      }

      const jsonResponse = await response.json();
      return jsonResponse.response?.docs
        .map((d: any) => ({
          ...d,
          ran: Math.random(),
        }))
        .sort((a: any, b: any) => a.ran - b.ran);
    } catch (error) {
      console.log('Error fetching items', error);
    }
    return null;
  };
}

export class ListingService extends BaseService implements IListingService {
  getListings(): Promise<ISearchResultItem[]> {
    return this.fetchItems(
      'https://collector-spoke-apim.azure-api.net/slr/l/s/listing-search',
    );
  }
}
