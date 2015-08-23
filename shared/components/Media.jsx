import React from 'react';
import config from '../../config';

export default class Media extends React.Component {

  componentDidMount() {
    this.preloadImage();
  }

  componentDidUpdate() {
    var image = this.refs.image.getDOMNode();
    var src = image.dataset.src;
    var oldSrc = image.getAttribute('src');

    if (src !== oldSrc) {
      var media = this.refs.media.getDOMNode();
      media.classList.remove('media-item--loaded');
      this.preloadImage();
    }

  }

  preloadImage() {
    var image = this.refs.image.getDOMNode();
    var media = this.refs.media.getDOMNode();

    var src = image.dataset.src;
    var oldSrc = image.src;

    var img = new Image();

    img.onload = function() {
      image.src = src;
      media.classList.add('media-item--loaded');
    };

    img.src = src;
  }

  handleClick(ev) {
    var media = this.refs.media.getDOMNode();
    var id = media.dataset.item;

    if (this.postersOpened()) {
      this.props.closePosters();
    } else {
      this.props.loadPosters(id);
    }
  }

  handlePosterBg(ev) {
    ev.stopPropagation();
    console.log(ev.target);
    this.props.closePosters();
  }

  handlePosterClick(ev) {
    ev.stopPropagation();
    let data = ev.target.dataset

    var id = data.item;
    let poster = data.poster;

    this.props.selectPoster(id, poster);
  }

  postersOpened() {
    let posters = this.props.posters[this.props.item.ratingKey] || {};
    let postersLoaded = typeof posters.opened !== 'undefined';

    return postersLoaded && posters.opened;
  }

  render() {
    let item = this.props.item;

    let id = item.ratingKey;

    let posters = this.props.posters[id] || {};

    var overlay = null;

    var opened = this.postersOpened();

    var openedClass = (opened) ? 'active' : '';

    if (opened) {
      overlay = posters.posters.map((item, index, what) => {
        var selectedClass = item.selected ? ' poster--selected' : '';
        var plexHost = `http://${config.host}:${config.port}`;
        return (
          <div className={`poster${selectedClass}`} key={item.key} onClick={this.handlePosterClick.bind(this)} data-item={id} data-poster={item.ratingKey}>
              <img src={`${plexHost}${item.thumb}`} />
          </div>
        );
      })
    }

    return (
      <div className="media-item" ref="media" onClick={this.handleClick.bind(this)} data-item={item.ratingKey}>
        <div className="media-item__inner">
          <img className="media-item__image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAZCAYAAADXPsWXAAAAAXNSR0IArs4c6QAAABtJREFUOBFjYBgFoyEwGgKjITAaAqMhMMRCAAAGvQAB4DzVfAAAAABJRU5ErkJggg==" data-src={this.getImage(item.thumb)} width="272" ref="image" />
          <div className="media-item__title">{item.title}</div>
        </div>
        <div className={`media-item__posters ${openedClass}`} onClick={this.handlePosterBg.bind(this)}>
          { overlay }
        </div>
      </div>
    );
  }

  getImage(input) {
    return `/api/v1${input}`;
  }
}
