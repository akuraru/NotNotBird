/**
 * @author P.I.akura
 */
var _tab;

function TimelineWindow (e) {
	var _style = require('/style/timelineWindow');
	
	var win = Ti.UI.createWindow(_style.window);
	
	var rowData = [];
	
	Ti.API.info(e[0]);
	for (var i in e) {
		tweet = e[i];
		var row = Ti.UI.createTableViewRow(_style.row);
		
		_style.tweet.text = tweet.text;
		row.add(Titanium.UI.createLabel(_style.tweet));
		
		_style.screanName.text = tweet.user.screen_name;
		row.add(Titanium.UI.createLabel(_style.screanName));
		
		_style.image.image = tweet.user.profile_image_url;
		row.add(Titanium.UI.createImageView(_style.image));
		
		row.tweet = tweet;
		row.addEventListener('click', openTweetWindow);
		rowData.push(row);
	}
	
	_style.tableView.data = rowData;
	var tableView = Ti.UI.createTableView(_style.tableView);
	win.add(tableView);
	
	win.toolbar = new (require('/ui/toolbar'))();
	
	return win;
}
function openTweetWindow(e) {
	tab.open(new (require('/ui/TweetWindow'))(e.rowData.tweet));
}


exports = TimelineWindow;