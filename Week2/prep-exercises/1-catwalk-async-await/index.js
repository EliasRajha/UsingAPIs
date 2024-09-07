'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    let currentPos = startPos;
    img.style.left = currentPos + 'px';
    const intervalId = setInterval(() => {
      currentPos += STEP_SIZE_PX;
      img.style.left = currentPos + 'px';
      if (stopPos <= currentPos) {
        clearInterval(intervalId);
        resolve();
      }
    }, STEP_INTERVAL_MS);
    // Copy over the implementation from last week
  });
}

function dance(img) {
  return new Promise((resolve) => {
    const oldSource = img.src;
    img.src = DANCING_CAT_URL;
    setTimeout(() => {
      img.src = oldSource;
      resolve();
    }, DANCE_TIME_MS);
    // Copy over the implementation from last week
  });
}

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  while (true) {
    await walk(img, startPos, centerPos);
    console.log('cat is at ' + centerPos);
    await dance(img);
    console.log('cat is dancing');
    await walk(img, centerPos, stopPos);
    console.log('cat is at ' + stopPos);
  }

  // Use async/await syntax to loop the walk and dance functions
}

window.addEventListener('load', catWalk);