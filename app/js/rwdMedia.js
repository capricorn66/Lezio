const rwdMedia = {};

['xs', 'sm', 'md', 'lg', 'xl'].map( bp =>
    rwdMedia[bp] = () => document.querySelector(`.bs4-${bp}`).offsetParent !== null
);

export {rwdMedia};
