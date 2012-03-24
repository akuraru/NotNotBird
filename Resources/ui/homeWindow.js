/**
 * @author P.I.akura
 */
function HomeWindow() {
	win = Ti.UI.createWindow({title:'Home'});
	
	var rowData = [];
	
	rowData.push(Ak.createAkRow(null,"statuses_home_timeline",Ak.createTimelineWindow));
	rowData.push(Ak.createAkRow(null,"statuses_mentions",Ak.createTimelineWindow));
	rowData.push(Ak.createAkRow(null,"favorites",Ak.createTimelineWindow));
	rowData.push(Ak.createAkRow(null,"statuses_user_timeline",Ak.createTimelineWindow,{parameters:[['id',avc.id]]}));
	rowData.push(Ak.createAkRow(null,"statuses_public_timeline",Ak.createTimelineWindow));
	rowData.push(Ak.createAkRow(null,"direct_messages",Ak.createTimelineWindow));
	rowData.push(Ak.createAkRow(null,"account_verify_credentials",Ak.createAccountWindow));
	
	var tableView = Ti.UI.createTableView({
		data:rowData,
    	style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
	});
	win.add(tableView);
	
	win.toolbar = (function(){
		var flexSpace = Titanium.UI.createButton({
		        systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var tweet = Ti.UI.createButton({
			title:'send',
		});
		tweet.addEventListener('click', function(e) {
			Ti.App.tab.open(Ak.createPostWindow());
		});
		return [flexSpace,tweet];
	})();
	
	return win;
}

function AkRow(image,rowd,nextWin,params){
	var row = Ti.UI.createTableViewRow({
		hasChild:true,
	});
	row.addEventListener('click',function(e){
		Ti.API.info(rowd);
		if(params == undefined) params ={};
		Ti.App.tab.open(nextWin(Ak.tClient[rowd](params)));
	});
	
	var image = Ti.UI.createImageView({
		height:'80%',
		left:0,
		image:image,
	});
	row.add(image);
	
	var text = Ti.UI.createLabel({
		left:'10%',
		width:"70%",
		text:L(rowd),
	})
	row.add(text);
	
	var badge = Ti.UI.createLabel({
		right:'10%',
		width:'10%',
        textAlign:'right',
	});
	row.add(badge);
	
	return row;
}

exports = HomeWindow;