/**
 * Egg Cluster Block – Edit Component
 *
 * Mirrors the save markup exactly; eggs are drawn via CSS
 * background-image so the editor preview matches the frontend. The
 * editor stylesheet imports the same block SCSS, and img/ paths
 * resolve against the editor style output the same way.
 */

const { Fragment, useEffect } = wp.element;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, RangeControl, SelectControl } = wp.components;
const { __ } = wp.i18n;

const EditEggCluster = ( { attributes, setAttributes, clientId } ) => {
    const { count, touchBehavior, blockId } = attributes;

    useEffect( () => {
        if ( ! blockId ) {
            setAttributes( { blockId: 'block-' + clientId } );
        }
    }, [] );

    const blockProps = useBlockProps( {
        id: blockId,
        className: 'egg-cluster egg-cluster--count-' + count,
    } );

    const eggs = [];
    for ( let i = 1; i <= count; i++ ) {
        eggs.push(
            <span className={ 'egg-cluster__egg egg-cluster__egg--' + i } key={ i }>
                <span className="egg-cluster__layer egg-cluster__layer--white"></span>
                <span className="egg-cluster__layer egg-cluster__layer--red"></span>
            </span>
        );
    }

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __( 'Egg Cluster', 'red-egg' ) } initialOpen={ true }>
                    <RangeControl
                        label={ __( 'Number of Eggs', 'red-egg' ) }
                        value={ count }
                        onChange={ ( val ) => setAttributes( { count: val } ) }
                        min={ 1 }
                        max={ 6 }
                    />
                    <SelectControl
                        label={ __( 'Touch / No-Hover Behavior', 'red-egg' ) }
                        help={ __( 'What the eggs do on touch devices where there is no hover.', 'red-egg' ) }
                        value={ touchBehavior }
                        options={ [
                            { label: __( 'Stay white', 'red-egg' ), value: 'stay-white' },
                            { label: __( 'Auto-cycle red', 'red-egg' ), value: 'auto-cycle' },
                        ] }
                        onChange={ ( val ) => setAttributes( { touchBehavior: val } ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                { eggs }
            </div>
        </Fragment>
    );
};

export default EditEggCluster;
