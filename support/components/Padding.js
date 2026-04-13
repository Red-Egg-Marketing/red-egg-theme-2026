
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls, MediaUpload } = wp.blockEditor;
const { Button, PanelBody, ToggleControl, TextControl, ButtonGroup, RadioControl, SelectControl, RangeControl, ColorPalette, ResponsiveWrapper, Flex, FlexItem } = wp.components;
const { __ } = wp.i18n;


const labelStyle = {
    'margin-bottom' : '5px',
    'margin-top' : '5px',
    'display' : 'block',
    'width' : '100%'
}

const unitOptions = [
    {
        label: __( '%' ),
        value: '%',
    },
    {
        label: __( 'px' ),
        value: 'px',
	},
	{
        label: __( 'rem' ),
        value: 'rem',
	},
	{
        label: __( 'em' ),
        value: 'em',
	}
];


const PaddingSelector = (props, clientId) => {

	const { padding, id } = props;

    const setBackgroundSizeKey = ( selectedKey ) => {

    	let newBody = JSON.parse(JSON.stringify(padding));
    	newBody.sizekey = selectedKey;
    	newBody.size = selectedKey == '' ? '100' : '';

    	props.setAttributes({
    		padding: newBody
    	});
    }

    const setBackgroundUnit = ( selectedKey ) => {

    	let newBody = JSON.parse(JSON.stringify(padding));
    	newBody.unit = selectedKey;

    	props.setAttributes({
    		padding: newBody
    	});
    }

    const setPaddingTop = (value) => {
    	let newBody = JSON.parse(JSON.stringify(padding));
    	newBody.paddingtop = value;

    	props.setAttributes({
    		padding: newBody
    	});
    }

    const setPaddingRight = (value) => {
    	let newBody = JSON.parse(JSON.stringify(padding));
    	newBody.paddingright = value;

    	props.setAttributes({
    		padding: newBody
    	});
    }

    const setPaddingBottom = (value) => {
        let newBody = JSON.parse(JSON.stringify(padding));
        newBody.paddingbottom = value;

        props.setAttributes({
            padding: newBody
        });
    }

    const setPaddingLeft = (value) => {
        let newBody = JSON.parse(JSON.stringify(padding));
        newBody.paddingleft = value;

        props.setAttributes({
            padding: newBody
        });
    }

    const setPaddingUnit = (value) => {
    	let newBody = JSON.parse(JSON.stringify(padding));
    	newBody.unit = value;

    	props.setAttributes({
    		padding: newBody
    	});
    }

    let string = padding.paddingtop ? 'padding-top:' + padding.paddingtop + padding.unit + ';' : '';
        string += padding.paddingright ? 'padding-right:' + padding.paddingright + padding.unit + ';' : '';
        string += padding.paddingbottom ? 'padding-bottom:' + padding.paddingbottom + padding.unit + ';' : '';
        string += padding.paddingleft ? 'padding-left:' + padding.paddingleft + padding.unit + ';' : '';

	return (
		<Fragment>
            <InspectorControls>
			<PanelBody
					title={__('Padding')}
					initialOpen={false}
				>
                    <Flex>
                    <FlexItem>
        			 <TextControl
					   	label={ __( 'Top' ) }
            		  	value={ padding.paddingtop }
                        type="number"
                        min="0"
            		  	onChange={ ( selectedPos ) => {
            		  		setPaddingTop( selectedPos )
            		  	}}
        			 />
                     </FlexItem>
                     <FlexItem>
        			 <TextControl
					   	label={ __( 'Right' ) }
            		  	value={ padding.paddingright }
                        type="number"
                        min="0"
            		  	onChange={ ( selectedPos ) => {
            		  		setPaddingRight( selectedPos )
            		  	}}
        			 />
                     </FlexItem>
                     <FlexItem>
        			 <TextControl
					   	label={ __( 'Bottom' ) }
            		  	value={ padding.paddingbottom }
                        type="number"
                        min="0"
            		  	onChange={ ( selectedPos ) => {
            		  		setPaddingBottom( selectedPos )
            		  	}}
        			 />
                     </FlexItem>
                     <FlexItem>
        			 <TextControl
					   	label={ __( 'Left' ) }
            		  	value={ padding.paddingleft }
                        type="number"
                        min="0"
            		  	onChange={ ( selectedPos ) => {
            		  		setPaddingLeft( selectedPos )
            		  	}}
        			 />
                     </FlexItem>
                    </Flex>
        			<ButtonGroup label="Unit Type" 
        				onClick={ (value) => {
        					let inputVal = value.target.attributes.value.nodeValue;
        					setPaddingUnit(inputVal);
        				}}
        			>
            			<Button value="px" isPressed={ padding.unit == 'px' ? true : false}>px</Button>
            			<Button value="%" isPressed={ padding.unit == '%' ? true : false}>%</Button>
            			<Button value="em" isPressed={ padding.unit == 'em' ? true : false}>em</Button>
            			<Button value="rem" isPressed={ padding.unit == 'rem' ? true : false}>rem</Button>
        			</ButtonGroup>
			</PanelBody>
            </InspectorControls>

            { (padding.paddingleft || padding.paddingright || padding.paddingtop || padding.paddingbottom) && (
                <style type="text/css">
                    { `#${id} {
                            ${string}
                        }`
                    }
                </style>
            )}
		</Fragment>
	)
}

PaddingSelector.View = (props) => {
    const { padding, id } = props;

    if (padding.paddingleft || padding.paddingright || padding.paddingtop || padding.paddingbottom) {
       let string = padding.paddingtop ? 'padding-top:' + padding.paddingtop + padding.unit + ';' : '';
        string += padding.paddingright ? 'padding-right:' + padding.paddingright + padding.unit + ';' : '';
        string += padding.paddingbottom ? 'padding-bottom:' + padding.paddingbottom + padding.unit + ';' : '';
        string += padding.paddingleft ? 'padding-left:' + padding.paddingleft + padding.unit + ';' : '';
	   return (
            <style type="text/css">
               {    `#${id} {
                        ${string}
                    }`
                }
            </style>
        );
    } else {
        return null;
    }
}

export default PaddingSelector;
