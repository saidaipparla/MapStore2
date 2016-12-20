/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var BootstrapReact = require('react-bootstrap');
var {Input} = BootstrapReact;
var CoordinatesUtils = require('../../../utils/CoordinatesUtils');
/**
* some description goes here
* @name CRSSelector
* @class
* @memberof module:components
*/
let CRSSelector = React.createClass({
    /**
    *
    * @prop {string} propTypes.id - unique id
    * @prop {object} propTypes.inputProps - list of crs list
    * @prop {object} propTypes.availableCRS - availableCRS list
    * @prop {string} propTypes.crs - default or dynamic crs value
    * @prop {bool} propTypes.enabled - button enabled or not
    * @prop {func} propTypes.onCRSChange - action of CRS change
    * @prop {bool} propTypes.useRawInput - useRawInput status
    * @default
    */
    propTypes: {
        id: React.PropTypes.string,
        inputProps: React.PropTypes.object,
        availableCRS: React.PropTypes.object,
        crs: React.PropTypes.string,
        enabled: React.PropTypes.bool,
        onCRSChange: React.PropTypes.func,
        useRawInput: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
             /** @default "mapstore-crsselector" */
            id: "mapstore-crsselector",
            /** @default CoordinatesUtils.getAvailableCRS() */
            availableCRS: CoordinatesUtils.getAvailableCRS(),
            /** @default null */
            crs: null,
             /** @default {} */
            onCRSChange: function() {},
            /** @default false */
            enabled: false,
             /** @default false */
            useRawInput: false
        };
    },
    /**
     * Renders the component.
     *@return {object} - HTML markup for the component
     */
    render() {
        var val;
        var label;
        var list = [];
        for (let crs in this.props.availableCRS) {
            if (this.props.availableCRS.hasOwnProperty(crs)) {
                val = crs;
                label = this.props.availableCRS[crs].label;
                list.push(<option value={val} key={val}>{label}</option>);
            }
        }
        if (this.props.enabled && this.props.useRawInput) {
            return (
                <select
                    id={this.props.id}
                    value={this.props.crs}
                    onChange={this.launchNewCRSAction}
                    bsSize="small"
                    {...this.props.inputProps}>
                    {list}
                </select>);
        } else if (this.props.enabled && !this.props.useRawInput) {
            return (
                <Input
                  type="select"
                  id={this.props.id}
                  value={this.props.crs}
                  onChange={this.launchNewCRSAction}
                  bsSize="small"
                  {...this.props.inputProps}>
                  {list}
              </Input>);
        }
        return null;
    },
    /** for launchNewCRSAction
   * @function launchNewCRSAction
   * @param {object} ev - changed CRSSelector configuration
   * @return {object} launchNewCRSAction - latest CRSSelector
   */
    launchNewCRSAction(ev) {
        if (this.props.useRawInput) {
            this.props.onCRSChange(ev.target.value);
        } else {
            let element = ReactDOM.findDOMNode(this);
            let selectNode = element.getElementsByTagName('select').item(0);
            this.props.onCRSChange(selectNode.value);
        }
    }
});

module.exports = CRSSelector;
