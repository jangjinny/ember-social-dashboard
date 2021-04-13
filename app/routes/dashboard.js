import Route from '@ember/routing/route';
import { artist } from '../data/artist';

export default class DashboardRoute extends Route {
  async model(params) {
    const {
      artist_id
    } = params;

    console.log(artist)
    return artist;
  }
}
