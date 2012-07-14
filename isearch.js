/*
	iSearch.js 
	Andrew Shitov | mail@andy.sh
	(c) 2005, 2012
	https://github.com/ash/isearch.js
*/

function iSearch(tableID, filterID) {
    this.Table = document.getElementById(tableID);
    this.Filter = document.getElementById(filterID);

	this.keylength = 3;
	
    if (!this.Table || !this.Filter) return null;

    this.Initialize();

    return this;
}

iSearch.prototype.Initialize = function() {
    this.SearchList = new Array();
    this.RowsList = new Array();

    this.WordIndex = new Array();

    this.cacheTableData();

    this.Filter.iSearch = this;
    this.Filter.onkeyup = this.matchFilter;

    this.Filter.focus();
}

iSearch.prototype.cacheTableData = function() {    
    var c = 0;
    for (var rowIndex = 0; rowIndex != this.Table.rows.length; rowIndex++) {
        var currentRow = this.Table.rows[rowIndex];
        var parentTagName = currentRow.parentNode.tagName.toLowerCase();
        if (parentTagName != 'tbody' && parentTagName != 'table') continue;
        
        this.RowsList[c] = currentRow;

        var currentText = '';
        for (var cell = 0; cell != currentRow.cells.length; cell++)
            currentText += currentRow.cells[cell].innerHTML.toLowerCase() + ' ';
        
        this.SearchList[c] = currentText;
        this.indexText(c, currentText);

        c++;
    }
}

iSearch.prototype.matchFilter = function() {
	if (!this.iSearch) return false;

    var search = this.iSearch;
    var filterValue = this.value.toLowerCase();
    filterValue = filterValue.replace(/\s+$/g, "");
    filterValue = filterValue.replace(/^\s+/g, "");
    filterValue = filterValue.replace(/\s+/g, " ");
    
    if (filterValue != '') {

        var words = filterValue.toLowerCase().split (' ');
        var selectedRows = new Array();
        for (var c = 0; c != words.length; c++) {
            if (words[c] == '') continue;

            var key = words[c].substr(0, this.keylength);
            if (this.iSearch.WordIndex[key]) {
                var selected = this.iSearch.WordIndex[key];                
                for (var s = 0; s != selected.length; s++)
                    selectedRows[selected[s]] = true;
            }
        }

        if (filterValue.length <= this.keylength) {
            for (var r = 0; r != search.RowsList.length; r++)
                if (search.RowsList[r])
					search.RowsList[r].style.display = selectedRows[r]
					? ''
					: 'none'
					;
        }
        else {
            for (var r = 0; r != search.RowsList.length; r++)
                if (search.RowsList[r])
					search.RowsList[r].style.display = selectedRows[r] && search.SearchList[r].indexOf (filterValue) != -1
						? ''
						: 'none'
						;
        }
    }
    else {
        for (var r = 0; r != search.RowsList.length; r++)
            search.RowsList[r].style.display = '';
    }
}

iSearch.prototype.indexText = function(rowIndex, text) {
    text = text.replace('"', '');
    text = text.replace ('-', '');
    text = text.replace('(', '');
    text = text.replace(')', '');
    var words = text.split(' ');
	
    for (var c = 0; c != words.length; c++) {
        if (words[c].length < 3) continue;
        
        var key = words[c].toLowerCase();
        this.storeKey(rowIndex, key);
    }
}

iSearch.prototype.storeKey = function (rowIndex, key) {
    for (var c = 1; c <= this.keylength; c++) {
        var subkey = key.substr(0, c);

        if (!this.WordIndex[subkey])
            this.WordIndex[subkey] = new Array();

        this.WordIndex[subkey].push(rowIndex);
    }
}
