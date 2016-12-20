/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = require('react');
var {Button, Glyphicon, OverlayTrigger} = require('react-bootstrap');
var ImageButton = require('./ImageButton');
/**
* some description goes here
* @name ToggleButton
* @class
* @memberof module:components
*/
var ToggleButton = React.createClass({
    /**
     *
     * @prop {string} propTypes.id - unique id for button
     * @prop {object} propTypes.btnConfig - basic properties of button
     * @prop {string | element} text - button text
     * @prop {string | element} help - button help text
     * @prop {string} propTypes.glyphicon - text of icon
     * @prop {bool} propTypes.pressed - status of ToggleButton
     * @prop {func} propTypes.onClick - action of ToggleButton
     * @prop {element} propTypes.tooltip - tooltip element
     * @prop {element} propTypes.tooltipPlace - tooltipplace element
     * @prop {element} propTypes.style - tooltip element style
     * @prop {image | normal} btnType - button type as image
     * @prop {string} propTypes.image - image button text
     * @prop {string} propTypes.pressedStyle - button style when pressed
     * @prop {string} propTypes.defaultStyle - button style by default
     * @default
     */
    propTypes: {
        id: React.PropTypes.string,
        btnConfig: React.PropTypes.object,
        text: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
        help: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
        glyphicon: React.PropTypes.string,
        pressed: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        tooltip: React.PropTypes.element,
        tooltipPlace: React.PropTypes.string,
        style: React.PropTypes.object,
        btnType: React.PropTypes.oneOf(['normal', 'image']),
        image: React.PropTypes.string,
        pressedStyle: React.PropTypes.string,
        defaultStyle: React.PropTypes.string
    },
    getDefaultProps() {
        return {
            /** @default {} */
            onClick: () => {},
            /** @default false */
            pressed: false,
            /** @default "top" */
            tooltipPlace: "top",
            /** @default "100%" */
            style: {width: "100%"},
            /** @default 'normal' */
            btnType: 'normal',
            /** @default 'primary' */
            pressedStyle: 'primary',
            /** @default 'default' */
            defaultStyle: 'default'
        };
    },
     /** for ToggleButton Action */
    onClick() {
        this.props.onClick(!this.props.pressed);
    },
    /** for rendering normal button
   * @function renderNormalButton
   * @param {object} state - if btnType is equal to normal
   * @return {object} renderNormalButton - render normal button
   */
    renderNormalButton() {
        return (
            <Button id={this.props.id} {...this.props.btnConfig} onClick={this.onClick} bsStyle={this.props.pressed ? this.props.pressedStyle : this.props.defaultStyle} style={this.props.style}>
                {this.props.glyphicon ? <Glyphicon glyph={this.props.glyphicon}/> : null}
                {this.props.glyphicon && this.props.text && !React.isValidElement(this.props.text) ? "\u00A0" : null}
                {this.props.text}
                {this.props.help}
            </Button>
        );
    },
    /** for renderImageButton
   * @function renderImageButton
   * @return {object} renderImageButton - render image button
   */
    renderImageButton() {
        return (
            <ImageButton id={this.props.id} image={this.props.image} onClick={this.onClick} style={this.props.style}/>
        );
    },
    /** for addTooltip
   * @function addTooltip
   * @param {object} btn - btn place configuration
   * @return {object} addTooltip - it displays the OverlayTrigger on top of button
   */
    addTooltip(btn) {
        return (
            <OverlayTrigger placement={this.props.tooltipPlace} key={"overlay-trigger." + this.props.id} overlay={this.props.tooltip}>
                {btn}
            </OverlayTrigger>
        );
    },
    /**
    * Renders the component.
    *@return {object} - HTML markup for the component
    */
    render() {
        var retval;
        var btn = this.props.btnType === 'normal' ? this.renderNormalButton() : this.renderImageButton();
        if (this.props.tooltip) {
            retval = this.addTooltip(btn);
        } else {
            retval = btn;
        }
        return retval;

    }
});

module.exports = ToggleButton;
