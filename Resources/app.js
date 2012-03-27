var Ak = {};
Ti.include(
	'config/config.js',
	'ui/twitter.js',
	'lib/TwitterClient.js'
)
Ak.tClient = new TwitterClient(config.consumer_key, config.consumer_secret);

//Ti.API.info(win);
var tab = Ti.UI.createTab({});
Ti.App.tab = tab;
tab.window = new (require('/ui/firstWindow'))(tab);

var tg = Ti.UI.createTabGroup();
tg.addTab(tab);

var avc;
if (Ak.tClient.checkIfAuthorized(tg)) {
	tg.open();
}
