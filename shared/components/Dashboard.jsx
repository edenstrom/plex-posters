import React, { PropTypes } from 'react';
import * as SectionActions from 'actions/SectionActions';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import SectionChooser from 'components/SectionChooser';
import Section from 'components/Section';

@connect(state => ({
  sections: state.sections,
  episodes: state.episodes,
  posters: state.posters,
}))
export default class Dashboard extends React.Component {
  static propTypes = {
    sections: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static get needs() {
    return [
      SectionActions.getSections
    ];
  }

  render() {
    const { sections, dispatch, currentSection, episodes, posters } = this.props;

    return (
      <div>
        <SectionChooser sections={sections} currentSection={currentSection}
          {...bindActionCreators(SectionActions, dispatch)} />

        <Section currentSection={currentSection}
          sections={sections}
          episodes={episodes}
          posters={posters}
          {...bindActionCreators(SectionActions, dispatch)} />
      </div>
    );
  }
}
