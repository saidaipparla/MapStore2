/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = require('react');
var BootstrapReact = require('react-bootstrap');
var Label = BootstrapReact.Label;
var ReactIntl = require('react-intl');
var FormattedNumber = ReactIntl.FormattedNumber;
/**
* some description goes here
* @name MousePositionLabelYX
* @class
* @memberof module:components
*/
var MousePositionLabelYX = React.createClass({
    /**
    *
    * @prop {number} propTypes.x - current x
    * @prop {number} propTypes.y - current y
    * @default
    */
    propTypes: {
        position: React.PropTypes.shape({
            x: React.PropTypes.number,
            y: React.PropTypes.number
        })
    },
    /**
    * Renders the component.
    *@return {object} - HTML markup for the component with new x and y of map
    */
    render() {
        let format = {style: "decimal", minimumIntegerDigits: 2, maximumFractionDigits: 2, minimumFractionDigits: 2};
        return (
             <h5>
                <Label bsSize="lg" bsStyle="info">
                    <span>X: </span><FormattedNumber key="x" {...format} value={this.props.position.x} />
                    <span className="mouseposition-separator"/>
                    <span> Y: </span><FormattedNumber key="y" {...format} value={this.props.position.y} />
                </Label>
            </h5>);
    }
});
module.exports = MousePositionLabelYX;
