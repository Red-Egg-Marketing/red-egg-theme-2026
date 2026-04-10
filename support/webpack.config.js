/**
 * Webpack Configuration
 * Red Egg Marketing Theme
 * 
 * Entry points:
 *   - blocks/index.js   → assets/js/editor.blocks.js  (editor)
 *   - front-end.js       → assets/js/main.js            (frontend)
 * 
 * SCSS compilation:
 *   - scss/style.scss    → ../../style.css              (theme root)
 *   - scss/editor.scss   → ../../blocks.editor.css      (theme root)
 */

const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = ( env, argv ) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: {
            'editor.blocks': path.resolve( __dirname, 'blocks/index.js' ),
            'main': path.resolve( __dirname, 'front-end.js' ),
            'style': path.resolve( __dirname, 'scss/style.scss' ),
            'blocks.editor': path.resolve( __dirname, 'scss/editor.scss' ),
        },

        output: {
            path: path.resolve( __dirname, 'assets/js' ),
            filename: '[name].js',
        },

        externals: {
            lodash: 'lodash',
        },

        module: {
            rules: [
                // JavaScript / JSX
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                            ],
                        },
                    },
                },

                // SCSS
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require( 'autoprefixer' ),
                                    ],
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    outputStyle: isProduction ? 'compressed' : 'expanded',
                                },
                            },
                        },
                    ],
                },

                // CSS (for any vendor CSS imports)
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
            ],
        },

        plugins: [
            new MiniCssExtractPlugin( {
                filename: ( { chunk } ) => {
                    // Output CSS files to theme root
                    if ( chunk.name === 'style' ) {
                        return '../../style.css';
                    }
                    if ( chunk.name === 'blocks.editor' ) {
                        return '../../blocks.editor.css';
                    }
                    return '[name].css';
                },
            } ),
        ],

        resolve: {
            extensions: [ '.js', '.jsx', '.scss' ],
        },

        devtool: isProduction ? false : 'source-map',

        stats: {
            colors: true,
            modules: false,
            children: false,
        },
    };
};
