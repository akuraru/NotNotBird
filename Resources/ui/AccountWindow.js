/**
 * @author P.I.akura
 */
function　AccountWindow(user) {
	var _style = require('/style/AccountWindow');
	
	var self = Ti.UI.createWindow(_style.window);
	// 上部のUser情報表示
	self.add(new (require('/ui/userInfo'))(user));
	
	function createRow(e,f){
		var row = Ti.UI.createTableViewRow(_style.row);
		
		_style.keyLabel.text = user[e];
		_style.keyLabel.width = 0.67*self.width;
		row.add(Ti.UI.createLabel(_style.keyLabel));
		
		_style.valueLabel.text = L(e);
		_style.valueLabel.width = 0.20*self.width;
		row.add(Ti.UI.createLabel(_style.valueLabel));
		
		if(f != null) row.addEventListener('click',f);
		return row;
	}
	
	self.add((function() {
		var sArray = [];
		var tvSection=Ti.UI.createTableViewSection();
		if(user['location'] != '') tvSection.add(createRow('location'));
		if(user['url'] != null) tvSection.add(createRow('url',function(){tab.open(new (require('/ui/webWindow'))(user['url']))}));
		if(user['description'] != '') tvSection.add(createRow('description'));
		tvSection.add(createRow('followers_count',function(){tab.open(new (require('/ui/friendWindow'))(tClient.followers_ids({parameters:[['screen_name',user['screen_name']]],}).ids))}));
		tvSection.add(createRow('friends_count',function(){tab.open(new (require('/ui/friendWindow'))(tClient.friends_ids({parameters:[['screen_name',user['screen_name']]],}).ids))}));
		tvSection.add(createRow('favourites_count',function(){tab.open(new (require('/ui/timelineWindow'))(tClient.favorites({parameters:[['id',user['id']]],})))}));
		tvSection.add(createRow('statuses_count',function(){tab.open(new (require('/ui/timelineWindow'))(tClient.statuses_user_timeline({parameters:[['screen_name',user['screen_name']]],})))}));
		sArray.push(tvSection);
		
		var tableView = Ti.UI.createTableView({
			top:60,
			data:sArray,
    		style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
		});
		return tableView;
	})());
	
	return self;
}

exports = AccountWindow;