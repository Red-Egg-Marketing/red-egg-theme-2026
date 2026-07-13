/**
 * Callout Block – Save Component
 */

const { InnerBlocks, useBlockProps } = wp.blockEditor;

const SaveCallout = ( { attributes } ) => {
    const { icon } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'callout-block',
    } );

    return (
        <div { ...blockProps }>
            <div className="callout-block__inner">
                { icon && (
                    <span className="callout-block__icon">
                        <i className={ icon }></i>
                    </span>
                ) }
                <div className="callout-block__content">
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
};

export default SaveCallout;
