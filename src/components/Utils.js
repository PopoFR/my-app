export function getRandomElem(elems) {
    return elems[getRandomInt(elems.length)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
