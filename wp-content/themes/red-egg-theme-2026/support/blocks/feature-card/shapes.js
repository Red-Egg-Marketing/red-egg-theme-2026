/**
 * Feature Card icon background shapes.
 * Blob options (semi-transparent) used behind the icon instead
 * of the default circle. Shared by edit.js and save.js.
 */

export const BLOB_SHAPES = {
    blob1: '<svg viewBox="0 0 76 75" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M76 37.5C76 58.2115 59.2862 75 38.6668 75C18.0475 75 0 44.9977 0 24.2862C0 3.57466 18.0498 0 38.6668 0C59.2839 0 76 16.7885 76 37.5Z" fill="white"/></svg>',
    blob2: '<svg viewBox="0 0 77 75" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M75.2835 45.0905C74.6778 47.354 68.4352 62.1197 53.2156 71.9325C50.2275 73.8581 46.2617 74.9973 40.3986 74.9973C22.1557 74.9998 -1.61853 57.3422 0.0878861 34.8344C1.36959 17.9029 16.461 6.53008 28.7678 2.43617C30.9743 1.70252 54.153 -5.60643 68.4879 9.28189C81.3049 22.5927 76.0525 42.2135 75.2835 45.0905Z" fill="white" opacity="0.3"/></svg>',
    blob3: '<svg viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" d="M75 37.5C75 58.2115 56.2891 75 33.206 75C10.1228 75 9.9665 54.9922 2.33727 35.445C-6.30035 13.3097 10.1228 0 33.206 0C56.2891 0 75 16.7885 75 37.5Z" fill="white"/></svg>',
};

export const SHAPE_OPTIONS = [
    { label: 'Circle', value: 'circle' },
    { label: 'Blob 1', value: 'blob1' },
    { label: 'Blob 2', value: 'blob2' },
    { label: 'Blob 3', value: 'blob3' },
];
