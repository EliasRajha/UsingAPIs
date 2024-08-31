'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

// Event to restart the loop 
const repeatEvent = new Event("repeat");

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    // Resolve this promise when the cat (`img`) has walked from `startPos` to
    // `stopPos`.
    // Make good use of the `STEP_INTERVAL_PX` and `STEP_INTERVAL_MS`
    // constants.
    let currentPos = startPos;
    img.style.left = currentPos + 'px';
    const intervalId = setInterval(() => {
      currentPos += STEP_SIZE_PX;
      img.style.left = currentPos + 'px';
      if (stopPos <= currentPos) {
        // stop calling the interval
        clearInterval(intervalId);
        // Resolve this promise when the cat (`img`) has walked from `startPos` to `stopPos`.
        resolve();
      }
    }, STEP_INTERVAL_MS);
  });
}

function dance(img) {
  return new Promise((resolve) => {
    // Switch the `.src` of the `img` from the walking cat to the dancing cat
    // and, after a timeout, reset the `img` back to the walking cat. Then
    // resolve the promise.
    // Make good use of the `DANCING_CAT_URL` and `DANCE_TIME_MS` constants.
    let oldSource = img.src;
    img.src = DANCING_CAT_URL;
    setTimeout(() => {
      img.src = oldSource;
      resolve();  
    }, DANCE_TIME_MS);
  });
}

function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  // Use the `walk()` and `dance()` functions to let the cat do the following:
  // 1. Walk from `startPos` to `centerPos`.
  // 2. Then dance for 5 secs.
  // 3. Then walk from `centerPos` to `stopPos`.
  // 4. Repeat the first three steps indefinitely.
  const walkCenterPromise = walk(img, startPos, centerPos);
  walkCenterPromise.then(() => {
    console.log('cat is at ' + centerPos);
    // cat dance for 5 seconds
    const dancePromise = dance(img, centerPos, stopPos);
    dancePromise.then(() => {
      console.log('cat is dancing');
      // cat continue walking to the end
      const walkEndPromise = walk(img, centerPos, stopPos);
      walkEndPromise.then(() => {
        console.log('cat is at ' + stopPos);
        // Now dispatch repeat event to restart the process
        // code from https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
        window.dispatchEvent(repeatEvent);
      });
    });
  });
}

window.addEventListener('load', catWalk);
window.addEventListener('repeat', catWalk);