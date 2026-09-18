/**
 * Team Members Block – Edit Component
 *
 * Two canvas modes, toggled from the block toolbar:
 *
 *   Preview  – ServerSideRender of the real block output, so the
 *              editor shows exactly what the frontend grid looks like
 *              (plugin CSS + the theme's /gs-team/ template override).
 *   Edit     – ordered pick list with move / remove controls and a
 *              dropdown to add more. An empty list means "show
 *              everyone" in the shortcode's own order.
 *
 * A Header Intro (InnerBlocks) sits above both modes.
 * Members + saved shortcodes come from /red-egg/v2/team-members.
 */

const { Fragment, useState, useEffect } = wp.element;
const { InnerBlocks, InspectorControls, BlockControls, useBlockProps } = wp.blockEditor;
const { PanelBody, SelectControl, Button, Spinner, Notice, ToolbarGroup, ToolbarButton } = wp.components;
const { __ } = wp.i18n;
const ServerSideRender = wp.serverSideRender;
import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const apiUrl = '/wp-json/red-egg/v2/team-members';

const template = [
    [ 'red-egg-block/header-intro', {} ],
];

const allowedBlocks = [
    'red-egg-block/header-intro',
];

const EditTeamMembers = ( { attributes, setAttributes, clientId, isSelected } ) => {
    const { memberIds, shortcodeId, blockId, padding, margin } = attributes;

    const [ isEditing, setIsEditing ] = useState( false );
    const [ members, setMembers ] = useState( false );
    const [ shortcodes, setShortcodes ] = useState( [] );
    const [ loadError, setLoadError ] = useState( false );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'team-members-block team-members-editor' + ( isEditing ? ' is-editing' : ' is-preview' ),
    } );

    // Set blockId on mount
    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    // Fetch members + saved shortcodes
    useEffect( () => {
        wp.apiFetch( { url: apiUrl } )
            .then( ( res ) => {
                setMembers( Array.isArray( res.members ) ? res.members : [] );
                setShortcodes( Array.isArray( res.shortcodes ) ? res.shortcodes : [] );
            } )
            .catch( () => setLoadError( true ) );
    }, [] );

    // ---- Helpers ----
    const updateIds = ( ids ) => setAttributes( { memberIds: ids } );

    const addMember = ( id ) => {
        const numId = parseInt( id, 10 );
        if ( ! numId || memberIds.includes( numId ) ) return;
        updateIds( [ ...memberIds, numId ] );
    };

    const removeMember = ( index ) => {
        const ids = JSON.parse( JSON.stringify( memberIds ) );
        ids.splice( index, 1 );
        updateIds( ids );
    };

    const moveMember = ( index, dir ) => {
        const target = index + dir;
        if ( target < 0 || target >= memberIds.length ) return;
        const ids = JSON.parse( JSON.stringify( memberIds ) );
        [ ids[ index ], ids[ target ] ] = [ ids[ target ], ids[ index ] ];
        updateIds( ids );
    };

    const addAll = () => {
        if ( ! members ) return;
        updateIds( members.map( ( m ) => m.id ) );
    };

    const clearAll = () => updateIds( [] );

    const findMember = ( id ) => ( members || [] ).find( ( m ) => m.id === id );

    const selected = memberIds
        .map( ( id ) => findMember( id ) )
        .filter( Boolean );

    const available = ( members || [] ).filter( ( m ) => ! memberIds.includes( m.id ) );

    // ---- Sidebar options ----
    const shortcodeOptions = shortcodes.length
        ? shortcodes.map( ( sc ) => ( {
            label: sc.name + ' (ID ' + sc.id + ')',
            value: sc.id,
        } ) )
        : [ { label: __( 'Shortcode ID ', 'red-egg' ) + shortcodeId, value: shortcodeId } ];

    const addOptions = [
        { label: __( '— Add a team member —', 'red-egg' ), value: '' },
        ...available.map( ( m ) => ( { label: m.name, value: m.id } ) ),
    ];

    // Only pass attributes the PHP schema knows about. Padding and
    // margin are deliberately left out and the preview gets its own
    // ID, so the selectors' #blockId styles land on the editor
    // wrapper alone instead of doubling up on the SSR markup too.
    const renderAttributes = { memberIds, shortcodeId };
    if ( blockId ) {
        renderAttributes.blockId = blockId + '-preview';
    }

    const countLabel = memberIds.length
        ? memberIds.length + ' ' + __( 'selected', 'red-egg' )
        : __( 'showing all', 'red-egg' );

    return (
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={ isEditing ? 'visibility' : 'edit' }
                        label={ isEditing ? __( 'Preview grid', 'red-egg' ) : __( 'Edit members', 'red-egg' ) }
                        onClick={ () => setIsEditing( ! isEditing ) }
                    />
                </ToolbarGroup>
            </BlockControls>

            <InspectorControls>
                <PanelBody title={ __( 'Layout', 'red-egg' ) } initialOpen={ true }>
                    <SelectControl
                        label={ __( 'GS Team Shortcode', 'red-egg' ) }
                        help={ __( 'Grid layout, columns and popup settings come from this saved GS Team shortcode. Use one with filters and pagination turned off.', 'red-egg' ) }
                        value={ shortcodeId }
                        options={ shortcodeOptions }
                        onChange={ ( val ) => setAttributes( { shortcodeId: parseInt( val, 10 ) || 1 } ) }
                    />
                </PanelBody>
                <PanelBody title={ __( 'Members', 'red-egg' ) } initialOpen={ true }>
                    <p className="components-base-control__help">
                        { __( 'Leave the list empty to show every team member in the shortcode\'s default order.', 'red-egg' ) }
                    </p>
                    <div className="team-members-editor__actions">
                        <Button variant="secondary" size="small" onClick={ () => setIsEditing( ! isEditing ) }>
                            { isEditing ? __( 'Preview grid', 'red-egg' ) : __( 'Edit members', 'red-egg' ) }
                        </Button>
                        <Button variant="secondary" size="small" onClick={ addAll } disabled={ ! members }>
                            { __( 'Add all', 'red-egg' ) }
                        </Button>
                        <Button variant="tertiary" size="small" isDestructive onClick={ clearAll } disabled={ ! memberIds.length }>
                            { __( 'Clear', 'red-egg' ) }
                        </Button>
                    </div>
                </PanelBody>
            </InspectorControls>

            <PaddingSelector
                padding={ padding }
                id={ blockId }
                setAttributes={ setAttributes }
            />
            <MarginSelector
                margin={ margin }
                id={ blockId }
                setAttributes={ setAttributes }
            />

            <div { ...blockProps }>
                <div className="block-wrapper">

                <header className="team-members-block__header">
                    <InnerBlocks
                        template={ template }
                        allowedBlocks={ allowedBlocks }
                    />
                </header>

                { /* ---------- PREVIEW MODE ---------- */ }
                { ! isEditing && (
                    <Fragment>
                        { isSelected && (
                            <div className="team-members-editor__hint">
                                <span className="dashicons dashicons-groups"></span>
                                <span>
                                    <strong>{ __( 'Team Members', 'red-egg' ) }</strong>
                                    { ' · ' + countLabel + ' · ' }
                                    { __( 'frontend preview', 'red-egg' ) }
                                </span>
                                <Button variant="link" size="small" onClick={ () => setIsEditing( true ) }>
                                    { __( 'Edit members', 'red-egg' ) }
                                </Button>
                            </div>
                        ) }
                        <div className="team-members-editor__preview">
                            <ServerSideRender
                                block="red-egg-block/team-members"
                                attributes={ renderAttributes }
                            />
                        </div>
                    </Fragment>
                ) }

                { /* ---------- EDIT MODE ---------- */ }
                { isEditing && (
                    <div className="team-members-editor__panel">
                        <div className="team-members-editor__header">
                            <span className="dashicons dashicons-groups"></span>
                            <strong>{ __( 'Team Members', 'red-egg' ) }</strong>
                            <span className="team-members-editor__count">{ countLabel }</span>
                            <Button variant="secondary" size="small" onClick={ () => setIsEditing( false ) }>
                                { __( 'Preview grid', 'red-egg' ) }
                            </Button>
                        </div>

                        { loadError && (
                            <Notice status="error" isDismissible={ false }>
                                { __( 'Could not load team members. Is the GS Team plugin active?', 'red-egg' ) }
                            </Notice>
                        ) }

                        { members === false && ! loadError && <Spinner /> }

                        { members !== false && ! memberIds.length && (
                            <p className="team-members-editor__empty">
                                { __( 'No members picked. Every team member will show in the shortcode\'s default order. Add members below to curate the list.', 'red-egg' ) }
                            </p>
                        ) }

                        { selected.length > 0 && (
                            <ol className="team-members-editor__list">
                                { selected.map( ( m, index ) => (
                                    <li key={ m.id } className="team-members-editor__item">
                                        <span className="team-members-editor__index">{ index + 1 }</span>
                                        { m.thumb
                                            ? <img className="team-members-editor__thumb" src={ m.thumb } alt="" />
                                            : <span className="team-members-editor__thumb team-members-editor__thumb--empty"></span> }
                                        <span className="team-members-editor__meta">
                                            <span className="team-members-editor__name">{ m.name }</span>
                                            { m.designation && (
                                                <span className="team-members-editor__role">{ m.designation }</span>
                                            ) }
                                        </span>
                                        <span className="team-members-editor__controls">
                                            <Button
                                                icon="arrow-up-alt2"
                                                label={ __( 'Move up', 'red-egg' ) }
                                                size="small"
                                                disabled={ index === 0 }
                                                onClick={ () => moveMember( index, -1 ) }
                                            />
                                            <Button
                                                icon="arrow-down-alt2"
                                                label={ __( 'Move down', 'red-egg' ) }
                                                size="small"
                                                disabled={ index === selected.length - 1 }
                                                onClick={ () => moveMember( index, 1 ) }
                                            />
                                            <Button
                                                icon="no-alt"
                                                label={ __( 'Remove', 'red-egg' ) }
                                                size="small"
                                                isDestructive
                                                onClick={ () => removeMember( index ) }
                                            />
                                        </span>
                                    </li>
                                ) ) }
                            </ol>
                        ) }

                        { members !== false && available.length > 0 && (
                            <div className="team-members-editor__add">
                                <SelectControl
                                    value=""
                                    options={ addOptions }
                                    onChange={ addMember }
                                />
                            </div>
                        ) }
                    </div>
                ) }
                </div>
            </div>
        </Fragment>
    );
};

export default EditTeamMembers;
