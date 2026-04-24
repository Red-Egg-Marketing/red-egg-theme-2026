/**
 * ColumnsWidth Component
 *
 * SelectControl for choosing column width ratios
 * in two-column layouts (50/50, 33/66, etc).
 */

const { Fragment } = wp.element;
const { PanelBody, SelectControl } = wp.components;
const { __ } = wp.i18n;

const columnsArray = [
    { label: __( '50% | 50%' ), value: 'col-50' },
    { label: __( '33% | 66%' ), value: 'col-66' },
    { label: __( '66% | 33%' ), value: 'col-33' },
    { label: __( '40% | 60%' ), value: 'col-60' },
    { label: __( '60% | 40%' ), value: 'col-40' },
];

const ColumnsWidth = ( props ) => {
    const { columnwidth, setAttributes } = props;

    return (
        <Fragment>
            <PanelBody
                title={ __( 'Column Widths', 'red-egg' ) }
                initialOpen={ true }
            >
                <SelectControl
                    label={ __( 'Select Column Width', 'red-egg' ) }
                    options={ columnsArray }
                    value={ columnwidth }
                    onChange={ ( val ) => setAttributes( { columnwidth: val } ) }
                />
            </PanelBody>
        </Fragment>
    );
};

ColumnsWidth.View = () => {
    return null;
};

export default ColumnsWidth;
