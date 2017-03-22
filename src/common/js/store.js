/*
* @Author: anchen
* @Date:   2017-03-21 17:06:10
* @Last Modified by:   anchen
* @Last Modified time: 2017-03-21 22:18:38
*/

'use strict';
export  function saveToLocal(id,key,value){
    var seller = window.localStorage.__seller__;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = value;
    window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {
    var seller = window.localStorage.__seller__;
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return def;
    }
    var ret = seller[key];
    return ret || def;
};
