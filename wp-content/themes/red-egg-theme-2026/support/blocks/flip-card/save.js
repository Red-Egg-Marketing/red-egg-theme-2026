/**
 * Flip Card Block – Save Component
 *
 * Renders the front (icon/SVG + InnerBlocks heading) and
 * back (description + link) in a flip container.
 * Optional hover overlay with fade-in text.
 */

const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveFlipCard = ( { attributes } ) => {
    const {
        icon, iconAlt, bgSlug,
        link, content, buttonText,
        svgMarkup, hoverText,
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'flip-card'
            + ( bgSlug ? ' ' + bgSlug : '' )
            + ( content ? '' : ' no-flip' )
            + ( hoverText ? ' has-hover-overlay' : '' ),
    } );

    return (
        <div { ...blockProps }>
            <div className="exterior-wrap">
                <div className="wrapper">
                    <div className="block-content">
                        { svgMarkup && (
                            <div
                                className="flip-card__svg-icon"
                                dangerouslySetInnerHTML={ { __html: svgMarkup } }
                            />
                        ) }
                        { icon && (
                            <div className="flip-card__icon">
                                <img src={ icon } alt={ iconAlt } loading="lazy" />
                            </div>
                        ) }
                        <InnerBlocks.Content />
                    </div>
                </div>
                { hoverText && (
                    <div className="flip-card__hover-overlay">
                        <p>{ hoverText }</p>
                    </div>
                ) }
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
