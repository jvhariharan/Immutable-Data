import { Grid, Page, Sort, Filter, SortDirection, extend } from '@syncfusion/ej2-grids';
import { data } from './datasource';

Grid.Inject(Page, Sort, Filter);

let immutableStart: any;
let normalStart: any;
let primaryKey = 0;
let immutableInit = true;
let init = true;

let immutableGrid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    pageSettings: { pageSize: 50, pageCount: 5 },
    enableImmutableMode: true,
    allowSorting: true,
    allowFiltering: true,
    filterSettings: { type: 'Menu' },
    width: '98%',
    beforeDataBound: () => {
        immutableStart = new Date().getTime();
    },
    dataBound: () => {
        let val = immutableInit ? '' : new Date().getTime() - immutableStart;
        document.getElementById('immutableDelete').innerHTML = 'Immutable rendering Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
        immutableStart = 0; immutableInit = false;
    },
    columns: [
        { field: 'ProductID', headerText: 'S.No', textAlign: 'Right', width: 80 },
        { field: 'OrderID', headerText: 'Product ID', isPrimaryKey: true, textAlign: 'Right', width: 120 },
        { field: 'ProductName', headerText: 'Name', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 }
    ],
    height: 240
});
immutableGrid.appendTo('#immutable');

document.getElementById('delete').addEventListener('click', function (e) {
    (immutableGrid.dataSource as object[]).splice(0, 5);
    normalGrid.setProperties({ dataSource: immutableGrid.dataSource });
    immutableGrid.setProperties({ dataSource: immutableGrid.dataSource });
});

document.getElementById('addtop').addEventListener('click', function (e) {
    let addedRecords = [
        { 'OrderID': ++primaryKey, 'ProductName': 'Chai', 'ProductID': 'Sasquatch Ale', 'CustomerID': 'QUEDE', 'CustomerName': 'Yoshi Tannamuri' },
        { 'OrderID': ++primaryKey, 'ProductName': 'Georg Pipps', 'ProductID': 'Valkoinen suklaa', 'CustomerID': 'RATTC', 'CustomerName': 'Martín Sommer' },
        { 'OrderID': ++primaryKey, 'ProductName': 'Yoshi Tannamuri', 'ProductID': 'Gula Malacca', 'CustomerID': 'COMMI', 'CustomerName': 'Ann Devon' },
        { 'OrderID': ++primaryKey, 'ProductName': 'Palle Ibsen', 'ProductID': 'Rogede sild', 'CustomerID': 'RATTC', 'CustomerName': 'Paula Wilson' },
        { 'OrderID': ++primaryKey, 'ProductName': 'Francisco Chang', 'ProductID': 'Mascarpone Fabioli', 'CustomerID': 'ROMEY', 'CustomerName': 'Jose Pavarotti' }
    ]
    let aData = addedRecords.concat((immutableGrid as any).dataSource);
    normalGrid.setProperties({ dataSource: aData });
    immutableGrid.setProperties({ dataSource: aData });
});

document.getElementById('reverse').addEventListener('click', function (e) {
    const direction: SortDirection = document.getElementsByClassName('e-icon-ascending').length ? 'Descending' : 'Ascending';
    normalGrid.sortColumn('OrderID', direction);
    immutableGrid.sortColumn('OrderID', direction);
});

document.getElementById('paging').addEventListener('click', function (e) {
    let totalPage = (immutableGrid.dataSource as object[]).length / immutableGrid.pageSettings.pageSize;
    let page = Math.floor(Math.random() * totalPage) + 1;
    normalGrid.setProperties({ pageSettings: { currentPage: page } });
    immutableGrid.setProperties({ pageSettings: { currentPage: page } });
});

document.getElementById('filtering').addEventListener('click', function (e) {
    normalGrid.filterByColumn('CustomerID', 'contains', 'f');
    immutableGrid.filterByColumn('CustomerID', 'contains', 'f');
});

document.getElementById('filter-clear').addEventListener('click', function (e) {
    normalGrid.clearFiltering();
    immutableGrid.clearFiltering();
});

document.getElementById('column-update').addEventListener('click', function (e) {
    let data: object[] = [];
    for (let i: number = 0; i < (normalGrid.dataSource as object[]).length; i++) {
        data.push(extend({}, normalGrid.dataSource[i]));
        data[i]['ProductName'] = 'Updated';
    }
    normalGrid.setProperties({ dataSource: data });
    immutableGrid.setProperties({ dataSource: data });
});

let normalGrid: Grid = new Grid({
    dataSource: data,
    allowPaging: true,
    pageSettings: { pageSize: 50, pageCount: 5 },
    allowSorting: true,
    allowFiltering: true,
    filterSettings: { type: 'Menu' },
    width: '98%',
    beforeDataBound: () => {
        normalStart = new Date().getTime();
    },
    dataBound: () => {
        let val = init ? '' : new Date().getTime() - normalStart;
        document.getElementById('normalDelete').innerHTML = 'Normal rendering Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
        normalStart = 0; init = false;
    },
    columns: [
        { field: 'ProductID', headerText: 'S.No', textAlign: 'Right', width: 80 },
        { field: 'OrderID', headerText: 'Product ID', isPrimaryKey: true, textAlign: 'Right', width: 120 },
        { field: 'ProductName', headerText: 'Name', width: 120 },
        { field: 'CustomerID', headerText: 'Customer ID', width: 120 }
    ],
    height: 240
});
normalGrid.appendTo('#normal');