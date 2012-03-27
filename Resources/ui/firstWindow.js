/**
 * @author P.I.akura
 */
function firstWindow() {
	var _style = require('/style/firstWindow');
	
	var win = Ti.UI.createWindow(_style.window);
	
	var tableView = Ti.UI.createTableView(_style.table);
	
	win.add(tableView);
	win.addEventListener('open',function () {
		cRow(tableView);
	})
	
	return win;
}
function cRow (tv){
	avc = tClient.account_verify_credentials({});
	var rowData = [];

	var row = new (require('/ui/AccountRow'))(avc);
	row.addEventListener('click',function (){
		Ti.API.info('cRow,event')
		tab.open(new (require('/ui/homeWindow'))());
	})
	rowData.push(row);
	
	tv.data = rowData;
} 

exports = firstWindow;