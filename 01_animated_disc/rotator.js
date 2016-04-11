function ImageRotator(id, images) {
    this.ref = document.getElementById(id);
    this.index = -1;

    //Preload images, so that the browser can cache them.
    this.preloadImages = function() {
        for (var i = 0; i < images.length; i++) {
            var image = new Image();
            image.src = images[i];
        }
    };

    //Show next image. Start from index 0 if index >= image.length.
    this.nextImage = function() {
        this.index = (this.index + 1) % images.length;
        this.ref.src = images[this.index];
    };

    //Show prev image. Start from index images.length - 1 if index < 0.
    this.prevImage = function() {
        this.index -= 1;
        if(this.index < 0)
            this.index = images.length - 1;

        this.ref.src = images[this.index];
    };

    this.preloadImages();
    //Show first image.
    this.nextImage();
}