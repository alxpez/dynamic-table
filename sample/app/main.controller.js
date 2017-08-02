(function(){
    'use strict';

    angular.module('alpez.sample').controller('MainControler', MainControler);

    MainControler.$inject = ['TableModel'];
    function MainControler(TableModel){

        var ctrl = this;

        ctrl.isFormOpen = false;
        ctrl.newRow = null;
        ctrl.mockTableData = null;
        ctrl.tableSetup = TableModel.dynamicTableSetup;

        ctrl.addRow = addRow;
        ctrl.resetNewRow = resetNewRow;
        ctrl.onHeaderClick = onHeaderClick;
        ctrl.onColumnListChange = onColumnListChange;
        ctrl.onOptionClick = onOptionClick;

        init();


        function init(){
            ctrl.mockTableData = 
                [{
                    id: 1,
                    name: "Tom",
                    surname: "Thompson",
                    city: "San Sebastian",
                    company:  {
                        name: "Flores PaTos",
                        estDate: 1900,
                        workgroup: "Gardener",
                    },
                    creationTS: 20150912230433
                },{
                    id: 2,
                    name: "Ken",
                    surname: "McTerra",
                    city: "Santander",
                    company:  {
                        name: "Umbrella Edibles",
                        estDate: 1978,
                        workgroup: "R & D",
                    },
                    creationTS: 20141103152018
                }];

            resetNewRow();
        }


        function addRow() {
            ctrl.newRow.id = ctrl.mockTableData.length + 1;
            ctrl.newRow.creationTS = new Date();
            ctrl.mockTableData.push(ctrl.newRow);
            resetNewRow();
        }


        function resetNewRow() {
            ctrl.newRow = {
                id: null,
                name: '',
                surname: '',
                city: '',
                company: {
                    name: '',
                    estDate: null,
                    workgroup: ''
                },
                creationTS: null
            };
        }

        function onHeaderClick(orderBy, reverseSort){
            /*
                Implement desired behaviour, e.g. save returned values to the TableModel,
                execute a filter/order if all collection is on the client side, 
                or GET request to backend (paginated collection for example)
            */
            alert("orderBy: " + orderBy + "\nreverseSort: " + reverseSort);
        }

        function onColumnListChange(columnList){
            /*
                The whole current setup of the columnList is returned from the component
                to implement desired behaviour.

                E.g. override the previously set on the TableModel as a way to cache it:
            */
            TableModel.dynamicTableSetup.columnList = columnList;
        }

        function onOptionClick(item, index){
            /*
                Implement desired behaviour, 
                e.g. redirect to detail/edit view for the selected item
            */
            alert("Index: " + index + "\nName: " + item.name);
        }
    }
})();