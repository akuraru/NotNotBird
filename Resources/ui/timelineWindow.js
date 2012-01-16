/**
 * @author P.I.akura
 */

Ak.createTimelineWindow = function (e) {
	var win = Ti.UI.createWindow({title:'Timeline'});
	
	var rowData = [];
	
	Ti.API.info(e[0]);
	for (var i in e) rowData.push(Ak.createTableViewRow(e[i]));
	
	var tableView = Ti.UI.createTableView({
		data:rowData,
	});
	win.add(tableView);
	
	win.toolbar = (function(){
		var flexSpace = Titanium.UI.createButton({
		        systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var tweet = Ti.UI.createButton({
			title:'send',
		});
		tweet.addEventListener('click', function(e) {
			Ti.App.tab.open(Ak.createPostWindow());
		});
		return [flexSpace,tweet];
	})();
	
	return win;
}

Ak.createTableViewRow = function(tweet) {
	var row = Titanium.UI.createTableViewRow({height:'auto'});
	row.add(Titanium.UI.createLabel({
		text: tweet.text,
		top: 32,
		left: 64,
		width: 256,
		height: 'auto',
		bottom: 8,
		font: {
			fontsize:12
		}
	}));
	row.add(Titanium.UI.createLabel({
		text: tweet.user.screen_name,
		top: 8,
		left: 64,
		height: 16
	}));
	row.add(Titanium.UI.createImageView({
		image: tweet.user.profile_image_url,
		top:8,
		left:8,
		width:48,
		height:48
	}));
	row.tweet = tweet;
	row.addEventListener('click', function(e) {
		// 新しいWindowを生成し、現在のTabにぶら下げて表示
		var thisTweet = e.rowData.tweet;
		Ti.App.tab.open(
		Ak.createTweetWindow(thisTweet)
		);
	});
	return row;
};