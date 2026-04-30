/**
 * Hero Media – Save Component
 */

const { Fragment } = wp.element;
const { useBlockProps } = wp.blockEditor;

const SaveHeroMedia = ( { attributes } ) => {
    const { mediaType, media, videoID, videoURL } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'hero-background__media',
    } );

    return (
        <div { ...blockProps }>
            { mediaType === 'image' && media.url && (
                <img
                    className="hero-background__media-img"
                    src={ media.url }
                    alt={ media.alt }
                    loading="lazy"
                />
            ) }
            { mediaType === 'video' && videoID && (
                <video
                    className="hero-background__media-video"
                    autoPlay
                    playsInline
                    muted
                    loop
                >
                    <source src={ videoURL } type="video/mp4" />
                </video>
            ) }
        </div>
    );
};

export default SaveHeroMedia;
