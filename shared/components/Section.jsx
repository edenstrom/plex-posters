import React, { PropTypes } from 'react';
import MediaList from './MediaList';

export default class Section extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  updateMedia() {
    var id = this.context.router.state.params.id;
    var episodes = this.props.episodes[id] || [];
    if (episodes.length === 0) {
      this.props.loadMedia(id);
    }
  }

  componentDidMount() {
    this.updateMedia();
  }

  componentDidUpdate() {
    this.updateMedia();
  }

  render() {
    var id = this.context.router.state.params.id
    var episodes = this.props.episodes[id] || [];

    return <MediaList {...this.props} episodes={episodes}  />;
  }
}
