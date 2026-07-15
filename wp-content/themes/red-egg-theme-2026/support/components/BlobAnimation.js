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
        viewBox: '0 0 600 484',
        path: 'M432.34,67.57C408.63,4.02 330.82,-20.09 277.02,18.68C223.22,57.45 221.5,134.32 196.13,172.21C176.57,202.92 144.84,223.76 110.38,234.32C87.57,241.92 63.52,247.95 43.83,261.91C18.2,279.63 2.39,309.84 0.29,340.81C-4.99,412 61.72,469.74 130.79,467.02C163.85,466.79 195.77,454.57 222.83,436.01C256.89,413.2 290.75,382.12 333.87,381.28C364.59,380.4 392.34,396.32 420.2,407.63C453.77,422.32 492.57,424.91 526.63,410.55C587.2,387.47 617.62,312.81 589.34,254.41C577.57,229.8 555.63,210.49 530.17,200.97C512.32,193.5 490.55,195.69 473.44,188.37C457,181.25 450.6,168.89 444.7,146.4C438.81,123.91 442,92.66 432.34,67.57Z',
    },
    shape2: {
        viewBox: '0 0 600 484',
        path: 'M314.53,14.84C294.67,23.58 255.03,48.16 221.01,51.11C186.74,54.9 151.83,47.3 117.48,47.7C17.22,45.47 -35.78,153.77 27.27,231.46C43.5,250.99 65.38,264.77 85.9,279.45C99.94,289.47 113.58,300.2 124.69,313.46C155.78,349.78 162.65,401.72 192.25,438.95C220.2,474.87 269.67,492.55 313.92,481.16C345.35,473.39 373.19,452.37 389.21,424.22C416.31,373.23 414.33,334.83 474.3,307.18C505.59,292.19 541.15,285.13 568.88,263.42C598.53,240.81 611.94,201.36 586.82,170.32C562.78,139.48 521.15,130.48 492.27,105.47C464.1,82.19 456.88,42.97 430.18,18.52C415.25,4.03 394.5,-1.23 374.09,0.24C353.7,1.24 334.39,6.11 314.53,14.84Z',
    },
    shape3: {
        viewBox: '0 0 600 484',
        path: 'M447.77,6.88C415.43,0.25 394.48,-3.34 368.75,4.33C345.65,11.22 328.07,28.22 312.44,45.79C292.37,68.36 269.15,87.02 239.32,94.4C201.84,104.18 163.64,96.79 125.66,93.09C92.89,89.83 57.35,93.46 33.96,119.13C19.23,134.64 2.65,165.33 0.47,202.35C-1.72,239.46 3.65,263.4 17.84,294.01C49.88,363.12 124.52,403.49 208.6,362.48C240.31,347.01 272.5,325.61 309.15,326.59C349.3,327.66 386.21,347.19 425.94,351.2C466.78,355.32 509.2,339.76 543.23,318.28C580.49,294.77 600.67,259.87 599.97,215.26C599.65,194.65 595.54,174.21 589.1,154.68C578.63,122.93 562.38,91.41 540.65,65.47C516.43,36.55 481.71,13.85 447.77,6.88Z',
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
    { label: __( 'Double (right + lower-left)', 'red-egg' ), value: 'double' },
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
                        max={ 100 }
                        step={ 1 }
                        help={ __( 'Duration of each morph cycle', 'red-egg' ) }
                    />
                </Fragment>
            ) }
        </PanelBody>
    );
};

/**
 * Renders the two-blob "double" arrangement: a large blob center-right
 * and a smaller one lower-left (matches the Related Posts section).
 * @param {boolean} animate  Add data-blob-* attrs for the GSAP morph.
 * @param {number}  speed    Morph speed (view only).
 */
const doubleBlob = ( animate, speed ) => {
    const a = BLOB_SHAPES.shape2;
    const b = BLOB_SHAPES.shape1;
    const attrsA = animate ? { 'data-blob-enabled': 'true', 'data-blob-shape': 'shape2', 'data-blob-speed': speed } : {};
    const attrsB = animate ? { 'data-blob-enabled': 'true', 'data-blob-shape': 'shape1', 'data-blob-speed': speed } : {};
    return (
        <Fragment>
            <div className="blob-decoration blob-decoration--center-right blob-decoration--double-a" { ...attrsA }>
                <svg className="blob-decoration__svg" viewBox={ a.viewBox } xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="blob-decoration__path" d={ a.path } fill="#F2ECE5" />
                </svg>
            </div>
            <div className="blob-decoration blob-decoration--bottom-left blob-decoration--double-b" { ...attrsB }>
                <svg className="blob-decoration__svg" viewBox={ b.viewBox } xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path className="blob-decoration__path" d={ b.path } fill="#F2ECE5" />
                </svg>
            </div>
        </Fragment>
    );
};

/**
 * BlobAnimation.Preview – Editor static preview
 */
const Preview = ( { blobEnabled, blobShape, blobPosition } ) => {
    if ( ! blobEnabled ) return null;

    if ( blobPosition === 'double' ) {
        return doubleBlob( false );
    }

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

    if ( blobPosition === 'double' ) {
        return doubleBlob( true, blobSpeed );
    }

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
