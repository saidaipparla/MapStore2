/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
 /**
  * A module for setting state of mousePosition
  * @module web/client/components/mapcontrols/mouseposition/MousePosition
  */
var {
    CHANGE_MOUSE_POSITION,
    CHANGE_MOUSE_POSITION_CRS,
    CHANGE_MOUSE_POSITION_STATE
} = require('../actions/mousePosition');

const assign = require('object-assign');
/* setting state by user action */
function mousePosition(state = {enabled: true, position: null, crs: null}, action) {
    switch (action.type) {
        case CHANGE_MOUSE_POSITION_STATE:
            return assign({}, state, {
                enabled: action.enabled
            });
        case CHANGE_MOUSE_POSITION:
            return assign({}, state, {
                position: action.position
            });
        case CHANGE_MOUSE_POSITION_CRS:
            return assign({}, state, {
                crs: action.crs
            });
        default:
            return state;
    }
}

module.exports = mousePosition;
