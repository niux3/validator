import { polyfills } from './polyfills';
import { pageValidator } from './pages/page-validator';


polyfills();
window.addEventListener('DOMContentLoaded',(e)=>{
    pageValidator();
});
