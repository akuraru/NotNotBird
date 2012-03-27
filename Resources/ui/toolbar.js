function toolbar(){
	var _style = require('/style/toolbar');
	
	var flexSpace = Titanium.UI.createButton(_style.flexSpace);
	
	var tweet = Ti.UI.createButton(_style.tweetButton);
	tweet.addEventListener('click', openPostWindow);
	
	return [flexSpace,tweet];
}
function openPostWindow(e) {
	tab.open(new (require('/ui/postWindow'))());
}
	
exports = toolbar;