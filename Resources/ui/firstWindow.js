/**
 * @author P.I.akura
 */
function firstWindow(tab) {
	var _style = require('/style/firstWindow');
	
	var win = Ti.UI.createWindow(_style.window);
	
	var tableView = Ti.UI.createTableView(_style.table);
	
	win.add(tableView);
	win.addEventListener('open',function () {
		cRow(tableView,tab);
	})
	
	return win;
}
function cRow (tv,tab){
	avc = Ak.tClient.account_verify_credentials({});
	var rowData = [];

	var row = new (require('/ui/AccountRow'))(avc);
	row.addEventListener('click',function (){
		Ti.API.info('cRow,event')
		tab.open(new (require('/ui/homeWindow'))(tab));
	})
	rowData.push(row);
	
	tv.data = rowData;
} 

exports = firstWindow;