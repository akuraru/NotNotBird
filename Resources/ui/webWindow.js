/**
 * @author P.I.akura
 */
Ak.createWebWindow = function(url){
	var win = Ti.UI.createWindow();
	win.add(Ti.UI.createWebView({
		url:url,
	}));
	return win;
}