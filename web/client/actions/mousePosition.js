/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

 /**
  * Module representing actions of mousePosition.
  * @module web/client/actons/mousePosition
  */

const CHANGE_MOUSE_POSITION = 'CHANGE_MOUSE_POSITION';
const CHANGE_MOUSE_POSITION_CRS = 'CHANGE_MOUSE_POSITION_CRS';
const CHANGE_MOUSE_POSITION_STATE = 'CHANGE_MOUSE_POSITION_STATE';

/* action for changing mousePosition */
function changeMousePosition(position) {
    return {
        type: CHANGE_MOUSE_POSITION,
        position: position
    };
}

/* action for changing Coordinate Reference System */
function changeMousePositionCrs(crs) {
    return {
        type: CHANGE_MOUSE_POSITION_CRS,
        crs: crs
    };
}

/* action for changing state of enabled or disable mousePosition */
function changeMousePositionState(enabled) {
    return {
        type: CHANGE_MOUSE_POSITION_STATE,
        enabled: enabled
    };
}

module.exports = {
    CHANGE_MOUSE_POSITION,
    CHANGE_MOUSE_POSITION_CRS,
    CHANGE_MOUSE_POSITION_STATE,
    changeMousePosition,
    changeMousePositionCrs,
    changeMousePositionState
};
