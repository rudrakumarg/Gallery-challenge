/**
 * @author Rudra Kumar
 */

window.GALLERY = window.GALLERY || {};

( function(GALLERY) {
		function init() {
			var _self = this, betArr = [], speedArr = [];

			_self.preload = function() {
				_self.run();
			};
			_self.run = function() {
				GALLERY.gcApp = new GALLERY.GCAPP();
			};
		}

		function gcApp() {
			var _this = this;
		
            _this.getImagesAPI = function() {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', './data/photos.json');
                xhr.send(null);
                xhr.onreadystatechange = function () {
                    var DONE = 4; // readyState 4 means the request is done.
                    var OK = 200; // status 200 is a successful return.
                    if (xhr.readyState === DONE) {
                        if (xhr.status === OK) {
                            _this.renderImages(JSON.parse(xhr.responseText));
                        } else {
                            console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
                };
            };
            
            _this.renderImages = function(response) {
                var container = document.getElementById('imageContainer');
                _this.data = response;
                for (var i = 0, j = response.length; i < j; i++) {
                    var img = document.createElement('img');
                    img.src = response[i].urls.thumb; // img[i] refers to the current URL.
                    img.index = i;
                    img.title = response[i].description != null ? response[i].description : "";
                    img.id = response[i].id;
                    img.onclick = openModal;
                    img.className = "loading";
                    container.appendChild(img);
                }
            };

            function openModal() {
                var modal = document.getElementById("myModal");
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                document.getElementById("modalImg").src=_this.data[this.index].urls.full;
                
                // When the user clicks on the button, open the modal 
                modal.style.display = "block";
                document.body.style.overflow = "hidden";

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                    document.body.style.overflow = "auto";
                }
            };
            
            _this.getImagesAPI();
		}


		GALLERY.INIT = init;
		GALLERY.GCAPP = gcApp;

	}(window.GALLERY));