/**
 * @author P.I.akura
 */

// 単独Tweet表示Windowを生成する。
Ak.createAccountWindow = function(user) {
	// 新しいWindowを生成し、現在のTabにぶら下げて表示
	var newWindow = Ti.UI.createWindow({
		title: 'Info',
		backgroundColor: '#fff'
	});
	// 上部のUser情報表示
	newWindow.add((function() {
		var view = Titanium.UI.createView({
			top:0,
			height:60,
			backgroundColor: '#ccc'
		});
		view.add(Titanium.UI.createImageView({
			image: user.profile_image_url,
			top:8,
			left:8,
			width:44,
			height:44
		}));
		view.add(Titanium.UI.createLabel({
			top:8,
			height:20,
			left:60,
			right:88,
			text: user.name
		}));
		view.add(Titanium.UI.createLabel({
			top:30,
			left:60,
			right:88,
			height:'auto',
			text: '@' + user.screen_name,
			font: {
				fontSize:12
			}
		}));
		if(user.id != avc.id){
			view.add((function(){
				var b = Ti.UI.createButton({
					title:'follow',
					backgroundColor:'#00ff00',
					right:8,
					width:80,
					height:20,
	    			style:'none'
				});
				if(Ak.tClient.friendships_show({parameters:[['source_id',avc.id],['target_id',user.id]]}).relationship.source.following){
					b.title = 'unfollow';
					b.backgroundColor = '#ff0000';
					b.addEventListener('click',function(e){
						Ak.tClient.friendships_destroy({
							parameters:[['target_id',user.id]],
							onSuccess:function(){Ti.UI.createAlertDialog({title:'Success'}).show()},
							onError:function(){Ti.UI.createAlertDialog({title:'Error'}).show();},
						});
						b.title = 'follow';
						b.backgroundColor = '#00ff00';
					});
				}else{
					b.title = 'follow';
					b.backgroundColor = '#00ff00';
					b.addEventListener('click',function(e){
						iAk.tClient.friendships_create({
							parameters:[['target_id',user.id]],
							onSuccess:function(){Ti.UI.createAlertDialog({title:'Success'}).show();},
							onError:function(){Ti.UI.createAlertDialog({title:'Error'}).show();},
						});
						b.title = 'unfollow';
						b.backgroundColor = '#ff0000';
					});
				}
				return b;
			})());
		}
		return view;
	})());
	
	function createRow(e,f){
		var row = Ti.UI.createTableViewRow({height:'auto'});
		row.add(Ti.UI.createLabel({
			font: { fontsize:12 },
			text:user[e],
			right:8,
			top:16,bottom:16,
			width:0.67*newWindow.width,
			height:'auto',
			textAlign:'left',
		}));
		row.add(Ti.UI.createLabel({
			left:0,
			width:0.20*newWindow.width,
			font:{fontSize:8},
			text:L(e),
			textAlign:'right',
		}));
		
		if(f != null) row.addEventListener('click',f);
		return row;
	}
	
	newWindow.add((function() {
		var sArray = [];
		var tvSection=Ti.UI.createTableViewSection();
		if(user['location'] != '') tvSection.add(createRow('location'));
		if(user['url'] != '<null>') tvSection.add(createRow('url',function(){Ti.App.tab.open(Ak.createWebWindow(user['url']))}));
		if(user['description'] != '') tvSection.add(createRow('description'));
		tvSection.add(createRow('followers_count',function(){Ti.App.tab.open(Ak.createFriendWindow(Ak.tClient.followers_ids({parameters:[['screen_name',user['screen_name']]],}).ids))}));
		tvSection.add(createRow('friends_count',function(){Ti.App.tab.open(Ak.createFriendWindow(Ak.tClient.friends_ids({parameters:[['screen_name',user['screen_name']]],}).ids))}));
		tvSection.add(createRow('favourites_count',function(){Ti.App.tab.open(Ak.createTimelineWindow(Ak.tClient.favorites({parameters:[['id',user['id']]],})))}));
		tvSection.add(createRow('statuses_count',function(){Ti.App.tab.open(Ak.createTimelineWindow(Ak.tClient.statuses_user_timeline({parameters:[['screen_name',user['screen_name']]],})))}));
		sArray.push(tvSection);
		
		var tableView = Ti.UI.createTableView({
			top:60,
			data:sArray,
    		style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
		});
		return tableView;
	})());
	
	return newWindow;
}