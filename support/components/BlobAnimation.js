/**
 * BlobAnimation Component
 *
 * Adds an animated SVG blob decoration to a block.
 * Uses GSAP MorphSVG on the frontend to morph between
 * blob shapes. Editor shows a static preview of the
 * selected starting shape.
 *
 * Usage (edit — inside InspectorControls):
 *   <BlobAnimation.Controls
 *       blobEnabled={ blobEnabled }
 *       blobShape={ blobShape }
 *       blobSpeed={ blobSpeed }
 *       blobPosition={ blobPosition }
 *       setAttributes={ setAttributes }
 *   />
 *
 * Usage (edit — inside block markup):
 *   <BlobAnimation.Preview
 *       blobEnabled={ blobEnabled }
 *       blobShape={ blobShape }
 *       blobPosition={ blobPosition }
 *   />
 *
 * Usage (save):
 *   <BlobAnimation.View
 *       blobEnabled={ blobEnabled }
 *       blobShape={ blobShape }
 *       blobSpeed={ blobSpeed }
 *       blobPosition={ blobPosition }
 *   />
 */

const { Fragment } = wp.element;
const { PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

/**
 * Blob path data definitions.
 * Each shape has a viewBox and path d attribute.
 */
const BLOB_SHAPES = {
    shape1: {
        viewBox: '0 0 839 621',
        path: 'M610.117 194.36C602.065 159.909 606.223 123.244 591.981 89.9131C557.057 5.43642 445.46 -26.8109 363.138 24.9182C346.877 35.0759 333.031 48.1868 322.155 63.0601C285.792 112.765 281.344 178.641 243.978 229.001C215.165 269.834 168.401 297.532 117.651 311.56C84.0461 321.658 48.6201 329.673 19.6088 348.237C-18.193 371.78 -41.4891 411.934 -44.5645 453.101C-52.3387 547.723 45.9407 624.472 147.705 620.863C196.409 620.554 243.45 604.323 283.311 579.649C333.493 549.331 383.372 508.01 446.912 506.902C492.171 505.735 533.048 526.896 574.097 541.924C623.553 561.453 680.718 564.895 730.9 545.806C820.139 515.131 864.962 415.888 823.293 338.258C805.95 305.547 773.626 279.884 736.114 267.226C709.822 257.306 677.748 260.2 652.538 250.471C628.318 241.004 615.594 217.378 610.196 194.681L610.117 194.36Z',
    },
    shape2: {
        viewBox: '0 0 569 551',
        path: 'M244.046 16.86C209.611 32.6402 176.319 54.749 137.587 58.0922C98.5786 62.4121 58.8267 53.7585 19.7359 54.2125C-94.3958 51.6948 -154.726 174.827 -82.9634 263.166C-64.4924 285.371 -39.5751 301.041 -16.2281 317.729C-0.236435 329.121 15.2869 341.324 27.9177 356.403C63.317 397.704 71.1269 456.752 104.832 499.085C136.65 539.932 192.972 560.032 243.33 547.086C279.115 538.253 310.795 514.356 329.032 482.355C359.886 424.38 357.627 380.726 425.891 349.276C461.511 332.244 501.993 324.209 533.563 299.514C567.323 273.801 582.585 228.95 553.99 193.662C526.621 158.593 479.238 148.371 446.36 119.933C414.294 93.4635 406.07 48.8745 375.671 21.0837C358.702 4.58808 335.079 -1.39656 311.842 0.268132C288.633 1.39627 265.382 7.29837 244.308 16.75L244.033 16.8738L244.046 16.86Z',
    },
    shape3: {
        viewBox: '0 0 780 700',
        path: 'M580 120C530 50 430 10 340 40C250 70 200 150 150 230C100 310 40 390 20 480C0 570 30 660 100 690C170 720 260 690 340 650C420 610 490 560 560 500C630 440 700 370 730 290C760 210 750 120 700 70C650 20 580 10 540 30C500 50 490 100 480 150C470 200 460 250 430 290C400 330 350 360 310 380C270 400 240 410 220 440C200 470 190 520 210 560C230 600 280 630 340 620C400 610 460 560 500 500C540 440 560 380 570 310C580 240 580 170 580 120Z',
    },
};

const shapeOptions = [
    { label: __( 'Blob 1 (Wide)', 'red-egg' ), value: 'shape1' },
    { label: __( 'Blob 2 (Organic)', 'red-egg' ), value: 'shape2' },
    { label: __( 'Blob 3 (Flowing)', 'red-egg' ), value: 'shape3' },
];

const positionOptions = [
    { label: __( 'Top Right', 'red-egg' ), value: 'top-right' },
    { label: __( 'Top Left', 'red-egg' ), value: 'top-left' },
    { label: __( 'Bottom Right', 'red-egg' ), value: 'bottom-right' },
    { label: __( 'Bottom Left', 'red-egg' ), value: 'bottom-left' },
    { label: __( 'Center Right', 'red-egg' ), value: 'center-right' },
    { label: __( 'Center Left', 'red-egg' ), value: 'center-left' },
];

/**
 * BlobAnimation.Controls – InspectorControls panel
 */
const Controls = ( { blobEnabled, blobShape, blobSpeed, blobPosition, setAttributes } ) => {
    return (
        <PanelBody
            title={ __( 'Blob Animation', 'red-egg' ) }
            initialOpen={ false }
        >
            <ToggleControl
                label={ __( 'Enable Blob Decoration', 'red-egg' ) }
                checked={ !! blobEnabled }
                onChange={ () => setAttributes( { blobEnabled: ! blobEnabled } ) }
            />
            { blobEnabled && (
                <Fragment>
                    <SelectControl
                        label={ __( 'Starting Shape', 'red-egg' ) }
                        value={ blobShape }
                        options={ shapeOptions }
                        onChange={ ( val ) => setAttributes( { blobShape: val } ) }
                    />
                    <SelectControl
                        label={ __( 'Position', 'red-egg' ) }
                        value={ blobPosition }
                        options={ positionOptions }
                        onChange={ ( val ) => setAttributes( { blobPosition: val } ) }
                    />
                    <RangeControl
                        label={ __( 'Morph Speed (seconds)', 'red-egg' ) }
                        value={ blobSpeed }
                        onChange={ ( val ) => setAttributes( { blobSpeed: val } ) }
                        min={ 3 }
                        max={ 20 }
                        step={ 1 }
                        help={ __( 'Duration of each morph cycle', 'red-egg' ) }
                    />
                </Fragment>
            ) }
        </PanelBody>
    );
};

/**
 * BlobAnimation.Preview – Editor static preview
 */
const Preview = ( { blobEnabled, blobShape, blobPosition } ) => {
    if ( ! blobEnabled ) return null;

    const shape = BLOB_SHAPES[ blobShape ] || BLOB_SHAPES.shape1;

    return (
        <div className={ 'blob-decoration blob-decoration--' + blobPosition }>
            <svg
                className="blob-decoration__svg"
                viewBox={ shape.viewBox }
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <path d={ shape.path } fill="#F2ECE5" />
            </svg>
        </div>
    );
};

/**
 * BlobAnimation.View – Save/frontend output
 * Renders all 3 shape paths (hidden) so GSAP can morph between them.
 * data-blob attributes control the animation on the frontend.
 */
const View = ( { blobEnabled, blobShape, blobSpeed, blobPosition } ) => {
    if ( ! blobEnabled ) return null;

    const shape = BLOB_SHAPES[ blobShape ] || BLOB_SHAPES.shape1;

    return (
        <div
            className={ 'blob-decoration blob-decoration--' + blobPosition }
            data-blob-enabled="true"
            data-blob-shape={ blobShape }
            data-blob-speed={ blobSpeed }
        >
            <svg
                className="blob-decoration__svg"
                viewBox={ shape.viewBox }
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <path className="blob-decoration__path" d={ shape.path } fill="#F2ECE5" />
            </svg>
            <svg className="blob-decoration__targets" style={ { position: 'absolute', width: 0, height: 0, overflow: 'hidden' } } xmlns="http://www.w3.org/2000/svg">
                <path id={ 'blob-target-shape1-' + blobPosition } d={ BLOB_SHAPES.shape1.path } />
                <path id={ 'blob-target-shape2-' + blobPosition } d={ BLOB_SHAPES.shape2.path } />
                <path id={ 'blob-target-shape3-' + blobPosition } d={ BLOB_SHAPES.shape3.path } />
            </svg>
        </div>
    );
};

const BlobAnimation = {
    Controls,
    Preview,
    View,
    BLOB_SHAPES,
};

export default BlobAnimation;
