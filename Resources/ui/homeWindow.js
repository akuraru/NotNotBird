/**
 * @author P.I.akura
 */
function homeWindow(tab) {
	var _style = require('/style/homeWindow');
	
	win = Ti.UI.createWindow(_style.window);
	
	var rowData = [];
	createAkRow = function(image,rowd,nextWin,params){
		var row = Ti.UI.createTableViewRow(_style.row);
		row.addEventListener('click',function(e){
			Ti.API.info(rowd);
			if(params == undefined) params ={};
			tab.open(nextWin(Ak.tClient[rowd](params)));
		});
		
		var image = Ti.UI.createImageView(_style.image);
		row.add(image);
		
		_style.label.text = L(rowd);
		var text = Ti.UI.createLabel(_style.label);
		row.add(text);
		
		var badge = Ti.UI.createLabel(_style.badge);
		row.add(badge);
		
		return row;
	}
	rowData.push(createAkRow(null,"statuses_home_timeline",Ak.createTimelineWindow));
	rowData.push(createAkRow(null,"statuses_mentions",Ak.createTimelineWindow));
	rowData.push(createAkRow(null,"favorites",Ak.createTimelineWindow));
	rowData.push(createAkRow(null,"statuses_user_timeline",Ak.createTimelineWindow,{parameters:[['id',avc.id]]}));
	rowData.push(createAkRow(null,"statuses_public_timeline",Ak.createTimelineWindow));
	rowData.push(createAkRow(null,"direct_messages",Ak.createTimelineWindow));
	rowData.push(createAkRow(null,"account_verify_credentials",Ak.createAccountWindow));
	
	_style.tableView.data = rowData;
	var tableView = Ti.UI.createTableView(_style.tableView);
	win.add(tableView);
	
	win.toolbar = (function(){
		var flexSpace = Titanium.UI.createButton({
		        systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var tweet = Ti.UI.createButton({
			title:'send',
		});
		tweet.addEventListener('click', function(e) {
			tab.open(Ak.createPostWindow());
		});
		return [flexSpace,tweet];
	})();
	
	return win;
}

exports = homeWindow;