import { polyfills } from './polyfills';

//import {Accordeon} from './libs/accordeon/Accordeon';
import { pageValidator } from './pages/page-validator';


polyfills();
window.addEventListener('DOMContentLoaded',(e)=>{

    pageValidator();
});
