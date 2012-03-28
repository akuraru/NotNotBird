var tClient,tab,avc;
(function (){
	Ti.include(
		'config/config.js',
		'lib/TwitterClient.js'
	)
	//Ti.API.info(win);
	tab = Ti.UI.createTab({});
	tab.window = new (require('/ui/firstWindow'))();
	
	var tg = Ti.UI.createTabGroup();
	tg.addTab(tab);
	tg.open();
	
	tClient = new TwitterClient({consumerKey:config.consumer_key,consumerSecret: config.consumer_secret});
	tClient.init();
	
	tClient.account_verify_credentials({
		onSuccess : function (e) {
			Ti.API.info(e);
			avc = e;
			tab.window.cRow();
		},
		onError : function (e){
			Ti.API.error(e);
		}
	});
})();
