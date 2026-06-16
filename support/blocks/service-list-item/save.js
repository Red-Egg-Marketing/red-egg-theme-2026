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
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 17.5C0 27.166 7.83398 35 17.5 35C27.166 35 35 27.166 35 17.5C35 7.83398 27.166 0 17.5 0C7.83398 0 0 7.83398 0 17.5ZM16.4746 25.7715C15.832 26.4141 14.793 26.4141 14.1572 25.7715C13.5215 25.1289 13.5146 24.0898 14.1572 23.4541L20.1045 17.5068L14.1572 11.5596C13.5146 10.917 13.5146 9.87793 14.1572 9.24219C14.7998 8.60645 15.8389 8.59961 16.4746 9.24219L23.584 16.3379C24.2266 16.9805 24.2266 18.0195 23.584 18.6553L16.4746 25.7715Z" fill="#fff"></path></svg>
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
