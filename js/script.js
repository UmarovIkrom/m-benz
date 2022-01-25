require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from'./modules/tabs';
import slides from'./modules/slides';
import modal from'./modules/modal';
import loader from'./modules/loader';
import form from'./modules/form';
import data from'./modules/data';
import classes from'./modules/classes';
import accordion from'./modules/accordion';
import {openModal} from './modules/modal';

document.addEventListener("DOMContentLoaded", () => {
    const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 5000);

    tabs();
    slides();
    modal('[data-modal]', '.modal', modalTimer);    
    loader();    
    form(modalTimer);
    data();
    classes();    
    accordion();
}); 
    
    






























































