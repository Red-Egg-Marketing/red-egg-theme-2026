/**
 * TagCloud Component
 *
 * Renders a grid of keyword/tag pills.
 * Reusable across blocks. Edit mode has add / inline-edit /
 * reorder / remove UI; View mode renders static tag pills.
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

const { useState } = wp.element;
const { Button, TextControl } = wp.components;
const { __ } = wp.i18n;

const TagCloud = ( { tags, setAttributes, attrKey } ) => {
    const [ newTag, setNewTag ] = useState( '' );

    const key = attrKey || 'tags';

    // Clone-before-mutate, then commit to the block attribute.
    const commit = ( updated ) => setAttributes( { [ key ]: updated } );
    const clone = () => JSON.parse( JSON.stringify( tags ) );

    const addTag = () => {
        if ( newTag.trim() === '' ) return;
        const updated = clone();
        updated.push( newTag.trim() );
        commit( updated );
        setNewTag( '' );
    };

    const removeTag = ( index ) => {
        const updated = clone();
        updated.splice( index, 1 );
        commit( updated );
    };

    // Inline-edit an existing tag.
    const editTag = ( index, value ) => {
        const updated = clone();
        updated[ index ] = value;
        commit( updated );
    };

    // Reorder: dir = -1 (up) or +1 (down).
    const moveTag = ( index, dir ) => {
        const target = index + dir;
        if ( target < 0 || target >= tags.length ) return;
        const updated = clone();
        const [ moved ] = updated.splice( index, 1 );
        updated.splice( target, 0, moved );
        commit( updated );
    };

    const handleKeyDown = ( e ) => {
        if ( e.key === 'Enter' ) {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="tag-cloud">
            <div className="tag-cloud__tags tag-cloud__tags--edit">
                { tags.map( ( tag, i ) => (
                    <div
                        className="tag-cloud__tag tag-cloud__tag--edit"
                        key={ i }
                    >
                        <span className="tag-cloud__reorder">
                            <Button
                                className="tag-cloud__move"
                                icon="arrow-up-alt2"
                                label={ __( 'Move up', 'red-egg' ) }
                                showTooltip
                                onClick={ () => moveTag( i, -1 ) }
                                disabled={ i === 0 }
                                isSmall
                            />
                            <Button
                                className="tag-cloud__move"
                                icon="arrow-down-alt2"
                                label={ __( 'Move down', 'red-egg' ) }
                                showTooltip
                                onClick={ () => moveTag( i, 1 ) }
                                disabled={ i === tags.length - 1 }
                                isSmall
                            />
                        </span>
                        <input
                            className="tag-cloud__tag-input"
                            type="text"
                            value={ tag }
                            onChange={ ( e ) => editTag( i, e.target.value ) }
                            aria-label={ __( 'Edit tag', 'red-egg' ) }
                        />
                        <button
                            className="tag-cloud__tag-remove"
                            onClick={ () => removeTag( i ) }
                            type="button"
                            aria-label={ __( 'Remove tag', 'red-egg' ) }
                        >
                            ×
                        </button>
                    </div>
                ) ) }
            </div>
            <div className="tag-cloud__add">
                <TextControl
                    value={ newTag }
                    onChange={ setNewTag }
                    onKeyDown={ handleKeyDown }
                    placeholder={ __( 'Add tag…', 'red-egg' ) }
                    __nextHasNoMarginBottom
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
