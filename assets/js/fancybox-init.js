// Add initial console logs to check script loading
console.log('Fancybox init script loaded');

// Load image descriptions once at startup
let imageDescriptions = {};
const baseUrl = document.querySelector('meta[name="baseurl"]')?.content || '';
fetch(`${baseUrl}/images/image_descriptions.json`)
 .then(response => response.json())
 .then(data => {
 imageDescriptions = data;
 console.log('Image descriptions loaded successfully');
 })
 .catch(error => {
 console.error('Failed to load image descriptions:', error);
 });

document.addEventListener("DOMContentLoaded", function() {
 console.log('DOM ready, initializing Fancybox');
 
 // Check if Fancybox is loaded
 if (typeof Fancybox === 'undefined') {
 console.error('Fancybox is not defined! Script may not be loaded correctly.');
 return;
 } else {
 console.log('Fancybox is loaded and ready');
 }
 
 try {
 // Initialize Fancybox with simplified configuration
 Fancybox.bind('[data-fancybox="gallery"]', {
 compact: false,
 idle: false,
 dragToClose: false,
 contentClick: "iterateZoom",
 Images: {
 zoom: true,
 fit: "contain",
 Panzoom: {
 maxScale: 2
 }
 },
 Toolbar: {
 display: {
 left: [],
 middle: [],
 right: [
 "toggle1to1",
 "slideshow",
 "fullscreen",
 "thumbs",
 "close"
 ]
 },
 absolute: true,
 preventClick: false
 },
 Slideshow: {
 autostart: false,
 speed: 3000
 },
 Thumbs: {
 type: "modern",
 showOnStart: true,
 key: null,
 minCount: 2,
 thumbHeight: 96,
 gap: 0,
 autoStart: true,
 Carousel: {
 center: true,
 fillSlide: true,
 friction: 0.8
 }
 },
 // Define caption as a function
 caption: (fancybox, slide) => {
 const imageName = slide.triggerEl?.dataset.imageName;
 if (imageName && imageDescriptions[imageName]) {
 const desc = imageDescriptions[imageName];
 return `
 <div class="fancybox-caption-wrap">
 <h2 class="fancybox-caption-title">${desc.title}</h2>
 <p class="fancybox-caption-text">${desc.description}</p>
 </div>
 `;
 } else {
 return `
 <div class="fancybox-caption-wrap">
 <h2 class="fancybox-caption-title">${imageName || 'No title'}</h2>
 </div>
 `;
 }
 },
 on: {
 "init": (fancybox) => {
 console.log("Fancybox initialized successfully");
 }
 }
 });
 } catch (error) {
 console.error('Error initializing Fancybox:', error);
 }
});