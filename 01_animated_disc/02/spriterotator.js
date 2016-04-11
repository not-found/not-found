function SpriteRotator(id, spritesheet, width, height, cols, rows) {
    this.context = document.getElementById(id).getContext("2d");
    this.index = -1;
    this.image;
    this.numImages = cols * rows;

    var self = this;

    this.loadImage = function() {
        this.image = new Image();
        this.image.src = spritesheet;
        this.image.onload = this.handleImageLoad;
    };

    //Calculated cut out rectangle depending on index and cols and draw it onto canvas.
    this.draw = function () {
        var x = (this.index % cols) * width;
        var y = Math.floor(this.index / cols) * height;
        this.context.clearRect(0, 0, width, height);
        this.context.drawImage(this.image, x, y, width, height, 0, 0, width, height);
    };

    //Show next image. Start from index 0 if index >= numImages.
    this.nextImage = function() {
        this.index = (this.index + 1) % this.numImages;
        this.draw();
    };

    //Show prev image. Start from index numImages - 1 if index < 0.
    this.prevImage = function() {
        this.index -= 1;
        if(this.index < 0)
            this.index = this.numImages - 1;
        this.draw();
    };

    //Show first frame on image load.
    this.handleImageLoad = function () {
        self.nextImage();
    }

    this.loadImage();
}