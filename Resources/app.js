var tc = require('/lib/TwitterClient');

var self = new (require('/ui/firstWindow'))();

var tab = Ti.UI.createTab({
    window: self,
});
self.containingTab = tab;

var tg = Ti.UI.createTabGroup();

tg.addTab(tab);
tg.open();