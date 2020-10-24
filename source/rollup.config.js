import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import { terser } from "rollup-plugin-terser";
import commonjs from 'rollup-plugin-commonjs';


let pluginsLists = [
    resolve(),
    commonjs({
        include: 'node_modules/**',
    }),
    babel({
        exclude: 'node_modules/**'
    }),
    terser(),
    scss({
        output:'../example/css/min.css',
        failOnError: true,
        watch: './scss/',
        outputStyle: "compressed",
    })
];

export default [{
        input: './js/index.js',
        output: {
            format: 'iife',
            file: '../example/js/validator.min.js',
            name: 'validator'
        },
        plugins: pluginsLists
    },
    {
        input: './js/example.js',
        output: {
            format: 'iife',
            file: '../example/js/example.min.js',
            name: 'example'
        },
        plugins: pluginsLists
    }
];
