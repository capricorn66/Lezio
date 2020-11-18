// JavaScript Document

import $ from "jquery";
import Swiper from "swiper";
import debounce from 'lodash.debounce';
import "./hasAttr";
import {rwdMedia} from "./rwdMedia";
import {rippletInit} from './ripplet';
import './nav-scroll';
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/popover';
import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/tab';
import {addBackToTop} from 'vanilla-back-to-top';

window.debounce = debounce;
window.rwdMedia = rwdMedia;
window.rippletInit = rippletInit;
window.addBackToTop = addBackToTop;
window.Swiper = Swiper;

document.addEventListener('DOMContentLoaded', function() {

    window.onscroll = function() {handleHeader()};
    handleHeader();

    rippletInit();

    addBackToTop({
        diameter: 56,
        backgroundColor: '#FFFFFF',
        textColor: '#F28300',
        innerHTML: ''
    });

}, false);

function handleHeader() {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        document.body.className = "sm";
    } else {
        document.body.className = "";
    }
}
