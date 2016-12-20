/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
 /**
 * @overview list of plugins used for mapstore2
 * @name plugins
 * @module plugins
 */
module.exports = {
    plugins: {
        MapPlugin: require('../../plugins/Map'),
        MousePositionPlugin: require('../../plugins/MousePosition'),
        MapLoadingPlugin: require('../../plugins/MapLoading'),
        ZoomAllPlugin: require('../../plugins/ZoomAll'),
        ZoomInPlugin: require('../../plugins/ZoomIn'),
        ZoomOutPlugin: require('../../plugins/ZoomOut'),
        SearchPlugin: require('../../plugins/Search'),
        ScaleBoxPlugin: require('../../plugins/ScaleBox'),
        ToolbarPlugin: require('../../plugins/Toolbar'),
        DrawerMenuPlugin: require('../../plugins/DrawerMenu'),
        BurgerMenuPlugin: require('../../plugins/BurgerMenu'),
        OmniBarPlugin: require('../../plugins/OmniBar'),
        LocatePlugin: require('../../plugins/Locate'),
        IdentifyPlugin: require('../../plugins/Identify'),
        TOCPlugin: require('../../plugins/TOC'),
        RasterStylerPlugin: require('../../plugins/RasterStyler'),
        BackgroundSwitcherPlugin: require('../../plugins/BackgroundSwitcher'),
        MeasurePlugin: require('../../plugins/Measure'),
        PrintPlugin: require('../../plugins/Print'),
        SnapshotPlugin: require('../../plugins/Snapshot'),
        ShapeFilePlugin: require('../../plugins/ShapeFile'),
        MetadataExplorerPlugin: require('../../plugins/MetadataExplorer'),
        SettingsPlugin: require('../../plugins/Settings'),
        ExpanderPlugin: require('../../plugins/Expander'),
        HelpPlugin: require('../../plugins/Help'),
        HomePlugin: require('../../plugins/Home'),
        LoginPlugin: require('../../plugins/Login')
    },
    requires: {}
};
