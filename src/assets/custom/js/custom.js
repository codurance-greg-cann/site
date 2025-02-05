var fieldName = function (target, field) {
     return '[name=' + target + '-' + field + ']';
};

var submitTrainingContactForm = function() {
    var $inputs = $('#training-contact-form :input');
    var data = {};
    $inputs.each(function() {
        data[this.name] = $(this).val();
    });
    data['message'] = "\nTraining URL: " + window.location.href + "\n";
    data['message'] += "\nNumber of participants: " + data['participants'] + "\n";
    data['message'] += "Start date: " + data['start_date'] + "\n";
    data['message'] += "\n" + data['body'] + "\n";

    var request = new XMLHttpRequest();
    request.open('POST', 'https://codurance.com/api/emailer', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                window.location = data['_next']
            } else {
                alert('Something went wrong ! Please send an email to hello@codurance.com')
            }
        }
    };

    request.send(JSON.stringify(data));

    return false;
};


var announcementOnDevConsole = function(){
	try{
		var headline="box-sizing:border-box;display:block;font-family:Oxygen, sans-serif;font-size:28px;font-style:normal;font-variant:normal;font-weight:normal;height:40px;line-height:40px;margin-bottom:10px;margin-left:0px;margin-right:0px;margin-top:5px;text-align:center;text-shadow:none;";
		var main="display:block;font-family:'Open Sans', Arial, sans-serif;font-size:14px;font-style:normal;font-variant:normal;font-weight:normal;height:34px;line-height:17px;margin-bottom:10px;margin-top:5px;text-align:center;text-shadow:none;";
		var link="cursor:pointer;display:inline-block;font-family:'Roboto Slab', sans-serif;font-size:14px;font-stretch:normal;font-style:normal;font-variant:normal;font-weight:normal;height:25px;letter-spacing:normal;line-height:25.7143px;margin-bottom:5px;margin-left:0px;margin-right:0px;margin-top:10px;outline-style:none;padding-bottom:10px;padding-left:12px;padding-right:12px;padding-top:10px;text-align:center;";
		var isNewEnoughBrowser = "repeat" in String.prototype;
		if(isNewEnoughBrowser){
			window.console.log("\n%cHello Dev!\n\n%cWe're hiring both Apprentices and Craftspeople in London, Barcelona and Manchester. Want to know more? \n%chttps://codurance.com/careers/ \n\n",headline,main,link);
		}
	} catch(_) {}
}

var equalizeHeights = function() {
    var maxHeight = 0;

    $('.equalheight').each(function () {
        $(this).height('auto');
        var thisH = $(this).height();
        if (thisH > maxHeight) { maxHeight = thisH; }
    });

    $('.equalheight').height(maxHeight);
}

$(window).resize(function () {
    equalizeHeights();
});


(function navbarActive(){
	$(function() {
		const url = window.location.href;
		$(".nav a").each(function() {
			if (url.includes(this.href)) {
				$(this).closest("li").addClass("active");
			}
		});
	});
})();

(function navbarProjectsActive(){//TODO delete once we add projects to the navbar
	$(function() {
		const url = window.location.href;
		$(".nav a").each(function() {
			if (url.includes("/projects") && this.href.includes("/client")) {
				$(this).closest("li").addClass("active");
			}
		});
	});
})();
  
var linkifyAnchors = function (level, containingElement) {
    
    if (!containingElement) {
        return
    }
    
    var headers = containingElement.getElementsByTagName("h" + level);
    for (var h = 0; h < headers.length; h++) {
      var header = headers[h];
  
      if (!header.id) {
        var originalContent = header.innerHTML;
        var link = originalContent.split(' ').join('');
        
        var a = document.createElement('a');
        a.title = originalContent;
        a.name = link.toLowerCase();
        a.classList = 'anchor';
        header.appendChild(a);
      }

      header.insertBefore(a, header.firstChild);
    }
};

$(document).ready(function() {
    equalizeHeights();

    //This function is necessary so Safari can redraw the menu 
    $(".dropdown").click(function(){
        return true;
    });

    // add anchor links to headers on posts
    for (var level = 1; level <= 6; level++) {
        linkifyAnchors(level, document.getElementById('js-publication-content'));
    }

    announcementOnDevConsole();

    // Used by the 404 page to load custom search list
    if(window.codurance.onLunrLoaded) {
        window.codurance.onLunrLoaded();
    }
});
