/**
 * Insights Block – Save Component
 *
 * Outputs InnerBlocks header content + a root element
 * for frontend.js to hydrate with resource post data.
 */

const { Fragment } = wp.element;
const { InnerBlocks, useBlockProps } = wp.blockEditor;

import PaddingSelector from '../../components/Padding.js';
import MarginSelector from '../../components/Margin.js';
import BlobAnimation from '../../components/BlobAnimation.js';

const SaveInsights = ( { attributes } ) => {
    const {
        category, postsToShow, bgColor, bgSlug,
        padding, margin, blockId,
        blobEnabled, blobShape, blobSpeed, blobPosition, squiggleEnabled
    } = attributes;

    const blockProps = useBlockProps.save( {
        id: blockId,
        className: 'insights-block' + ( bgSlug ? ' ' + bgSlug : '' ),
    } );

    return (
        <Fragment>
            <PaddingSelector.View padding={ padding } id={ blockId } />
            <MarginSelector.View margin={ margin } id={ blockId } />
            <section { ...blockProps }>
                <BlobAnimation.View
                    blobEnabled={ blobEnabled }
                    blobShape={ blobShape }
                    blobSpeed={ blobSpeed }
                    blobPosition={ blobPosition }
                />
                { squiggleEnabled && (
                    <div className="squiggle-decoration" data-squiggle-animate="true">
                        <svg className="squiggle-decoration__svg" width="196" height="29" viewBox="0 0 196 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M196 29C184.63 29 178.87 22.535 173.785 16.83C169.085 11.555 165.03 7 156.8 7C148.57 7 144.51 11.555 139.815 16.83C134.73 22.535 128.97 29 117.6 29C106.23 29 100.47 22.535 95.385 16.83C90.685 11.555 86.63 7 78.4 7C70.17 7 66.11 11.555 61.415 16.83C56.33 22.535 50.57 29 39.2 29C27.83 29 22.07 22.535 16.985 16.83C12.29 11.555 8.23 7 0 7V0C11.37 0 17.13 6.465 22.215 12.17C26.915 17.445 30.97 22 39.2 22C47.43 22 51.49 17.445 56.185 12.17C61.27 6.465 67.03 0 78.395 0C89.76 0 95.525 6.465 100.61 12.17C105.31 17.445 109.365 22 117.595 22C125.825 22 129.885 17.445 134.58 12.17C139.665 6.465 145.425 0 156.795 0C168.165 0 173.925 6.465 179.01 12.17C183.71 17.445 187.765 22 195.995 22V29H196Z" fill="#DC2035"/></svg>
                    </div>
                ) }
                <div className="block-wrapper">
                    <header className="insights-block__header">
                        <InnerBlocks.Content />
                    </header>

                    <div
                        id="InsightsBlockRoot"
                        className="resources grid"
                        data-posts-to-show={ postsToShow }
                        data-category={ category || '' }
                    ></div>
                </div>
            </section>
        </Fragment>
    );
};

export default SaveInsights;
