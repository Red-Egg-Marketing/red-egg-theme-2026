/**
 * Flip Card Block – Save Component
 *
 * Renders the front (icon + InnerBlocks heading) and
 * back (description + link) in a flip container.
 */

const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveFlipCard = ( { attributes } ) => {
    const {
        icon, iconAlt, bgSlug,
        link, content, buttonText,
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'flip-card'
            + ( bgSlug ? ' ' + bgSlug : '' )
            + ( content ? '' : ' no-flip' ),
    } );

    return (
        <div { ...blockProps }>
            <div className="exterior-wrap">
                <div className="block-wrapper">
                    <div className="block-content">
                        { icon && (
                            <div className="flip-card__icon">
                                <img src={ icon } alt={ iconAlt } loading="lazy" />
                            </div>
                        ) }
                        <InnerBlocks.Content />
                    </div>
                </div>
                { ( link || content ) && (
                    <div className="flip-card-wrap">
                        <div className="wrapper">
                            <RichText.Content
                                className="content"
                                value={ content }
                                tagName="p"
                            />
                        </div>
                    </div>
                ) }
                { link && (
                    <div className="wp-buttons">
                        <a href={ link } className="flip-link">
                            <span>{ buttonText }</span>
                        </a>
                    </div>
                ) }
            </div>
        </div>
    );
};

export default SaveFlipCard;
