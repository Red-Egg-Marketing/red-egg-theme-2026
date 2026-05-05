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
        viewBox: '0 0 884 621',
        path: 'M655.12,194.37c-8.05-34.45-3.89-71.12-18.14-104.45C602.06,5.44,490.46-26.81,408.14,24.92c-16.26,10.16-30.11,23.27-40.98,38.14-36.36,49.71-40.81,115.58-78.18,165.94-28.81,40.83-75.58,68.53-126.33,82.56-33.6,10.1-69.03,18.11-98.04,36.68C26.81,371.79,3.51,411.94.44,453.11c-7.77,94.62,90.51,171.37,192.27,167.76,48.7-.31,95.75-16.54,135.61-41.21,50.18-30.32,100.06-71.64,163.6-72.75,45.26-1.17,86.14,19.99,127.18,35.02,49.46,19.53,106.62,22.97,156.8,3.88,89.24-30.68,134.06-129.92,92.39-207.55-17.34-32.71-49.67-58.37-87.18-71.03-26.29-9.92-58.37-7.03-83.58-16.75-24.22-9.47-36.94-33.09-42.34-55.79l-.08-.32Z',
    },
    shape2: {
        viewBox: '0 0 884 621',
        path: 'M254.8,47.3c32-24.4,73.3-39.9,113.8-34,96.7,16.8,116.2,130.2,241.5,156.8,22.8,5.4,46.4,6.8,69.8,5.6,38.6-1.8,79.9-7.6,115.7,10.4,47,23,50.4,77.1,42.8,123.2-11.6,73.8-41.4,144.7-86,204.8-23.2,31-51,59.8-85.8,77.7-41.8,22-96.7,25.2-136.3-3-34.3-23.9-53.7-63.8-77.3-97.4-16.1-23.2-35-45-57.9-61.6-64.2-48.9-140.8-26.8-214.4-27.3-38.2-.3-78.9-10.1-106.2-38.2-33.8-33.6-42.7-90.4-18.1-128.2,20.4-33.1,68.5-46.2,96-72.2,12-11.3,22.4-24.1,32.3-37.2,21.2-28.1,41.4-57.4,69.7-79l.3-.2h0Z',
    },
    shape3: {
        viewBox: '0 0 884 621',
        path: 'M623.38,76.95c-31.66-6.29-65.68-12.61-97.4-3.15-28.47,8.5-50.15,29.48-69.4,51.15-24.74,27.84-53.36,50.87-90.12,59.96-46.2,12.07-93.27,2.95-140.08-1.62-40.39-4.02-84.19.46-113.03,32.12-18.15,19.14-29.24,44.78-34.9,70.52-1.22,5.53-2.22,11.1-2.99,16.7-21.68,149.96,103.61,286.01,253.15,212.99,39.08-19.08,78.76-45.48,123.94-44.28,49.48,1.32,94.98,25.42,143.94,30.36,50.34,5.07,102.63-14.12,144.57-40.61,45.92-29.01,70.8-72.06,69.93-127.1-.4-25.42-5.46-50.64-13.39-74.74-27.29-82.85-86.45-164.4-173.92-182.29l-.29-.06h-.01Z',
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
