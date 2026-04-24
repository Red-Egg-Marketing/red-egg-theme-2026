/**
 * ImageComp Component
 *
 * Edit: MediaUpload button + image preview.
 * Save (.View): Static img with srcSet/sizes support.
 */

const { Fragment } = wp.element;
const { MediaUpload } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const style = {
    position: 'relative',
    zIndex: '2',
};

const ImageComp = ( props ) => {
    return (
        <Fragment>
            <div className="media-controls" style={ style }>
                <MediaUpload
                    onSelect={ props.updateImageAttr }
                    allowedTypes={ [ 'image' ] }
                    value={ props.id }
                    render={ ( { open } ) => (
                        <Button
                            className="button"
                            onClick={ open }
                        >
                            { __( 'Upload/Change Image', 'red-egg' ) }
                        </Button>
                    ) }
                />
            </div>
            { props.source && props.background !== true && (
                <div className="img-container">
                    <img
                        src={ props.source }
                        className="image-comp"
                        loading="eager"
                        alt={ props.alt || '' }
                    />
                </div>
            ) }
        </Fragment>
    );
};

ImageComp.View = ( props ) => {
    return (
        <Fragment>
            { props.source && props.background !== true && (
                <div className="img-container">
                    <img
                        src={ props.source }
                        className="image-comp"
                        loading="lazy"
                        srcSet={ props.srcSet || '' }
                        alt={ props.alt || '' }
                        sizes={ props.sizes || '' }
                    />
                </div>
            ) }
        </Fragment>
    );
};

export default ImageComp;
