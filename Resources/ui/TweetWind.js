/**
 * @author P.I.akura
 */

// 単独Tweet表示Windowを生成する。
Ak.createTweetWindow = function(thisTweet) {
	// 新しいWindowを生成し、現在のTabにぶら下げて表示
	var newWindow = Ti.UI.createWindow({
		backgroundColor: '#fff'
	});
	// 上部のUser情報表示
	newWindow.add((function() {
		var view = Titanium.UI.createView({
			top:0,
			height:60,
			backgroundColor: '#ccc'
		});
		view.addEventListener('click',function(e){ 
			Ti.App.tab.open(Ak.createAccountWindow(thisTweet.user));
		});
		view.add(Titanium.UI.createImageView({
			image: thisTweet.user.profile_image_url,
			top:8,
			left:8,
			width:44,
			height:44
		}));
		view.add(Titanium.UI.createLabel({
			top:8,
			height:22,
			left:60,
			right:8,
			height:'auto',
			text: thisTweet.user.name
		}));
		view.add(Titanium.UI.createLabel({
			top:30,
			left:60,
			height:'auto',
			text: '@' + thisTweet.user.screen_name,
			font: {
				fontSize:12
			}
		}));
		view.add(Ti.UI.createButton({
			right:0,
			style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
		}));
		return view;
	})());
	// 下段のTweet表示
	newWindow.add((function() {
		var webView = Titanium.UI.createWebView({
			top:60
		});
		webView.html = '<html><body style="padding:8px"><div>' + thisTweet.text + '</div>' +
		' <div>' + String.formatDate(new Date(thisTweet.created_at), "long") + " " +
		String.formatTime(new Date(thisTweet.created_at)) + '</div></body></html>' ;
		return webView;
	})());
	
	return newWindow;
};