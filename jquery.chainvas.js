// jQuery Chainvas - Chainable Canvas
// by James Daniels <james@jamesdaniels.net>
//
// A quick little dirty helper to let you do things like:
//
// $('#tutorial').getContext('2d')
//   .clearRect(0,0,600,600)
//   .save()
//     .beginPath()
//     .moveTo(200,200)
//     .lineTo(0,0)
//     .lineWidth(5)
//     .stroke()
//   .restore();
//
// TODO: Make it less hackish and check it out on IE

jQuery(function($) {
  // getContext for a jQuery object, give us a chainable canvas
  $.fn.getContext = function(dimension) {

    // get the context, dom and jquery
    var ctx = this[0].getContext(dimension);
    var $ctx = $(ctx);

    // give us the right side for our function pass
    var right_side = function(args) {
      switch(args.length) {
        case 1:
          // Use a setter if only one argument is present
          return ' = '+JSON.stringify(args[0]);
        default:
          // Use a function if there are/aren't arguments
          return '('+JSON.stringify(Array.prototype.slice.call(args)).replace(/[$\[|\]^]/g, '')+')';
      }
    }

    // pass the function to the dom object and return the jquery object
    var context_pass = function(method, args) {
      //console.log('ctx.' + method + right_side(args));
      eval('ctx.' + method + right_side(args)); 
      return $ctx;
    };

    $ctx.rotate = function(radians) {
      ctx.rotate(radians); return $ctx;
    }

    // register jquery responders for all the dom functions for a canvas
    $('arc arcTo beginPath bezierCurveTo clearRect clearShadow clip closePath createImageData createLinearGradient createPattern createRadialGradient drawImage drawImageFromRect fill fillRect fillStyle fillText font getImageData globalAlpha globalCompositeOperation isPointInPath lineCap lineJoin lineTo lineWidth measureText miterLimit moveTo putImageData quadraticCurveTo rect restore save scale setAlpha setCompositeOperation setFillColor setLineCap setLineJoin setLineWidth setMiterLimit setShadow setStrokeColor setTransform shadowBlur shadowColor shadowOffsetX shadowOffsetY stroke strokeRect strokeStyle strokeText textAlign textBaseline transform translate'.split(' ')).each(function(i) {
      eval('$ctx.'+this+'= function() { return context_pass(\''+this+'\', arguments); }');
    });

    // return the jquery object
    return $ctx;
  };
});
