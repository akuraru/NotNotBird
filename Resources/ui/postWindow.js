/**
 * @author P.I.akura
 */

function postWindow(){
	var _style = require('/style/postWindow');
	
	win = Ti.UI.createWindow(_style.window);
	
	var text=Ti.UI.createTextArea(_style.tweetArea);
	win.add(text);
	
	var button = Ti.UI.createButton(_style.tweetButton);
	button.addEventListener('click', function(e) {
		tClient.statuses_update({parameters:[['status',text.value]]});
	});
	win.add(button);
	
	return win; 
}

exports = postWindow;