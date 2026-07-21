/**
 * Media Content – Media Block – Save Component
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import ImageComp from '../../components/ImageComp.js';


const SaveMediaContentMedia = ( { attributes } ) => {
    const {
        media, vidOrImg, videoID, videoURL, videothumb
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'media-content__media image-col column',
    } );

    const srcSet = '';
    const sizes = '(min-width: 880px) 100vw, 400px';

    return (
        <div { ...blockProps }>
            { vidOrImg === 'image' && (
                <ImageComp.View
                    source={ media.srcSet.large }
                    alt={ media.alt || '' }
                    srcSet={ srcSet }
                    sizes={ sizes }
                />
            ) }
            { vidOrImg === 'video' && videoID && (
                <Fragment>
                    <button className="custom-video-button">Play</button>
                    <video
                        className="hero-asset"
                        poster={ videothumb.url }
                        playsInline
                    >
                        <source src={ videoURL } className="source" type="video/mp4" />
                    </video>
                </Fragment>
            ) }
        </div>
    );
};

export default SaveMediaContentMedia;
