/**
 * @author P.I.akura
 */
function homeWindow() {
	var _style = require('/style/homeWindow');
	
	win = Ti.UI.createWindow(_style.window);
	
	var rowData = [];
	createAkRow = function(image,rowd,nextWin,params){
		var row = Ti.UI.createTableViewRow(_style.row);
		row.addEventListener('click',function(e){
			if(params == undefined) params ={};
			tab.open(new (require(nextWin))(tClient[rowd](params),tab));
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
	rowData.push(createAkRow(null,"statuses_home_timeline",'/ui/timelineWindow'));
	rowData.push(createAkRow(null,"statuses_mentions",'/ui/timelineWindow'));
	rowData.push(createAkRow(null,"favorites",'/ui/timelineWindow'));
	rowData.push(createAkRow(null,"statuses_user_timeline",'/ui/timelineWindow',{parameters:[['id',avc.id]]}));
	rowData.push(createAkRow(null,"statuses_public_timeline",'/ui/timelineWindow'));
	rowData.push(createAkRow(null,"direct_messages",'/ui/timelineWindow'));
	rowData.push(createAkRow(null,"account_verify_credentials",'/ui/AccountWindow'));
	
	_style.tableView.data = rowData;
	var tableView = Ti.UI.createTableView(_style.tableView);
	win.add(tableView);
	
	win.toolbar = new (require('/ui/toolbar'))();
	
	return win;
}

exports = homeWindow;