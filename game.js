var requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

const Resources = {
    loaded: 0,
    total: 0,
    images: {},
    onComplete: null,

    load(urls) {
        this.total = urls.length;
        this.loaded = 0;

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const image = new Image();

            image.addEventListener('load', () => {
                this.loaded++;
                this.images[url] = image;

                if (this.loaded === this.total && typeof this.onComplete === 'function') {
                    this.onComplete();
                }
            });

            image.addEventListener('error', () => {
                console.error(`Error loading image: ${url}`);

                this.loaded++;

                if (this.loaded === this.total && typeof this.onComplete === 'function') {
                    this.onComplete();
                }
            });

            image.src = url;
        }
    },

    onReady(callback) {
        if (typeof callback === 'function') {
            this.onComplete = callback;

            if (this.loaded === this.total) {
                this.onComplete();
            }
        }
    },

    get(url) {
        return this.images[url] || null;
    },

    print() {
        console.log(this.images);
    }
};

var index = 0;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
canvas.height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;

// Keyboard input
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

function handleKeyDown(event) {
  // Get the keycode of the pressed key
  const keyCode = event.keyCode;

  // Handle key down event
  // Example: Perform an action when the spacebar is pressed
  if (keyCode === 32) {
    balloon.text = "Let's go";
    center_image.image = resources.get(slides[index]);
    index += 1;
    index %= slides.length;
  }
}

function handleKeyUp(event) {
  // Get the keycode of the released key
  const keyCode = event.keyCode;

  // Handle key up event
  // Example: Stop an action when the spacebar is released
  if (keyCode === 32) {
    // Spacebar is released, stop action
    console.log("Spacebar is released");
  }
}

// Tap events on mobile devices
canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchend", handleTouchEnd);

function handleTouchStart(event) {
  // Prevent default touch behavior
  event.preventDefault();

  // Get touch coordinates relative to the canvas
  const touchX = event.touches[0].clientX - canvas.offsetLeft;
  const touchY = event.touches[0].clientY - canvas.offsetTop;

  // Handle touch start event
  console.log("Touch start at:", touchX, touchY);
  balloon.text = "Let's go";
    center_image.image = resources.get(slides[index]);
    index += 1;
    index %= slides.length;
}

function handleTouchEnd(event) {
  // Prevent default touch behavior
  event.preventDefault();

  // Get touch coordinates relative to the canvas
  const touchX = event.changedTouches[0].clientX - canvas.offsetLeft;
  const touchY = event.changedTouches[0].clientY - canvas.offsetTop;

  // Handle touch end event
  console.log("Touch end at:", touchX, touchY);
}


const NUM_LEAVES = 20;

const resourses_urls = [
    "img/balloon.png",
    "img/pangolin.png",
    "img/leave1.png",
    "img/leave2.png",
    "img/leave3.png",
    "img/leave4.png",
    "img/leave5.png",
    "img/leave6.png",
    "img/ark.jpg",
    "img/beauty.jpg",
    "img/bush.jpg",
    "img/cactus.jpg",
    "img/crazy-egg.jpg",
    "img/curl.jpg",
    "img/drop.jpg",
    "img/fence.jpg",
    "img/flower.jpg",
    "img/flower2.jpg",
    "img/flower3.jpg",
    "img/flower4.jpg",
    "img/friend.jpg",
    "img/hameleo.jpg",
    "img/lemon.jpg",
    "img/mary.jpg",
    "img/mist.jpg",
    "img/msu1.jpg",
    "img/msu2.jpg",
    "img/msu3.jpg",
    "img/msu4.jpg",
    "img/msu5.jpg",
    "img/path1.jpg",
    "img/pies.jpg",
    "img/rainbow.jpg",
    "img/sanset2.jpg",
    "img/studak.jpg",
    "img/sunset.jpg",
    "img/tangarin.jpg",
    "img/tree.jpg",
    "img/vera.jpg",
];

const slides = [
    "img/ark.jpg",
    "img/beauty.jpg",
    "img/bush.jpg",
    "img/cactus.jpg",
    "img/crazy-egg.jpg",
    "img/curl.jpg",
    "img/drop.jpg",
    "img/fence.jpg",
    "img/flower.jpg",
    "img/flower2.jpg",
    "img/flower3.jpg",
    "img/flower4.jpg",
    "img/friend.jpg",
    "img/hameleo.jpg",
    "img/lemon.jpg",
    "img/mary.jpg",
    "img/mist.jpg",
    "img/msu1.jpg",
    "img/msu2.jpg",
    "img/msu3.jpg",
    "img/msu4.jpg",
    "img/msu5.jpg",
    "img/path1.jpg",
    "img/pies.jpg",
    "img/rainbow.jpg",
    "img/sanset2.jpg",
    "img/studak.jpg",
    "img/sunset.jpg",
    "img/tangarin.jpg",
    "img/tree.jpg",
    "img/vera.jpg",
];

class Leaf {
    constructor(x, y, speed, image_url) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image_url = image_url;
    }

    update() {
        this.y += this.speed;
    }

    render() {
        ctx.drawImage(resources.get(this.image_url), this.x, this.y);
    }
}

class Pangolin {
    constructor(x, y, image_url) {
        this.x = x;
        this.y = y;
        this.image_url = image_url;
    }

    update() {
    }

    render() {
        ctx.drawImage(resources.get(this.image_url), this.x, this.y);
    }
}

class Balloon {
  constructor(x, y, text, image_url) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.image_url = image_url;
  }

  update() {
  }

  render() {
    const image = resources.get(this.image_url);
    ctx.drawImage(image, this.x, this.y);

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(this.text, this.x + image.width / 2, this.y + image.height / 2);
  }
}

class BlurImage {
  constructor(image, blurAmount, maxWidth, maxHeight) {
    this.image = image;
    this.blurAmount = blurAmount;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
  }

  render() {
    const blurRadius = this.blurAmount > 0 ? this.blurAmount : 0;

    ctx.filter = `blur(${blurRadius}px)`;
    // Check if the image's dimensions exceed the maximum values
    var width = this.image.width;
    var height = this.image.height;

    if (width > this.maxWidth || height > this.maxHeight) {
        const scale = Math.min(this.maxWidth / width, this.maxHeight / height);
        width *= scale;
        height *= scale;
    }

    const x = canvas.width / 2 - width / 2;
    const y = canvas.height / 2 - height / 2;

    ctx.drawImage(this.image, x, y, width, height);

    // Reset the filter for subsequent drawings
    ctx.filter = "none";
  }
}



/*class Game {

    constructor(resources_list) {
        this.resourses = Object.create(Resources);
        this.resources_list = resources_list;
    }

    start() {
        this.resources.load(this.resources_list);
        this.resources.onReady(this.init.bind(this));
    }

    init() {
        this.leafObjects = [];

        for (let i = 0; i < NUM_LEAVES; i++) {
            const x = Math.random() * canvas.width; // Random x position
            const y = Math.random() * -canvas.height; // Start above the canvas
            const speed = Math.random() + 1; // Random speed between 1 and 3
            const image = this.resources.get(`img/leave${i % 6 + 1}.png`);

            const leaf = new Leaf(x, y, speed, image);
            this.leafObjects.push(leaf);
        }

        const pangolin_ = this.resources.get("img/pangolin.png");
        const balloon_ = this.resources.get("img/balloon.png");
        this.pangolin = new Pangolin(
            canvas.width - pangolin_.width,
            canvas.height - pangolin_.height,
            pangolin_);
        this.balloon = new Balloon(
            canvas.width - pangolin_.width - balloon_.width,
            canvas.height - pangolin_.height - balloon_.height,
            "Happy Birthday",
            balloon_
            )
        this.gameLoop();
    }

    gameLoop() {
        this.update(); // Update game logic
        this.render(); // Render game objects
        requestAnimationFrame(this.gameLoop.bind(this)); // Call gameLoop() again
    }

    update() {
        for (let i = 0; i < this.leafObjects.length; i++) {
            const leaf = this.leafObjects[i];
            leaf.update();

            // Check if leaf has fallen off the screen
            if (leaf.y > canvas.height) {
                leaf.y = -100; // Reset the leaf position above the canvas
                leaf.x = Math.random() * canvas.width; // Randomize x position
            }
        }
    }

    render() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render each leaf
        for (let i = 0; i < this.leafObjects.length; i++) {
            const leaf = this.leafObjects[i];
            leaf.render();
        }

        this.pangolin.render();
        this.balloon.render();
    }
}*/

function gameLoop() {
    update(); // Update game logic
    render(); // Render game objects
    requestAnimationFrame(gameLoop); // Call gameLoop() again
}

function update() {
    for (let i = 0; i < leafObjects.length; i++) {
        const leaf = leafObjects[i];
        leaf.update();

        // Check if leaf has fallen off the screen
        if (leaf.y > canvas.height) {
            leaf.y = -100; // Reset the leaf position above the canvas
            leaf.x = Math.random() * canvas.width; // Randomize x position
        }
    }
}

function render() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    center_image.render();
    // Render each leaf
    for (let i = 0; i < leafObjects.length; i++) {
        const leaf = leafObjects[i];
        leaf.render();
    }

    pangolin.render();
    balloon.render();
}

function init() {

    for (let i = 0; i < NUM_LEAVES; i++) {
        const x = Math.random() * canvas.width; // Random x position
        const y = Math.random() * -canvas.height; // Start above the canvas
        const speed = Math.random() + 1; // Random speed between 1 and 3
        const image_url = `img/leave${i % 6 + 1}.png`;

        const leaf = new Leaf(x, y, speed, image_url);
        leafObjects.push(leaf);
    }

    const pangolin_ = resources.get("img/pangolin.png");
    const balloon_ = resources.get("img/balloon.png");
    pangolin.x = canvas.width - pangolin_.width;
    pangolin.y = canvas.height - pangolin_.height;

    balloon.x = canvas.width - pangolin_.width - balloon_.width;
    balloon.y = canvas.height - pangolin_.height - balloon_.height;

    const image = resources.get("img/ark.jpg");
    center_image.image = image;

    gameLoop();
}


var leafObjects = [];
var pangolin = new Pangolin(0, 0, "img/pangolin.png");
var balloon = new Balloon(0, 0, "Happy Birthday", "img/balloon.png");
var center_image = new BlurImage(null, 0,500, 600);

const resources = Object.create(Resources);

resources.load(resourses_urls);

resources.onReady(init);
