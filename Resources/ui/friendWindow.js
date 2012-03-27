/**
 * @author P.I.akura
 */

Ak.createFriendWindow = function (e) {
	var win = Ti.UI.createWindow({title:'friend'});
	
	var rowData = [];
	
	Ti.API.info(e);
	e.length = 50;
	var user_ids = '';
	for (var i in e) user_ids = user_ids + ',' + e[i];
	user_ids = user_ids.substring(1);
	Ti.API.info(user_ids);
	var users = Ak.tClient.users_lookup({parameters:[['user_id',user_ids]]});
	for (var i in users) rowData.push(new (require('/ui/AccountRow'))(users[i],Ak.createAccountWindow));
	
	Ti.API.info(users);
	
	var tableView = Ti.UI.createTableView({
		data:rowData,
	});
	win.add(tableView);
	
	return win;
}