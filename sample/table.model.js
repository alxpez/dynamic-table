(function(){
    'use strict';

    angular.module('alpez.sample').service('TableModel', TableModel);

    function TableModel(){

        this.dynamicTableSetup = {
            columnList: [
                {header:"#", field:"id", visible:false},
                {header:"Name", field:"name", visible:true},
                {header:"Family name", field:"surname", visible:true},
                {header:"Hometown", field:"city", visible:true},
                {header:"Company", field:"company", visible:true, nestedField:"company.name"},
                {header:"Workgroup", field:"workgroup", visible:true, nestedField:"company.workgroup"},
                {header:"Creation Date", field:"creationTS", visible:false, isDateField:true}
            ],
            orderBy: "name",
            reverseSort: false
        };
    }
})();