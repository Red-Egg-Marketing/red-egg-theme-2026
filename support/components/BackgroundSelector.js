import React from 'react';
const { Fragment } = wp.element;
const { RichText, InnerBlocks, useBlockProps, InspectorControls, MediaUpload } = wp.blockEditor;
const { Button, PanelBody, ToggleControl, TextControl, ButtonGroup, RadioControl, SelectControl, RangeControl, ColorPalette, ResponsiveWrapper } = wp.components;
const { __ } = wp.i18n;


const labelStyle = {
    'margin-bottom' : '5px',
    'margin-top' : '5px',
    'display' : 'block',
    'width' : '100%'
}

const repeatOptions = [
    {
        label: __( 'No Repeat' ),
        value: 'no-repeat',
    },
    {
        label: __( 'Repeat X' ),
        value: 'repeat-x',
    },
    {
        label: __( 'Repeat Y' ),
        value: 'repeat-y',
    },
    {
        label: __( 'Repeat X & Y' ),
        value: 'repeat',
    },
];


const attachOptions = [
    {
        label: __( 'Scroll' ),
        value: 'scroll',
    },
    {
        label: __( 'Fixed' ),
        value: 'fixed',
    },
    {
        label: __( 'Local' ),
        value: 'local',
    },
];


const sizeOptions = [
    {
        label: __( 'Cover' ),
        value: 'cover',
    },
    {
        label: __( 'Contain' ),
        value: 'contain',
	}
];


const unitOptions = [
    {
        label: __( '%' ),
        value: '%',
    },
    {
        label: __( 'px' ),
        value: 'px',
	}
];

const positionOptions = [
    {
        label: __( 'Top Left' ),
        value: 'top left',
    },
    {
        label: __( 'Top Right' ),
        value: 'top right',
    },
    {
        label: __( 'Top Center' ),
        value: 'top center',
    },
    {
        label: __( 'Center Center' ),
        value: 'center center',
    },
    {
        label: __( 'Bottom Center' ),
        value: 'bottom center',
    },
    {
        label: __( 'Bottom Left' ),
        value: 'bottom left',
    },
    {
        label: __( 'Bottom Right' ),
        value: 'bottom right',
    },
];

const BackgroundSelector = (props) => {

	const place = props.placeholder != '' ? props.placeholder : 'Content...';

	const { image } = props;

	const setBackgroundImage = (media) => {

    	let newBody = JSON.parse(JSON.stringify(image));

    	let type = media.mime;
    	newBody.url = media.url;
    	if (type == "image/svg+xml") {
    		var xmlhttp = new XMLHttpRequest();
			xmlhttp.open("GET", media.url, true);  
			xmlhttp.onreadystatechange = function(){
				if(xmlhttp.readyState==4 && xmlhttp.status==200){
					let myresponse = xmlhttp.responseText;
					let parser = new DOMParser();
    				let doc = parser.parseFromString(myresponse, "image/svg+xml");
    				let viewBox = doc.documentElement.viewBox.baseVal;
    				let width = viewBox.width;
    				let height = viewBox.height;
    				newBody.width = width;
    				newBody.height = height;
				}
			}

			xmlhttp.send();
    	} else {
    		newBody.width = media.width;
    		newBody.height = media.height;
    	}

    	props.setAttributes({
    		image: newBody
    	});
    }

	const setBackgroundRepeat = ( selectedRepeat ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.repeat = selectedRepeat;

    	props.setAttributes({
    		image: newBody
    	});
    }


    const setBackgroundAttach = ( selectedAttach ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.attachment = selectedAttach;

    	props.setAttributes({
    		image: newBody
    	});
    }


    const setBackgroundPosition = ( selectedPos ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.position = selectedPos;

    	props.setAttributes({
    		image: newBody
    	});
    }


    const setBackgroundSize = ( selectedSize ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.size = selectedSize;

    	props.setAttributes({
    		image: newBody
    	});
    }

    const setBackgroundSizeKey = ( selectedKey ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.sizekey = selectedKey;
    	newBody.size = selectedKey == '' ? '100' : '';

    	props.setAttributes({
    		image: newBody
    	});
    }

    const setBackgroundUnit = ( selectedKey ) => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.unit = selectedKey;

    	props.setAttributes({
    		image: newBody
    	});
    }

	const removeBackgroundImage = () => {

    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.url = '';
    	newBody.width = '';
    	newBody.height = '';

    	props.setAttributes({
    		image: newBody
    	});
    }

    const setBackgroundOption = (value) => {
    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.bgkeyword = value;

    	props.setAttributes({
    		image: newBody
    	})
    }

    const setBackgroundPositionX = (value) => {
    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.positionX = value;

    	props.setAttributes({
    		image: newBody
    	});
    }

    const setBackgroundPositionY = (value) => {
    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.positionY = value;

    	props.setAttributes({
    		image: newBody
    	});
    }

    const setBackgroundUnitPos = (value) => {
    	let newBody = JSON.parse(JSON.stringify(image));
    	newBody.bgunit = value;

    	props.setAttributes({
    		image: newBody
    	});
    }

	return (
		<Fragment>
			<PanelBody
					title={__('Background')}
					initialOpen={true}
				>
        			<label style={ labelStyle }>{__('Background Image')}</label>
        			<MediaUpload
						allowedTypes={ ['image'] }
						onSelect={ setBackgroundImage }
						value={ image.url }
						render={ ( {open} ) =>(
							<Fragment>
								<Button
									isSecondary
									onClick={ open }
									style={
										{
											'margin-bottom' : '15px',
											'height' : 'auto',
											'display' : 'block',
											'width' : '100%'
										}
									}
								> 
									{ image.url == '' && ( __('Add Background Image') )}
									{ image.url != '' && (
										<ResponsiveWrapper
											naturalWidth={ image.width }
											naturalHeight={ image.height }
										>
											<img 
												src={ image.url }
												style={
													{
														'max-height' : 'auto',
														'width' : 'auto',
													}
												}
											/>
										</ResponsiveWrapper>
									)}
								</Button>
								
								{ image.url != '' && (
									<Fragment>
										<Button
											isDestructive
											isSmall
											onClick={
												removeBackgroundImage
											}
										>
											Remove Image
										</Button>
									</Fragment>
								)}
							</Fragment>
						)}
					/>
					<SelectControl
						label={ __( 'Set Background Repeat' ) }
            			options={ repeatOptions }
            			value={ image.repeat }
            			onChange={ ( selectedRepeat ) => {
            				setBackgroundRepeat( selectedRepeat )
            			}}
        			/>
        			<SelectControl
						label={ __( 'Set Background Attachment' ) }
            			options={ attachOptions }
            			value={ image.attachment }
            			onChange={ ( selectedAttach ) => {
            				setBackgroundAttach( selectedAttach )
            			}}
        			/>

        			<RadioControl
        				label={ __( 'Background Position Type' ) }
        				selected={ image.bgkeyword }
        				options={ [
                			{ label: 'Keyword', value: 'keyword' },
                			{ label: 'Values', value: 'values' },
            			] }
            			onChange={ ( value ) => setBackgroundOption( value ) }
        			/>
        			{ image.bgkeyword == 'keyword' && (
        				<SelectControl
							label={ __( 'Set Background Position Keyword' ) }
            				options={ positionOptions }
            				value={ image.position }
            				onChange={ ( selectedPos ) => {
            					setBackgroundPosition( selectedPos )
            				}}
        				/>
        			)}
        			{ image.bgkeyword == 'values' && (
        				<Fragment>
        					
        					<TextControl
								label={ __( 'Set Background Position X' ) }
            					value={ image.positionX }
            					onChange={ ( selectedPos ) => {
            						setBackgroundPositionX( selectedPos )
            					}}
        					/>
        					<TextControl
								label={ __( 'Set Background Position Y' ) }
            					value={ image.positionY }
            					onChange={ ( selectedPos ) => {
            						setBackgroundPositionY( selectedPos )
            					}}
        					/>
        					<ButtonGroup label="Unit Type" 
        						onClick={ (value) => {
        							let inputVal = value.target.attributes.value.nodeValue;
        							setBackgroundUnitPos(inputVal);
        						}}
        					>
            					<Button value="px" isPressed={ image.bgunit == 'px' || image.bgunit == undefined ? true : false}>px</Button>
            					<Button value="%" isPressed={ image.bgunit == '%' ? true : false}>%</Button>
            					<Button value="em" isPressed={ image.bgunit == 'em' ? true : false}>em</Button>
            					<Button value="rem" isPressed={ image.bgunit == 'rem' ? true : false}>rem</Button>
        					</ButtonGroup>
        				</Fragment>
        			)}
        			
        			<SelectControl
						label={ __( 'Set Background Size Keyword' ) }
            			options={ sizeOptions }
            			value={ image.sizekey }
            			onChange={ ( selectedKey ) => {
            				setBackgroundSizeKey( selectedKey )
            			}}
        			/>      			
        			<RangeControl
						label={ __( `Set Background Size ${ image.unit}` ) }
            			value={ image.size }
            			onChange={ ( selectedSize ) => {
            				setBackgroundSize( selectedSize )
            			}}
            			min={1}
            			max={image.unit == '%' ? 100 : 9999}
            			resetFallbackValue={100}
        			/>
        			<SelectControl
						label={ __( 'Set Background Size Unit' ) }
            			options={ unitOptions }
            			className="unit-controls"
            			value={ image.unit }
            			onChange={ ( selectedUnit ) => {
            				setBackgroundUnit( selectedUnit )
            			}}
        			/>
			</PanelBody>
		</Fragment>
	)
}

BackgroundSelector.View = (props) => {
	return null;
}

export default BackgroundSelector;
