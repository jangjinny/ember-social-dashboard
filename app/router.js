import EmberRouter from '@ember/routing/router';
import config from 'ember-social-dashboard/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('dashboard', { path: '/dashboard/:artist_id'});
  this.route('not-found', { path: '/*path' });
});
