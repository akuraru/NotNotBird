/**
 * @author P.I.akura
 */

function friendWindow(e) {
	var _style = require('/style/friendWindow');
	
	var win = Ti.UI.createWindow(_style.window);
	
	var rowData = [];
	
	Ti.API.info(e);
	e.length = 50;
	var user_ids = '';
	for (var i in e) user_ids = user_ids + ',' + e[i];
	user_ids = user_ids.substring(1);
	Ti.API.info(user_ids);
	var users = tClient.users_lookup({parameters:[['user_id',user_ids]]});
	for (var i in users) {
		var row = new (require('/ui/AccountRow'))(users[i]);
		row.addEventListener('click',function(){
			tab.open(new (require('/ui/AccountWindow'))(users[i]))
		})
		rowData.push(row);
	}
	
	Ti.API.info(users);
	
	_style.tableView.data = rowData;
	var tableView = Ti.UI.createTableView(_style.tableView);
	win.add(tableView);
	
	return win;
}

exports = friendWindow;