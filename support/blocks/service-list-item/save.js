/**
 * Service List Item Block – Save Component
 *
 * Renders a dark bar with title, arrow, and description.
 * If linkUrl is set, the entire bar is wrapped in an anchor tag.
 */

const { RichText, useBlockProps } = wp.blockEditor;

const SaveServiceListItem = ( { attributes } ) => {
    const { title, description, linkUrl, linkTarget } = attributes;

    const blockProps = useBlockProps.save( {
        className: 'service-list-item',
    } );

    const inner = (
        <div className="service-list-item__inner">
            <div className="service-list-item__title-col">
                <RichText.Content
                    tagName="h3"
                    className="service-list-item__title"
                    value={ title }
                />
            </div>
            <div className="service-list-item__arrow">
                <i className="fa-light fa-arrow-right"></i>
            </div>
            <div className="service-list-item__desc-col">
                <RichText.Content
                    tagName="p"
                    className="service-list-item__description"
                    value={ description }
                />
            </div>
        </div>
    );

    return (
        <div { ...blockProps }>
            { linkUrl ? (
                <a
                    className="service-list-item__link"
                    href={ linkUrl }
                    target={ linkTarget ? '_blank' : undefined }
                    rel={ linkTarget ? 'noopener noreferrer' : undefined }
                >
                    { inner }
                </a>
            ) : (
                inner
            ) }
        </div>
    );
};

export default SaveServiceListItem;
