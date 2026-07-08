const { Fragment, RawHTML } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveIconCard = ( { attributes } ) => {
    const { iconType, iconUrl, iconAlt, iconSvg } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'icon-card',
    } );

    const useSvg = iconType === 'svg';

    return (
        <div { ...blockProps }>
            { useSvg && iconSvg && (
                <span className="icon-card-icon is-svg">
                    <RawHTML>{ iconSvg }</RawHTML>
                </span>
            ) }
            { ! useSvg && iconUrl && (
                <span className="icon-card-icon is-image">
                    <img src={ iconUrl } alt={ iconAlt } />
                </span>
            ) }
            <div className="icon-card-body">
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default SaveIconCard;
