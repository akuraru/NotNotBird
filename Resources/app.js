var tClient,tab,avc;
(function (){
	Ti.include(
		'config/config.js',
		'lib/TwitterClient.js'
	)
	tClient = new TwitterClient(config.consumer_key, config.consumer_secret);
	
	//Ti.API.info(win);
	tab = Ti.UI.createTab({});
	tab.window = new (require('/ui/firstWindow'))();
	
	var tg = Ti.UI.createTabGroup();
	tg.addTab(tab);
	if (tClient.checkIfAuthorized(tg)) {
		tg.open();
	}
})();
