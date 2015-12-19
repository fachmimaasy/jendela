import Parse from 'parse';
import ParseReact from 'parse-react';
import React from 'react';
import { Component } from 'react';

import StringConstants from '../../constants/StringConstants';
import { m } from '../../helper';

const styles = {
  text: {
    color: '#7385A2',
    textTransform: 'uppercase',
    fontWeight: 900,
    fontSize: '0.9em',
    letterSpacing: '1px'
  },
  select: {
    backgroundColor: 'inherit',
    border: 'none',
    marginBottom: '1em',
    cursor: 'pointer'
  },
  label: {
    paddingTop: '0.45em',
    paddingLeft: '1.7em'
  }
};

class ReviewFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'sortBasedOn': StringConstants.TIME,
      'province': props.province ? props.province : undefined
    };
  }

  render() {
    let reviewType = this.props.reviewType;
    let filters = [];

    if (reviewType === 'location' || reviewType === 'compact') {
      filters.push(generateComboObj(StringConstants.PROVINCE, this.props.provinces, this._onChangeProvince.bind(this), this.state.province));
      filters.push(generateComboObj(StringConstants.CITY, this.props.cities, this._onChangeCity.bind(this)));
    }

    if (reviewType === 'others' || reviewType === 'compact') {
      filters.push(generateComboObj(StringConstants.SERVICE, this.props.services, this._onChangeService.bind(this)));
      filters.push(
        <div style={styles.label} className="large-1 columns" key={StringConstants.SORT_BASED_ON + 'Label'}>
          <span style={styles.text}>{StringConstants.SORT_BASED_ON}</span>
        </div>);
      filters.push(generateComboStr(StringConstants.SORT_BASED_ON, this.props.sortBasedOn, this._onChangeSortBasedOn.bind(this)));
    }

    return (
      <div className="row">
        {filters}
      </div>
    );
  }

  _onChangeProvince(e) {
    this.setState({'province': e.target.value});
    this._submit('province', e.target.value);
  }

  _onChangeCity(e) {
    this.setState({'city': e.target.value});
    this._submit('city', e.target.value);
  }

  _onChangeService(e) {
    this.setState({'service': e.target.value});
    this._submit('service', e.target.value);
  }

  _onChangeSortBasedOn(e) {
    this.setState({'sortBasedOn': e.target.value});
    this._submit('sortBasedOn', e.target.value);
  }

  _submit(key, value) {
    var toSubmit = {
      'province': this.state.province,
      'city': this.state.city,
      'service': this.state.service,
      'sortBy': this.state.sortBy,
      'sortBasedOn': this.state.sortBasedOn,
    };
    toSubmit[key] = value;
    this.props.submit(toSubmit);
  }

}

function generateComboObj(type, list, onchange, value) {
  return (
    <div className="small-12 medium-6 large-3 columns" key={type}>
      <select id="province" onChange={onchange} style={ m(styles.text, styles.select) } value={value}>
        <option key="all" value="all">{StringConstants.ALL} {type}</option>
        {list.map((e) => {
          return <option key={e.objectId} value={e.objectId}>{e.name}</option>;
        })}
      </select>
    </div>
  );
}

function generateComboStr(type, list, onchange) {
  return (
    <div className="large-2 columns" key={type}>
      <select id="province" onChange={onchange} style={ m(styles.text, styles.select) }>
        {list.map((e) => {
          return <option key={e} value={e}>{e}</option>;
        })}
      </select>
    </div>
  );
}

ReviewFilter.defaultProps = {
  provinces: [],
  cities: [],
  services: [],
  sortBasedOn: [StringConstants.TIME, StringConstants.FEE, StringConstants.RATING]
};
export default ReviewFilter;
