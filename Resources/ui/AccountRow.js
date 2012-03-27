function AccountRow(user) {
	var _style = require('/style/AccountRow');
	
	var row = Titanium.UI.createTableViewRow(_style.row);
	
	_style.screanName.text = user.screen_name;
	row.add(Titanium.UI.createLabel(_style.screanName));
	
	_style.userName.text = user.name;
	row.add(Titanium.UI.createLabel(_style.userName));
	
	_style.image.image = user.profile_image_url;
	row.add(Titanium.UI.createImageView(_style.image));
	
	return row;
};

exports = AccountRow;