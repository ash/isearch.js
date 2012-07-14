isearch.js
=======

JS-based incremental search through table fields.

<script src="jsearch.js"></script>

<input id="FilterInput" placeholder="Search the table" />
<table id="DataTable">
    ...
    <tbody>
       ...
    </tbody>
</table>

<script>
    new iSearch('DataTable', 'FilterInput');
</script>
