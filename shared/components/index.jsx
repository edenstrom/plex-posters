import React, { PropTypes } from 'react';
import MediaList from 'components/MediaList';
import SectionChooser from 'components/SectionChooser';
import * as SectionActions from 'actions/SectionActions';

export default class AppView extends React.Component {

  constructor() {
    super();
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return (
      <div id="app-view">
        {this.props.children}
      </div>
    );
  }
}
