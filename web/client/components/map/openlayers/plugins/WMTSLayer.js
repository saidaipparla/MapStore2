/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var Layers = require('../../../../utils/openlayers/Layers');
var ol = require('openlayers');
var objectAssign = require('object-assign');
const CoordinatesUtils = require('../../../../utils/CoordinatesUtils');
const ProxyUtils = require('../../../../utils/ProxyUtils');
const {isArray} = require('lodash');
const SecurityUtils = require('../../../../utils/SecurityUtils');
const mapUtils = require('../../../../utils/MapUtils');

function tileMatrixValue(option) {
    const length = option.length;
    for (let i = 0; i < length; i++) {
        if (option[i].TileMatrixSet === "EPSG:900913") {
            if (option[i].TileMatrixSetLimits) {
                const inner = option[i].TileMatrixSetLimits.TileMatrixLimits;
                for (let ii = 0; ii < inner.length; ii++) {
                    return inner[ii].TileMatrix;
                }
            }
        }
    }
}

function tileMatrixIds(option) {
    const length = option.length;
    for (let i = 0; i < length; i++) {
        if (option[i].TileMatrixSet === "EPSG:900913") {
            if (option[i].TileMatrixSetLimits) {
                const inner = option[i].TileMatrixSetLimits.TileMatrixLimits;
                let matrixIds = new Array(inner.length);
                for (let ii = 0; ii < inner.length; ++ii) {
                    matrixIds[ii] = inner[ii].TileMatrix;
                    return matrixIds;
                }
                return inner;
            }
        }
    }
}

function wmtsToOpenlayersOptions(options) {
    return objectAssign({}, options.baseParams, {
        layer: options.name,
        style: options.style || "",
        format: options.format || 'image/png',
        Service: "WMTS",
        transparent: options.transparent !== undefined ? options.transparent : true,
        tiled: options.tiled !== undefined ? options.tiled : true,
        Request: "GetTile",
        version: options.version || "1.0.0",
        tilematrixset: CoordinatesUtils.normalizeSRS(options.srs || 'EPSG:3857', options.allowedSRS),
        tileSize: options.tileSize || 256,
        TileMatrix: tileMatrixValue(options.TileMatrix)
    }, options.params || {});
}

function getWMTSURLs( urls ) {
    return urls.map((url) => url.split("\?")[0]);
}

// Works with geosolutions proxy
function proxyTileLoadFunction(imageTile, src) {
    var newSrc = src;
    if (ProxyUtils.needProxy(src)) {
        let proxyUrl = ProxyUtils.getProxyUrl();
        newSrc = proxyUrl + encodeURIComponent(src);
    }
    imageTile.getImage().src = newSrc;
}

Layers.registerType('wmts', {
    create: (options, map) => {
        const urls = getWMTSURLs(isArray(options.url) ? options.url : [options.url]);
        const queryParameters = wmtsToOpenlayersOptions(options) || {};
        urls.forEach(url => SecurityUtils.addAuthenticationParameter(url, queryParameters));
        if (options.singleTile) {
            return new ol.layer.Image({
                opacity: options.opacity !== undefined ? options.opacity : 1,
                visible: options.visibility !== false,
                zIndex: options.zIndex,
                source: new ol.source.ImageWMS({
                    url: urls[0],
                    params: queryParameters
                })
            });
        }
        const mapSrs = map && map.getView() && map.getView().getProjection() && map.getView().getProjection().getCode() || 'EPSG:3857';
        const extent = ol.proj.get(CoordinatesUtils.normalizeSRS(options.srs || mapSrs, options.allowedSRS)).getExtent();
        return new ol.layer.Tile({
            opacity: options.opacity !== undefined ? options.opacity : 1,
            visible: options.visibility !== false,
            zIndex: options.zIndex,
            source: new ol.source.WMTS(objectAssign({
              urls: urls,
              layer: options.name,
              matrixSet: CoordinatesUtils.normalizeSRS(options.srs || 'EPSG:3857', options.allowedSRS),
              format: 'image/png',
              tileGrid: new ol.tilegrid.WMTS({
                  extent: extent,
                  resolutions: mapUtils.getResolutions(),
                  tileSize: options.tileSize ? options.tileSize : 256,
                  origin: options.origin ? options.origin : [extent[0], extent[1]],
                  matrixIds: tileMatrixIds(options.TileMatrix)
              }),
              params: queryParameters
            }, (options.forceProxy) ? {tileLoadFunction: proxyTileLoadFunction} : {}))
        });
    },
    update: (layer, newOptions, oldOptions) => {
        if (oldOptions && layer && layer.getSource() && layer.getSource().updateParams) {
            let changed = false;
            if (oldOptions.params && newOptions.params) {
                changed = Object.keys(oldOptions.params).reduce((found, param) => {
                    if (newOptions.params[param] !== oldOptions.params[param]) {
                        return true;
                    }
                    return found;
                }, false);
            } else if (!oldOptions.params && newOptions.params) {
                changed = true;
            }
            let oldParams = wmtsToOpenlayersOptions(oldOptions);
            let newParams = wmtsToOpenlayersOptions(newOptions);
            changed = changed || ["LAYERS", "STYLES", "FORMAT", "TRANSPARENT", "TILED", "VERSION" ].reduce((found, param) => {
                if (oldParams[param] !== newParams[param]) {
                    return true;
                }
                return found;
            }, false);

            if (changed) {
                layer.getSource().updateParams(objectAssign(newParams, newOptions.params));
            }
        }
    }
});
