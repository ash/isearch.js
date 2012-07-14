isearch.js
=======

JS-based incremental search through table fields.

&lt;script src="jsearch.js">&lt;/script>

&lt;input id="FilterInput" placeholder="Search the table" />
&lt;table id="DataTable">
    ...
    &lt;tbody>
       ...
    &lt;/tbody>
&lt;/table>

&lt;script>
    new iSearch('DataTable', 'FilterInput');
&lt;/script>
