/**
 * Header Intro Block – Save Component
 *
 * Two-column layout with left/right child blocks.
 * Optional squiggle decoration with scroll animation.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';

const SaveHeaderIntro = ( { attributes } ) => {
    const {
        image, bgColor, bgSlug, coloroverlay, padding, margin, columnWidth,
    } = attributes;

    // Build inline background styles
    const bgStyle = {};
    if ( image.url !== '' ) {
        bgStyle.backgroundImage = `url(${ image.url })`;
        bgStyle.backgroundRepeat = image.repeat || 'no-repeat';
        bgStyle.backgroundAttachment = image.attachment || 'scroll';
        bgStyle.backgroundSize = image.sizekey || 'cover';

        if ( image.bgkeyword === 'keyword' ) {
            bgStyle.backgroundPosition = image.position || 'center center';
        } else {
            const unit = image.bgunit || 'px';
            bgStyle.backgroundPosition = `${ image.positionX || 0 }${ unit } ${ image.positionY || 0 }${ unit }`;
        }

        if ( image.sizekey === '' && image.size ) {
            bgStyle.backgroundSize = `${ image.size }${ image.unit || '%' }`;
        }
    }

    if ( bgColor ) {
        bgStyle.backgroundColor = bgColor;
    }

    const blockProps = useBlockProps.save( {
        className: 'header-intro-block'
            + ( coloroverlay ? ' with-overlay' : '' )
            + ( bgSlug ? ' ' + bgSlug + ' with-bg' : '' )
            + ( columnWidth ? ' cols-' + columnWidth : '' ),
        style: bgStyle,
    } );

    const blockId = blockProps.id;

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <div { ...blockProps }>
                <div className="header-intro__columns">
                    <InnerBlocks.Content />
                </div>
            </div>
        </Fragment>
    );
};

export default SaveHeaderIntro;
