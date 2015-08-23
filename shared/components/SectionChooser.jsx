import React from 'react';
import { Link } from 'react-router';
import * as SectionActions from 'actions/SectionActions';

export default class SectionChooser extends React.Component {
  render() {
    var sections = this.props.sections.toJS().map((item, index) => {
      var classes = (`${item.key}` === `${this.props.currentSection}`) ? 'selected' : '';
      return (
        <li className={classes} data-id={item.key} key={item.key}>
          <Link to={`/dashboard/section/${item.key}`}>{item.title}</Link>
        </li>
      );
    });
    return (
      <nav className="sections">
        <ul>
          {sections}
        </ul>
      </nav>
    );
  }
}
