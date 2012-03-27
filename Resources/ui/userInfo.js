function userInfo (user, followButtonHidden) {
	var _style = require('/style/userInfo');
	
	var view = Titanium.UI.createView(_style.view);
	
	_style.image.image = user.profile_image_url;
	view.add(Ti.UI.createImageView(_style.image));
	
	_style.userName.text = user.name;
	view.add(Ti.UI.createLabel(_style.userName));
	
	_style.screanName.text = '@' + user.screen_name;
	view.add(Ti.UI.createLabel(_style.screanName));
	
	if(!followButtonHidden && user.id != avc.id){
		view.add((function(){
			var b = Ti.UI.createButton(_style.followButton);
			
			if(tClient.friendships_show({parameters:[['source_id',avc.id],['target_id',user.id]]}).relationship.source.following){
				b.title = 'unfollow';
				b.backgroundColor = '#ff0000';
				b.addEventListener('click',function(e){
					tClient.friendships_destroy({
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
					tClient.friendships_create({
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
}

exports = userInfo;