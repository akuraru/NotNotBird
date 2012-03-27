/**
 * @author P.I.akura
 */

function webWindow (url){
	var win = Ti.UI.createWindow();
	win.add(Ti.UI.createWebView({
		url:url,
	}));
	return win;
}

exports = webWindow;