/**
 * Egg Cluster Block – Save Component
 *
 * Eggs are rendered via CSS background-image (see _style-block.scss),
 * which resolves img/egg-*.png against the compiled style.css at the
 * theme root -- the same path convention every other themed asset
 * uses, and independent of the theme folder name. Markup is just the
 * empty egg elements; the white/red layers and hover crossfade are
 * all CSS.
 */

const { useBlockProps } = wp.blockEditor;

const SaveEggCluster = ( { attributes } ) => {
    const { count, touchBehavior, blockId } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'egg-cluster egg-cluster--count-' + count
            + ( touchBehavior === 'auto-cycle' ? ' egg-cluster--touch-cycle' : '' ),
        'aria-hidden': 'true', // purely decorative
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
        <div { ...blockProps }>
            { eggs }
        </div>
    );
};

export default SaveEggCluster;
