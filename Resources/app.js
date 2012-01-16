var Ak = {};
Ti.include(
	'config/config.js',
	'ui/twitter.js',
	'lib/TwitterClient.js'
)
Ak.tClient = new TwitterClient(config.consumer_key, config.consumer_secret);
Ak.tClient.checkIfAuthorized();
var avc = Ak.tClient.account_verify_credentials({});

Ti.App.tab = Ti.UI.createTab({
    window: Ak.createFirstWindow(),// 初期ウィンドウ
});

var tg = Ti.UI.createTabGroup();
tg.addTab(Ti.App.tab);
tg.open();