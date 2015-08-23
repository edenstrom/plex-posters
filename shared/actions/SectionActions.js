import request from 'axios';
import config from '../../config';

let devmode = false;

if (typeof DEV !== 'undefined') {
  devmode = DEV;
}

var host = `http://localhost:${config.server.prodPort}`;

if (devmode) {
  host = `http://localhost:${config.server.devPort}`;
}

function apiGet(uri) {
  return request.get(`${host}/api/v1/${uri}`);
}

function apiPut(uri, data) {
  return request.put(`${host}/api/v1/${uri}`, data);
}

export function getSections() {
  return {
    type: 'GET_SECTIONS',
    promise: apiGet('sections')
  };
}

export function selectSection(id) {
  return {
    type: 'SELECT_SECTION',
    id
  };
}

export function loadMedia(id) {
  return {
    type: 'GET_MEDIA',
    promise: apiGet(`media/${id}`),
    id
  };
}

export function loadPosters(id) {
  return {
    type: 'LOAD_POSTERS',
    promise: apiGet(`posters/${id}`),
    id
  };
}

export function closePosters() {
  return {
    type: 'CLOSE_POSTERS'
  };
}

export function selectPoster(id, poster) {
  return {
    type: 'SELECT_POSTER',
    promise: apiPut(`posters/${id}`, { poster }),
    id,
    poster
  };
}
