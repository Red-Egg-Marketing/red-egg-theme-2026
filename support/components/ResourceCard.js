/**
 * ResourceCard Component
 *
 * Reusable card for displaying a post/resource with
 * image, title, excerpt, and optional button.
 * 
 * Edit version: shows MediaUpload controls when update props provided.
 * Save version (.View): static output with anchor wrapper.
 */


const { Fragment } = wp.element;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;

const ResourceCard = ( props ) => {
    const slideClass = props.resourceClass || '';
    const text = props.buttonText || 'Read More';
    const displayButton = props.displayButton != null ? props.displayButton : true;
    const displayExcerpt = props.displayExcerpt != null ? props.displayExcerpt : true;

    return (
        <Fragment>
            <div className={ `resource-card ${ slideClass }` } key={ props.resourceIndex }>
                <div className="resource-extra">
                    <div className="resource-wrap" href={ props.resourceURL }>
                        <div className="cont-wrap">
                            { ( props.resourceID != 0 && props.updateResourceImage != null ) && (
                                <Fragment>
                                    <div className="media-controls">
                                        <MediaUpload
                                            onSelect={ ( val ) => {
                                                props.updateResourceImage( val, props.resourceIndex );
                                            } }
                                            allowedTypes={ [ 'image' ] }
                                            value={ props.resourceImgID }
                                            render={ ( { open } ) => (
                                                <Button onClick={ open } isLink isSmall>
                                                    { __( 'Change Image', 'red-egg' ) }
                                                </Button>
                                            ) }
                                        />
                                    </div>
                                    { props.resourceImg && (
                                        <div className="image-cont" data-imgid={ props.resourceImgID }>
                                            <img className="resource-img" src={ props.resourceImg } alt="" />
                                        </div>
                                    ) }
                                </Fragment>
                            ) }
                            { ( props.updateResourceImage == null && props.resourceImg ) && (
                                <div className="image-cont">
                                    <img className="resource-image" src={ props.resourceImg } alt="" />
                                </div>
                            ) }
                            <div className="content" data-id={ props.resourceID }>
                                { ( props.resourceID != 0 && props.updateResourceText != null ) && (
                                    <RichText
                                        tagName="h3"
                                        className="resource-title"
                                        value={ props.resourceTitle }
                                        allowedFormats={ [ 'core/italic' ] }
                                        placeholder={ __( 'Resource text...', 'red-egg' ) }
                                        onChange={ ( val ) => {
                                            props.updateResourceText( val, props.resourceIndex );
                                        } }
                                    />
                                ) }
                                { props.updateResourceText == null && (
                                    <h3 className="resource-title">{ props.resourceTitle }</h3>
                                ) }
                                { displayExcerpt && props.resourceExcerpt && (
                                    <Fragment>
                                        { ( props.resourceID != 0 && props.updateResourceExcerpt != null ) ? (
                                            <RichText
                                                tagName="p"
                                                className="resource-excerpt"
                                                value={ props.resourceExcerpt }
                                                allowedFormats={ [ 'core/italic' ] }
                                                placeholder={ __( 'Resource excerpt...', 'red-egg' ) }
                                                onChange={ ( val ) => {
                                                    props.updateResourceExcerpt( val, props.resourceIndex );
                                                } }
                                            />
                                        ) : (
                                            <p className="resource-excerpt">{ props.resourceExcerpt }</p>
                                        ) }
                                    </Fragment>
                                ) }
                                { displayButton && (
                                    <button className="wp-button">{ text }</button>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ResourceCard.View = ( props ) => {
    const slideClass = props.resourceClass || '';
    const text = props.buttonText || 'Read More';
    const displayButton = props.displayButton != null ? props.displayButton : true;
    const displayExcerpt = props.displayExcerpt != null ? props.displayExcerpt : true;

    return (
        <Fragment>
            <div className={ `resource-card ${ slideClass }` } key={ props.resourceIndex }>
                <div className="resource-extra">
                    <a className="resource-wrap" href={ props.resourceURL }>
                        <div className="cont-wrap">
                            { props.resourceImg && (
                                <div className="image-cont" data-imgid={ props.resourceImgID }>
                                    <img className="resource-img" src={ props.resourceImg } alt="" />
                                </div>
                            ) }
                            <div className="content" data-id={ props.resourceID }>
                                <RichText.Content
                                    tagName="h3"
                                    className="resource-title"
                                    value={ props.resourceTitle }
                                />
                                { displayExcerpt && props.resourceExcerpt && (
                                    <RichText.Content
                                        tagName="p"
                                        className="resource-excerpt"
                                        value={ props.resourceExcerpt }
                                    />
                                ) }
                                { displayButton && (
                                    <button className="wp-button">{ text }</button>
                                ) }
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </Fragment>
    );
};

export default ResourceCard;
