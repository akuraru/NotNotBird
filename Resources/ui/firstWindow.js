/**
 * @author P.I.akura
 */
var _style;

var tc = require('/lib/TwitterClient');
var avc = tc.account_verify_credentials({});

function FirstWindow() {
	var self = Ti.UI.createWindow(_style.window);
	
	var rowData = [];
	
	Ti.API.info(avc)
	var row = _accountRow(avc);
	row.addEventListener('click', function(e) {
		self.containingTab.open(new (require('HomeWindow'))(avc));
	});
	rowData.push(row);
	
	var tableView = Ti.UI.createTableView({data:rowData});
	self.add(tableView);
	
	return self;
}


function _accountRow(user) {
	var row = Ti.UI.createTableViewRow(_style.row);
	
	_style.userNameLavel.text = user.screen_name;
	row.add(Ti.UI.createLabel(_style.screenNameLavel));
	
	_style.userNameLavel.text = user.name,
	row.add(Ti.UI.createLabel(_style.userNameLavel));
	
	_style.image = user.profile_image_url;
	row.add(Ti.UI.createImageView(_style.image));

	return row;
};
_style = {};
_style.window = {
	title:L('userinfo'),
	tabBarHidden:true,
}
_style.row = {
	height : 64,
}
_style.screenNameLabel = {
	top: 8,
	left: 64,
	height: 16
}
_style.userNameLabel = {
	top: 32,
	left: 64,
	width: 256,
	height: 'auto',
	font: {
		fontsize:12
	}
}
_style.image = {
	top:8,
	left:8,
	width:48,
	height:48
}

exports = FirstWindow;