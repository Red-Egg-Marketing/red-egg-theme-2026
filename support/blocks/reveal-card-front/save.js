/**
 * Reveal Card Front (child) – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveRevealCardFront = ( { attributes } ) => {
    const { faClass, svgMarkup, icon, iconAlt, iconBgSlug } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'reveal-card__face reveal-card__face--front',
    } );

    const hasIcon = faClass || svgMarkup || icon;

    return (
        <div { ...blockProps }>
            <div className="reveal-card__face-inner">
                { hasIcon && (
                    <div className={ 'reveal-card__icon' + ( iconBgSlug ? ' ' + iconBgSlug : '' ) }>
                        { faClass && <i className={ faClass }></i> }
                        { ! faClass && svgMarkup && (
                            <span
                                className="reveal-card__icon-svg"
                                dangerouslySetInnerHTML={ { __html: svgMarkup } }
                            />
                        ) }
                        { ! faClass && ! svgMarkup && icon && (
                            <img src={ icon } alt={ iconAlt } loading="lazy" />
                        ) }
                    </div>
                ) }
                <div className="reveal-card__front-content">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
};

export default SaveRevealCardFront;
