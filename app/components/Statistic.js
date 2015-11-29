'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'

var ParseComponent = ParseReact.Component(React);

class Statistic extends ParseComponent {

    constructor(props) {
        super(props);
        this.state = {
            "category": "",
            "level": ""
        };
    }

    observe(props, states) {
        return {
            items: new Parse.Query('Statistic')
        };
    }


    render() {

        if (this.data.items.length == 0)
            return <span>Loading</span>;

        // config filter
        let categories = [];
        this.data.items.forEach((e)=> {
            console.log(e);
            if (categories.indexOf(e.category) == -1)
                categories.push(e.category);
        });
        if (this.state.category == "")
            this.state.category = categories[0];
        let levels = [];
        this.data.items.forEach((e)=> {
            if (levels.indexOf(e.level) == -1)
                levels.push(e.level);
        });
        if (this.state.level == "")
            this.state.level = levels[0];

        // render filter
        let filter = (
            <form>
                <div>
                    <label htmlFor="category">Kategori</label>
                    <select id="category" onChange={this._onChangeCategory.bind(this)}>
                        {categories.map((category) => {
                            return <option key={category}
                                           value={category}>{category}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="level">Level</label>
                    <select id="level" onChange={this._onChangeLevel.bind(this)}>
                        {levels.map((level) => {
                            return <option key={level}
                                           value={level}>{level}</option>
                        })}
                    </select>
                </div>
            </form>
        );

        // render title
        let statToShow = this.data.items.find((e) => {
            if (e.category == this.state.category && e.level == this.state.level)
                return true;
            return false;
        });

        // render statistik
        let tableToShow = statToShow.data.map((e) => {
            return (
                <div className="row" key={e.name}>
                    <div className="small-12 large-6 columns">{e.name}</div>
                    <div className="small-12 large-6 columns">{e.value==undefined?0:e.value}</div>
                </div>
            )
        });

        // return
        return (
            <div>
                {filter}
                <h4>{statToShow.title}</h4>
                <div className="panel">{tableToShow}</div>
            </div>
        )
    }

    _onChangeCategory(e) {
        this.setState({"category": e.target.value});
    }

    _onChangeLevel(e) {
        this.setState({"level": e.target.value});
    }

}
Statistic.defaultProps = {type: undefined};
export default Statistic