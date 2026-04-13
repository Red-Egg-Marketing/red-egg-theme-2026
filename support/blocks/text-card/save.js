/**
 * Text Card Block – Save Component
 *
 * Wraps in an <a> tag if URL is set, otherwise a <div>.
 * Icon is rendered from attributes, content from InnerBlocks.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveTextCard = ( { attributes } ) => {
    const { icon, iconAlt, url } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'text-card',
    } );

    const inner = (
        <Fragment>
            { icon && (
                <div className="text-card__icon">
                    <img src={ icon } alt={ iconAlt } loading="lazy" />
                </div>
            ) }
            <div className="text-card__content">
                <InnerBlocks.Content />
            </div>
            <div className="text-card__arrow">
                <span className="arrow-circle">
                    <span className="arrow-icon"></span>
                </span>
            </div>
        </Fragment>
    );

    // Wrap in anchor if URL is provided, otherwise plain div
    if ( url ) {
        return (
            <a { ...blockProps } href={ url }>
                { inner }
            </a>
        );
    }

    return (
        <div { ...blockProps }>
            { inner }
        </div>
    );
};

export default SaveTextCard;
