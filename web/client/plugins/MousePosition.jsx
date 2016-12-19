/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
 /**
   * Plugins
   * @overview For detecting MousePosition On Map and display its x and y coordinates.
   * @name MousePositionPlugin module
   * @module  MousePositionPlugin
   * @requires react
   * @requires react-redux
   * @requires selectors/map
   * @requires reselect
   * @requires object-assign
   * @requires actions/mousePosition
   * @requires reducers/mousePosition
   * @requires locale/Message
   * @requires CRSSelector
   * @requires MousePosition
   * @requires ToggleButton
   *
   */
const React = require('react');

const {connect} = require('react-redux');
const {mapSelector} = require('../selectors/map');
const {createSelector} = require('reselect');

const assign = require('object-assign');

const {changeMousePositionCrs, changeMousePositionState} = require('../actions/mousePosition');
/** to get the desiredposition
 * @example
 * getDesiredPosition("map object", "current position on map", "req,res,showmarker")
 * // returns '{crs, pixel:{x, y}, x, y}'
 * @function getDesiredPosition
 * @param {object} map - map object.
 * @param {object} mousePosition - current position on map.
 * @param {object} mapInfo - request, response, showmarker
 * @return {object} position - {crs, pixel:{x, y}, x, y}
 */
const getDesiredPosition = (map, mousePosition, mapInfo) => {
    if (mousePosition.showCenter && map) {
        return map.center;
    }
    if (mousePosition.showOnClick) {
        if (mapInfo.clickPoint && mapInfo.clickPoint.latlng) {
            return {
                x: mapInfo.clickPoint.latlng.lng,
                y: mapInfo.clickPoint.latlng.lat,
                crs: "EPSG:4326"
            };
        }
        return {
            crs: "EPSG:4326"
        };
    }
    return mousePosition.position;
};
/**
 * check when mousePosition changes
 */
/**
 * This is just a constant.
 * You can attach interactive playgrounds with the @playground tag.
 * You can require any npm module and write real programs.
 *
 * @constant {string}
 * @default
 *
 * @playground
 * // Testing tonicdev
 * var numbers = require('numbers')
 * var x = numbers.calculus.Riemann(Math.sin, -2, 4, 200)
 * x++
 */
const selector = createSelector([
    mapSelector,
    (state) => state.mousePosition || {},
    (state) => state.mapInfo || {}
], (map, mousePosition, mapInfo) => ({
    enabled: mousePosition.enabled,
    mousePosition: getDesiredPosition(map, mousePosition, mapInfo),
    crs: mousePosition.crs || map && map.projection || 'EPSG:3857'
}));

/**
* For getting localized object
*/
const Message = require('./locale/Message');
/**
 * For checking when CRSSelector changes
*/
const CRSSelector = connect((state) => ({
    crs: state.mousePosition && state.mousePosition.crs || state.map && state.map.present && state.map.present.projection || 'EPSG:3857'
}), {
    onCRSChange: changeMousePositionCrs
})(require('../components/mapcontrols/mouseposition/CRSSelector'));
/**
* for setting state to show or hide mousePosition
* @param {object} state - mousePosition.
* @prop {string} pressedStyle - button should take "default" as default
* @prop {string} defaultStyle - button should be "primary" as default
* @prop {object} btnConfig - button should be "small" as default
*/
const MousePositionButton = connect((state) => ({
    pressed: state.mousePosition && state.mousePosition.enabled,
    active: state.mousePosition && state.mousePosition.enabled,
    pressedStyle: "default",
    defaultStyle: "primary",
    btnConfig: {
        bsSize: "small"}
}), {
    onClick: changeMousePositionState
})(require('../components/buttons/ToggleButton'));

const MousePositionPlugin = connect(selector)(require('../components/mapcontrols/mouseposition/MousePosition'));

module.exports = {
    MousePositionPlugin: assign(MousePositionPlugin, {
        Settings: {
            tool: <div id="mapstore-mousepositionsettings" key="mousepositionsettings">
            <CRSSelector
                key="crsSelector"
                enabled={true}
                inputProps={{
                    label: <Message msgId="mousePositionCoordinates" />
                }}
            />
            <MousePositionButton
                key="mousepositionbutton"
                isButton={true}
                text={<Message msgId="showMousePositionCoordinates" />}
            />
            </div>,
            position: 2
        }
    }),
    reducers: {mousePosition: require('../reducers/mousePosition')}
};
