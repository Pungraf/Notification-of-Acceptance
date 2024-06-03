function onEditTrigger() {
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var ordersSheet = ss.getSheetByName("OrderSheet");
	var rangeOrders = ordersSheet.getRange(1,20,ordersSheet.getMaxRows(), 10);

	var cell = ordersSheet.getActiveCell();

	//Skip if edited cell is not affected
	if(cell.getColumn() < 22 || cell.getColumn() > 24)
	{
		return;
	}

	//Send mail about accepted order, with link to proper row with order in sheet after setting "accepepted" value in acceptance column via mail to purchasing department
	if(rangeOrders.getCell(cell.getRow(),10).getValue() == "zatwierdzone")
	{
		var mailText = "Zamówienie  " + rangeOrders.getCell(cell.getRow(),2).getValue().toString() + " zostało zaakceptowane.<br />\n";
		mailText += getLinkToRange_(ordersSheet.getRange(cell.getRow(), 3));

		MailApp.sendEmail({
		to: "purchasingCompany@gmail.com",
		subject: "Zamówienie zaakceptowane",
		htmlBody: mailText
	});
  }
}

//Return link to range in sheet
function getLinkToRange_(range) {
	const sheet = range.getSheet();
	const sheetId = sheet.getSheetId();
	const spreadsheetUrl = sheet.getParent().getUrl();
	const rangeA1 = range.getA1Notation();
	return `${spreadsheetUrl}#gid=${sheetId}&range=${rangeA1}`;
}