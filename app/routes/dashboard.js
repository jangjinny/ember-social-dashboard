import Route from '@ember/routing/route';

export default class DashboardRoute extends Route {
  model(params) {
    const {
      artist_id
    } = params;
    return artist_id;
  }
}
