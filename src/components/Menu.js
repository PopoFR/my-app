
import React, { useEffect, useState} from "react";
import * as Pixel from './PixelFactory.js';

import * as THREE from "three";
import TWEEN from '@tweenjs/tween.js'


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'

import * as PunkFactory from "./punk/PunkFactory.js";
import * as Export from "./Export"; 

import {TraitsGenerator} from "./punk/traits/TraitsGenerator.js"

import SelectList from './SelectList';


const hairs = require('./punk/traits/json/Hair.json');




const Menu = (props) => {

    const toogleHair = (e) => {
        props.toogleHair(e, "hair");
    }


    return (
        <SelectList title = "hairs" list = {hairs} type = "hair" toogle = {toogleHair}/>


    )
    
}

export default Menu;