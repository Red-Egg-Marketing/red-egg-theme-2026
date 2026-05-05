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
        path: 'M646.7,199.1c-7.8-33.2-3.8-68.6-17.5-100.7-33.7-81.5-141.3-112.6-220.7-62.7-71.5,42.5-69.3,134.1-114.9,196.8C223.9,343.3,30.1,293.1,15.4,448.6c-9.4,150.5,206.7,204.9,316.2,122,102.3-71.7,162-93.4,280.4-36.4,195.7,85.9,375.9-168.4,156.2-264.9-52.8-15.3-107.1-1.8-121.5-70.3Z',
    },
    shape2: {
        viewBox: '0 0 884 621',
        path: 'M623.4,77c-208.5-49.5-122.1,158.6-397,106.3-72.5-11.9-135.3,28.9-147.9,102.7-34.3,152.5,93.9,306.7,250.2,229.7,39.1-19.1,78.8-45.5,123.9-44.3,49.5,1.3,95,25.4,143.9,30.4,97.1,5.9,219.1-58.2,214.5-167.7-5.8-109.4-76.3-232.8-187.6-257.1h0Z',
    },
    shape3: {
        viewBox: '0 0 884 621',
        path: 'M623.4,76.9c-208.5-49.5-122.1,158.6-397,106.3-72.5-11.9-135.3,28.9-147.9,102.6-34.3,152.5,93.9,306.7,250.2,229.7,39.1-19.1,78.8-45.5,123.9-44.3,49.5,1.3,95,25.4,143.9,30.4,97.1,5.9,219.1-58.2,214.5-167.7-5.8-109.4-76.3-232.8-187.6-257.1h0Z',
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
