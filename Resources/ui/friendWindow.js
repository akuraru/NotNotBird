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
	for (var i in users) rowData.push(Ak.createAccountRow(users[i],Ak.createAccountWindow));
	
	Ti.API.info(users);
	
	var tableView = Ti.UI.createTableView({
		data:rowData,
	});
	win.add(tableView);
	
	return win;
}

Ak.createAccountRow = function(user,nextWin) {
	var row = Titanium.UI.createTableViewRow();
	row.height = 64;
	row.add(Titanium.UI.createLabel({
		text: user.screen_name,
		top: 8,
		left: 64,
		height: 16
	}));
	row.add(Titanium.UI.createLabel({
		text: user.name,
		top: 32,
		left: 64,
		width: 256,
		height: 'auto',
		font: {
			fontsize:12
		}
	}));
	row.add(Titanium.UI.createImageView({
		image: user.profile_image_url,
		top:8,
		left:8,
		width:48,
		height:48
	}));
	row.addEventListener('click', function(e) {
		Ti.App.tab.open(nextWin(user));
	});
	return row;
};