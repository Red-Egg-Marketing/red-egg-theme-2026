import React from 'react';
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { Button, PanelBody, TextControl, ButtonGroup, Flex, FlexItem } = wp.components;
const { __ } = wp.i18n;


const MarginSelector = (props) => {

	const { margin, id } = props;

    const setMarginTop = (value) => {
    	let newBody = JSON.parse(JSON.stringify(margin));
    	newBody.margintop = value;

    	props.setAttributes({
    		margin: newBody
    	});
    }

    const setMarginRight = (value) => {
    	let newBody = JSON.parse(JSON.stringify(margin));
    	newBody.marginright = value;

    	props.setAttributes({
    		margin: newBody
    	});
    }

    const setMarginBottom = (value) => {
        let newBody = JSON.parse(JSON.stringify(margin));
        newBody.marginbottom = value;

        props.setAttributes({
            margin: newBody
        });
    }

    const setMarginLeft = (value) => {
        let newBody = JSON.parse(JSON.stringify(margin));
        newBody.marginleft = value;

        props.setAttributes({
            margin: newBody
        });
    }

    const setMarginUnit = (value) => {
    	let newBody = JSON.parse(JSON.stringify(margin));
    	newBody.unit = value;

    	props.setAttributes({
    		margin: newBody
    	});
    }

    let string = margin.margintop ? 'margin-top:' + margin.margintop + margin.unit + ';' : '';
        string += margin.marginright ? 'margin-right:' + margin.marginright + margin.unit + ';' : '';
        string += margin.marginbottom ? 'margin-bottom:' + margin.marginbottom + margin.unit + ';' : '';
        string += margin.marginleft ? 'margin-left:' + margin.marginleft + margin.unit + ';' : '';

	return (
		<Fragment>
            <InspectorControls>
			<PanelBody
					title={__('Margin')}
					initialOpen={false}
				>
                    <Flex>
                    <FlexItem>
        			 <TextControl
					   	label={ __( 'Top' ) }
            		  	value={ margin.margintop }
                        type="number"
            		  	onChange={ ( val ) => {
            		  		setMarginTop( val )
            		  	}}
        			 />
                     </FlexItem>
                     <FlexItem>
        			 <TextControl
					   	label={ __( 'Right' ) }
            		  	value={ margin.marginright }
                        type="number"
            		  	onChange={ ( val ) => {
            		  		setMarginRight( val )
            		  	}}
        			 />
                     </FlexItem>
                     <FlexItem>
        			 <TextControl
					   	label={ __( 'Bottom' ) }
            		  	value={ margin.marginbottom }
                        type="number"
            		  	onChange={ ( val ) => {
            		  		setMarginBottom( val )
            		  	}}
        			 />
                     </FlexItem>
                     <FlexItem>
        			 <TextControl
					   	label={ __( 'Left' ) }
            		  	value={ margin.marginleft }
                        type="number"
            		  	onChange={ ( val ) => {
            		  		setMarginLeft( val )
            		  	}}
        			 />
                     </FlexItem>
                    </Flex>
        			<ButtonGroup label="Unit Type" 
        				onClick={ (value) => {
        					let inputVal = value.target.attributes.value.nodeValue;
        					setMarginUnit(inputVal);
        				}}
        			>
            			<Button value="px" isPressed={ margin.unit == 'px' ? true : false}>px</Button>
            			<Button value="%" isPressed={ margin.unit == '%' ? true : false}>%</Button>
            			<Button value="em" isPressed={ margin.unit == 'em' ? true : false}>em</Button>
            			<Button value="rem" isPressed={ margin.unit == 'rem' ? true : false}>rem</Button>
        			</ButtonGroup>
			</PanelBody>
            </InspectorControls>

            { (margin.marginleft || margin.marginright || margin.margintop || margin.marginbottom) && (
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

MarginSelector.View = (props) => {
    const { margin, id } = props;

    if (margin.marginleft || margin.marginright || margin.margintop || margin.marginbottom) {
       let string = margin.margintop ? 'margin-top:' + margin.margintop + margin.unit + ';' : '';
        string += margin.marginright ? 'margin-right:' + margin.marginright + margin.unit + ';' : '';
        string += margin.marginbottom ? 'margin-bottom:' + margin.marginbottom + margin.unit + ';' : '';
        string += margin.marginleft ? 'margin-left:' + margin.marginleft + margin.unit + ';' : '';
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

export default MarginSelector;
