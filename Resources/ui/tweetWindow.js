/**
 * @author P.I.akura
 */

function tweetWindow(thisTweet) {
	var _style = require('/style/tweetWindow');
	
	// 新しいWindowを生成し、現在のTabにぶら下げて表示
	var newWindow = Ti.UI.createWindow(_style.window);
	// 上部のUser情報表示
	var userView = new (require('/ui/userInfo'))(thisTweet.user,true);
	userView.addEventListener('click', function(e) {
		tab.open(new (require('/ui/AccountWindow'))(thisTweet.user));
	});
	newWindow.add(userView);
	// 下段のTweet表示
	newWindow.add((function() {
		var webView = Titanium.UI.createWebView(_style.tweetText);
		webView.html = '<html><body style="padding:8px"><div>' + thisTweet.text + '</div>' +
		' <div>' + String.formatDate(new Date(thisTweet.created_at), "long") + " " +
		String.formatTime(new Date(thisTweet.created_at)) + '</div></body></html>' ;
		
		return webView;
	})());
	
	return newWindow;
};

exports = tweetWindow;