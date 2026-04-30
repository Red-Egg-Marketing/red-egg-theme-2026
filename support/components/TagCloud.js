/**
 * TagCloud Component
 *
 * Renders a grid of keyword/tag pills.
 * Reusable across blocks. Edit mode has add/remove UI,
 * View mode renders static tag pills.
 *
 * Usage (edit):
 *   <TagCloud
 *       tags={ tags }
 *       setAttributes={ setAttributes }
 *       attrKey="tags"
 *   />
 *
 * Usage (save):
 *   <TagCloud.View tags={ tags } />
 */

const { Fragment, useState } = wp.element;
const { Button, TextControl } = wp.components;
const { __ } = wp.i18n;

const TagCloud = ( { tags, setAttributes, attrKey } ) => {
    const [ newTag, setNewTag ] = useState( '' );

    const key = attrKey || 'tags';

    const addTag = () => {
        if ( newTag.trim() === '' ) return;
        let updated = JSON.parse( JSON.stringify( tags ) );
        updated.push( newTag.trim() );
        setAttributes( { [ key ]: updated } );
        setNewTag( '' );
    };

    const removeTag = ( index ) => {
        let updated = JSON.parse( JSON.stringify( tags ) );
        updated.splice( index, 1 );
        setAttributes( { [ key ]: updated } );
    };

    const handleKeyDown = ( e ) => {
        if ( e.key === 'Enter' ) {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="tag-cloud">
            <div className="tag-cloud__tags">
                { tags.map( ( tag, i ) => (
                    <span className="tag-cloud__tag" key={ i }>
                        <span className="tag-cloud__tag-text">{ tag }</span>
                        <button
                            className="tag-cloud__tag-remove"
                            onClick={ () => removeTag( i ) }
                            type="button"
                        >
                            ×
                        </button>
                    </span>
                ) ) }
            </div>
            <div className="tag-cloud__add">
                <TextControl
                    value={ newTag }
                    onChange={ setNewTag }
                    onKeyDown={ handleKeyDown }
                    placeholder={ __( 'Add tag…', 'red-egg' ) }
                />
                <Button
                    variant="secondary"
                    isSmall
                    onClick={ addTag }
                    disabled={ newTag.trim() === '' }
                >
                    { __( 'Add', 'red-egg' ) }
                </Button>
            </div>
        </div>
    );
};

TagCloud.View = ( { tags } ) => {
    if ( ! tags || tags.length === 0 ) return null;

    return (
        <div className="tag-cloud">
            <div className="tag-cloud__tags">
                { tags.map( ( tag, i ) => (
                    <span className="tag-cloud__tag" key={ i }>
                        <span className="tag-cloud__tag-text">{ tag }</span>
                    </span>
                ) ) }
            </div>
        </div>
    );
};

export default TagCloud;
