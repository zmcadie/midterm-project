//
// flash-message
//
//  - Originally created by Joel Moss at Codaset (joel@codaset.com) as jquery-flash
//  - https://github.com/joelmoss/jquery-flash
//
//  - Modified by Widen Enterprises as flash-message
//  - https://github.com/Widen/flash-message
//
// Simply call the following to show a flash message with the text "This is my message":
//
//    $.flash('This is my message');
//
// Or you can call it on an element, where the flash message will be populated from the
// contents of the element:
//
//    $('#my-element').flash();
//
//
// To install, just include this javascript file and the accompanying CSS file into your
// HTML page. And that's it!
//
//

(function($){
  $(function() {
    var defaultOptions = {
      timeout: 2000
    };
    var flashTimeout;
    var flashDiv = '<div id="flash" style="display:none;"> \
	                      <div class="flash_close"></div> \
	                      <div class="flash_inner"></div> \
	                    </div>';
    $(flashDiv).appendTo('body');

    $.extend({
      flash: function(content, options) {
        options = options || defaultOptions;
        var flash = $('#flash');

        var fadeAway = function() {
          flash.animate({
            top: '-50px',
            opacity: 0
          }, function() {
            flash.hide();
          });
        };

        flash.find('.flash_inner').html(content);

        if(flash.is(':visible' && flashTimeout)) {
          window.clearTimeout(flashTimeout);
        }

        flash
            .show()
            .css({opacity: 0})
            .top()
            .animate({
              top: '0px',
              opacity: 0.9
            }, function() {
              if(flashTimeout) {
                window.clearTimeout(flashTimeout);
              }
              if(options.timeout) {
                flashTimeout = window.setTimeout(fadeAway, options.timeout);
              }
            });

        flash.find('.flash_close').click(function () {
          $('#flash').hide();
          if(flashTimeout) {
            window.clearTimeout(flashTimeout);
          }
        });

      }
    });

    $.fn.extend({
      top : function() {
        var offLeft = Math.floor((($(window).width()-this.width())/2)-20);
        this.css({
          top: '-50px',
          left: ((offLeft != null && offLeft > 0) ? offLeft :'0') + 'px'
        });
        return this;
      },

      flash: function(options) {
        $.flash(this.html(), options);
        return this;
      }
    });

  });

})(jQuery);
