function formatMailBody(obj, order) {
    var result = "";
    if (!order) {
        order = Object.keys(obj);
    }

    for (var idx in order) {
        var key = order[idx];
        result +=
            "<h4 style='text-transform: capitalize; margin-bottom: 0'>" +
            key +
            "</h4><div>" +
            sanitizeInput(obj[key]) +
            "</div>";
    }
    return result;
}

function sanitizeInput(rawInput) {
    var placeholder = HtmlService.createHtmlOutput(" ");
    placeholder.appendUntrusted(rawInput);

    return placeholder.getContent();
}

function doPost(e) {
    try {
        Logger.log(e);
        record_data(e);

        var mailData = e.parameters;

        var orderParameter = e.parameters.formDataNameOrder;
        var dataOrder;
        if (orderParameter) {
            dataOrder = JSON.parse(orderParameter);
        }

        var sendEmailTo = typeof TO_ADDRESS !== "undefined" ? TO_ADDRESS : mailData.formGoogleSendEmail;

        if (sendEmailTo) {
            MailApp.sendEmail({
                to: String(sendEmailTo),
                subject: "Contact form submitted",
                htmlBody: formatMailBody(mailData, dataOrder),
            });
        }

        return ContentService.createTextOutput(
            JSON.stringify({ result: "success", data: JSON.stringify(e.parameters) })
        ).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        Logger.log(error);
        return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error })).setMimeType(
            ContentService.MimeType.JSON
        );
    }
}

function record_data(e) {
    var lock = LockService.getDocumentLock();
    lock.waitLock(30000);

    try {
        Logger.log(JSON.stringify(e));

        var doc = SpreadsheetApp.getActiveSpreadsheet();
        var sheetName = e.parameters.formGoogleSheetName || "responses";
        var sheet = doc.getSheetByName(sheetName);

        var oldHeader = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var newHeader = oldHeader.slice();
        var fieldsFromForm = getDataColumns(e.parameters);
        var row = [new Date()];

        for (var i = 1; i < oldHeader.length; i++) {
            var field = oldHeader[i];
            var output = getFieldFromData(field, e.parameters);
            row.push(output);

            var formIndex = fieldsFromForm.indexOf(field);
            if (formIndex > -1) {
                fieldsFromForm.splice(formIndex, 1);
            }
        }

        for (var i = 0; i < fieldsFromForm.length; i++) {
            var field = fieldsFromForm[i];
            var output = getFieldFromData(field, e.parameters);
            row.push(output);
            newHeader.push(field);
        }

        var nextRow = sheet.getLastRow() + 1;
        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

        if (newHeader.length > oldHeader.length) {
            sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
        }
    } catch (error) {
        Logger.log(error);
    } finally {
        lock.releaseLock();
        return;
    }
}

function getDataColumns(data) {
    return Object.keys(data).filter(function (column) {
        return !(
            column === "formDataNameOrder" ||
            column === "formGoogleSheetName" ||
            column === "formGoogleSendEmail" ||
            column === "honeypot"
        );
    });
}

function getFieldFromData(field, data) {
    var values = data[field] || "";
    var output = values.join ? values.join(", ") : values;
    return output;
}
