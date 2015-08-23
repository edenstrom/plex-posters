import React from 'react';
import Media from 'components/Media';
import InlineSVG from 'react-inlinesvg';

export default class MediaList extends React.Component {
  handlePosterBg(ev) {
    ev.stopPropagation();
    this.props.closePosters();
  }

  render() {
    let items = this.props.episodes.map((item) => {
      return <Media {...this.props} item={item} key={item.ratingKey}  />;
    });

    var openPoster = (this.props.posters.opened) ? ' poster-open' : '';

    return (
      <div>
        <div className={`media-posters-bg${openPoster}`}
          onClick={this.handlePosterBg.bind(this)}></div>
        <div className={`media-posters__close${openPoster}`}
          onClick={this.handlePosterBg.bind(this)}>
            <InlineSVG src="/assets/cross.svg"></InlineSVG>
          </div>
        <div className={`media-list${openPoster}`}>
          {items}
        </div>
      </div>

    );
  }
}
