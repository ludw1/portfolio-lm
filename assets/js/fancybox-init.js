document.addEventListener("DOMContentLoaded", function() {
  // Get site baseurl from meta tag to construct proper paths
  const baseUrl = document.querySelector('meta[name="baseurl"]')?.content || '';
  
  // Load image descriptions from JSON file
  fetch(baseUrl + '/images/image_descriptions.json')
    .then(response => response.json())
    .then(imageDescriptions => {
      // Initialize Fancybox with custom options
      Fancybox.bind("[data-fancybox='gallery']", {
        Toolbar: {
          display: [
            { id: "prev", position: "center" },
            { id: "counter", position: "center" },
            { id: "next", position: "center" },
            "zoom",
            "slideshow",
            "fullscreen",
            "download",
            "close",
          ],
        },
        Thumbs: {
          autoStart: true,
        },
        Carousel: {
          transition: "slide",
        },
        Images: {
          protected: true,
        },
        caption: function (fancybox, carousel, slide) {
          // Get the image filename from the src attribute
          const imagePath = slide.src;
          const imageName = imagePath.split('/').pop();
          
          // Create a container for the caption with title, description, and EXIF data
          let caption = document.createElement('div');
          caption.className = 'fancybox-caption-container';
          caption.style.display = 'flex';
          caption.style.flexDirection = 'column';
          caption.style.padding = '15px';
          
          // Add title and description if available
          if (imageDescriptions && imageDescriptions[imageName]) {
            const imageInfo = imageDescriptions[imageName];
            
            if (imageInfo.title) {
              let title = document.createElement('h3');
              title.textContent = imageInfo.title;
              title.style.margin = '0 0 8px 0';
              title.style.fontSize = '18px';
              title.style.fontWeight = 'bold';
              caption.appendChild(title);
            }
            
            if (imageInfo.description) {
              let description = document.createElement('p');
              description.textContent = imageInfo.description;
              description.style.margin = '0 0 15px 0';
              description.style.fontSize = '14px';
              caption.appendChild(description);
            }
          }
          
          // Create EXIF data container
          let exifContainer = document.createElement('div');
          exifContainer.className = 'exif-data-container';
          exifContainer.style.fontSize = '12px';
          exifContainer.style.marginTop = '10px';
          exifContainer.style.borderTop = '1px solid rgba(255,255,255,0.3)';
          exifContainer.style.paddingTop = '10px';
          caption.appendChild(exifContainer);
          
          // Load EXIF data
          const img = new Image();
          img.onload = function() {
            EXIF.getData(this, function() {
              // Get the EXIF configuration from data attribute
              const exifConfigString = document.body.getAttribute('data-exif-config');
              const exifConfig = exifConfigString ? JSON.parse(exifConfigString) : [];
              
              exifConfig.forEach(config => {
                const exifValue = EXIF.getTag(this, config.tag);
                if (exifValue) {
                  const exifItem = document.createElement('div');
                  exifItem.style.marginBottom = '5px';
                  exifItem.innerHTML = `<i class="fa fa-${config.icon}"></i> <strong>${config.tag}:</strong> ${exifValue}`;
                  exifContainer.appendChild(exifItem);
                }
              });
            });
          };
          img.src = slide.src;
          
          return caption;
        }
      });
    })
    .catch(error => console.error('Error loading image descriptions:', error));
}); 