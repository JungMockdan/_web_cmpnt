
//iife
// const App = (function(){
//     ...function..
// })();
import { PIE, f } from './modules/a.mjs';
import someFunc, { CAKE } from './modules/b.js';

const App = (function () {
    document.addEventListener('DOMContentLoaded', () => {
        console.log(PIE);
        f();
        someFunc();
        console.log(CAKE);

    });

    let today = new Date();
    const KEY = 'jhj3245gj23h42j34';

    function init() {
        console.log('loaded');
        //function to start things off
        console.log(today.toLocaleDateString());
        //add some event listeners
        addListeners();
        //make a call to an API with a callback
        let url = `https://jsonplaceholder.typicode.com/posts?key=${KEY}`;
        getData(url, afterFetch);
    }

    function addListeners() {
        console.log('adding listeners to the page');
    }

    function getData(url, cb) {
        //do fetch call
        fetch(url)
            .then((res) => res.json())
            .then((content) => {
                //call function to add content
                //call the callback
                if (cb) {
                    cb();
                }
            })
            .catch((err) => console.error);
    }

    function afterFetch() {
        console.log('data fetch completed');
    }

    //접근제한
    return {
        getData,
        today,
        KEY,
    };


})();