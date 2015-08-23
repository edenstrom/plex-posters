import axios from 'axios';
import sharp from 'sharp';
import path from 'path';
import request from 'request';

var fs = require('fs');

export default class PlexAPI {
  constructor(settings = {}) {
    this.host = settings.host || '127.0.0.1';
    this.port = settings.port || 32400;
    this.section = settings.section || 1;
    this.handledImage = false;
    this.cacheDir = settings.cacheDir || './cache';
  }

  sections(section = null) {
    return new Promise((resolve, reject) => {
      this.api('library/sections')
        .then(this.getChildren)
        .then(resolve);
    });
  }

  episodes(section) {
    return new Promise((resolve, reject) => {
      this.api(`library/sections/${section}/all`).then(resolve);
    });
  }



  changePoster(media, poster) {

  }

  getPosters(id) {
    return new Promise((resolve, reject) => {
      this.api(`library/metadata/${id}/posters`).then(resolve);
    });
  }

  api(uri, respType = 'json') {
    var url = this.makeURL(uri);
    console.log(url);
    return axios.get(url, {
      responseType: respType,
      headers: {'Accept': 'application/json'}
    });
  }

  apiPut(uri, respType = 'json') {
    var url = this.makeURL(uri);
    return axios.put(url, {}, {
      responseType: respType,
      headers: {'Accept': 'application/json'}
    });
  }

  posters(id) {
    return this.api(`library/metadata/${id}/posters`).then(function(res) {
      return res.data._children;
    });
  }

  setPoster(id, poster) {
    // Send poster.ratingKey here
    return this.apiPut(`library/metadata/${id}/poster?url=${poster}`).then(function(res) {
      return {
        poster: res.data,
        id
      };
    });
  }

  thumbnail(id, media) {
    var rs = null;
    return new Promise((resolve, reject) => {
      var cacheFile = path.join(this.cacheDir, `./cache/${id}-${media}.jpg`);
      rs = fs.createReadStream(cacheFile, {
        autoClose: true
      });

      rs.on('open', function() {
        resolve(rs);
      });

      rs.on('error', (fileError) => {
        const url = this.makeURL(`library/metadata/${id}/thumb/${media}`);
        request({
          url: url,
          encoding: null
        }, (err, resp, buffer) => {
          if (err) { return console.log(err); }

          this.processImage(buffer, cacheFile).then(resolve);
        });
      });


      //
      // file.on('error', function(err) {
      //   console.log('ERROR', err);
      // });

        // .then(this.processImage.bind(this))
        // .then(resolve);

      // this.api(`library/metadata/${id}/thumb/${media}`, 'blob')
    });
  }

  processImage(buffer, filename) {
    this.handledImage = true;

    var promise = new Promise((resolve, reject) => {
      let imgData = '';
      let stream = sharp(buffer)
        .resize(null, 400)
        .progressive();

      let ws = fs.createWriteStream(filename, {
        autoClose: true
      });

      stream.pipe(ws);

      resolve(stream);
    });

    return promise;
  }

  makeURL(uri) {
    return `http://${this.host}:${this.port}/${uri}`;
  }

  getChildren(data) {
    return data.data._children;
  }
}
