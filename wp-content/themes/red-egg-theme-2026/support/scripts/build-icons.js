#!/usr/bin/env node
/**
 * build-icons.js — regenerate support/assets/icons.json for the IconPicker.
 *
 * Reads the Font Awesome metadata file (`metadata/icons.json`) from an
 * extracted FA Pro package and emits the compact index the picker uses:
 *
 *   { n: name, l: label, t: [search terms], b: 1 }   // b only on brands
 *
 * Handles both the FA6 metadata shape (`styles: [...]`) and the FA7 shape
 * (`familyStylesByLicense: { pro: [{family, style}], free: [...] }`).
 *
 * Usage:
 *   node build-icons.js <path-to-metadata/icons.json>
 *   node build-icons.js ../vendor/fontawesome-pro/metadata/icons.json
 *
 * If no path is given it looks in a few common locations.
 */

const fs = require( 'fs' );
const path = require( 'path' );

const OUT = path.resolve( __dirname, '..', 'assets', 'icons.json' );

const CANDIDATES = [
	process.argv[ 2 ],
	path.resolve( __dirname, '..', 'vendor', 'fontawesome-pro', 'metadata', 'icons.json' ),
	path.resolve( __dirname, '..', '..', 'metadata', 'icons.json' ),
].filter( Boolean );

const src = CANDIDATES.find( ( p ) => fs.existsSync( p ) );

if ( ! src ) {
	console.error(
		'Could not find FA metadata icons.json. Pass the path explicitly:\n' +
			'  node build-icons.js /path/to/metadata/icons.json'
	);
	process.exit( 1 );
}

const raw = JSON.parse( fs.readFileSync( src, 'utf8' ) );

// Detect whether an icon belongs to the brands family across FA6/FA7 shapes.
function isBrand( meta ) {
	if ( Array.isArray( meta.styles ) && meta.styles.includes( 'brands' ) ) {
		return true;
	}
	const fsbl = meta.familyStylesByLicense;
	if ( fsbl ) {
		const all = [].concat( fsbl.pro || [], fsbl.free || [] );
		return all.some(
			( fam ) => fam.family === 'brands' || fam.style === 'brands'
		);
	}
	return false;
}

const index = Object.keys( raw )
	.sort()
	.map( ( name ) => {
		const meta = raw[ name ];
		const terms =
			( meta.search && Array.isArray( meta.search.terms )
				? meta.search.terms
				: [] ).map( String );

		const entry = {
			n: name,
			l: meta.label || name,
			t: terms,
		};
		if ( isBrand( meta ) ) {
			entry.b = 1;
		}
		return entry;
	} );

fs.writeFileSync( OUT, JSON.stringify( index ) );

const brands = index.filter( ( i ) => i.b ).length;
console.log(
	`Wrote ${ index.length } icons (${ brands } brands) to ${ path.relative(
		process.cwd(),
		OUT
	) }`
);
