/**
 * Dynamic table component for AngularJS applications.
 * Allows to add/remove columns on runtime without the need of reloading views/collections.
 *
 * @version v1.0.0
 * @since 2016-06-03
 * @link https://github.com/al-pez/angular-dynamic-table
 * @author Alex Perez <alexperez.dev@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */


(function(){
    'user strict';

    /** 
    * @param columnList: Array of objects with the following field structure.
    *       - Mandatory fields -> {header: String, field: String, visible: Boolean}
    *       - Optional/extra functionality fields -> {nestedField: String, isDateField:Boolean, sortableField:Boolean}
    *
    *    e.g. [
    *           {header:"HEADER_1", field:"classField1", visible:false},
    *           {header:"HEADER_2", field:"classField2", visible:true, nestedField:"classField2.nestedField2"},
    *           {header:"HEADER_3", field:"classField3", visible:true, nestedField:"classField3.nestedField3", isDateField:true},
    *           {header:"HEADER_3", field:"classField3", visible:true, nestedField:"classField3.nestedField3", isDateField:true, sortableField:false}
    *           {...}
    *         ]
    */
    angular.module('alpez.dynamictable',[]).component('dynamicTable',{
        bindings:{
            columnList: '<',
            contentList: '<',
            orderBy: '@',
            reverseSort: '<',
            limitWidth: '<',
            optionGlyphicon: '@',
            optionTitle: '@',
            onHeaderClick: '&',
            onColumnListChange: '&',
            onOptionClick: '&'
        },
        transclude: true,
        controller: DynamicTableCtrl,
        template:
        '<table id="dynTab" class="table table-striped" style="font-size:smaller">'+
            '<thead>'+
                '<tr>'+
                    '<th class="list-header" style="text-align:center" ng-repeat="column in $ctrl.columnList | filter:{visible:true}">'+
                        '<a ng-if="column.sortableField!==false" href="" ng-click="$ctrl.headerClicked(column)">'+
                            '{{column.header}}  '+
                            '<span ng-show="$ctrl.orderBy === column.field">'+
                                '<span ng-hide="$ctrl.reverseSort" class="glyphicon glyphicon-chevron-up"></span>'+
                                '<span ng-show="$ctrl.reverseSort" class="glyphicon glyphicon-chevron-down"></span>'+
                            '</span>'+
                        '</a>'+
                        '<span ng-if="column.sortableField===false" translate="">{{column.header}}</span>'+
                    '</th>'+
                    '<th uib-dropdown auto-close="outsideClick" style="text-align:center">'+
                        '<button type="button" class="btn btn-default btn-xs" uib-dropdown-toggle>'+
                            '<span class="glyphicon glyphicon-eye-open" style="color:inherit"></span>'+
                        '</button>'+
                        '<ul class="dropdown-menu" uib-dropdown-menu aria-labelledby="simple-dropdown">'+
                            '<li ng-repeat="column in $ctrl.columnList" style="color:#000;font-weight: normal;">'+
                                '<label ng-click="$ctrl.columnChanged()" style="width:100%;font-size:small;font-weight:normal;margin:0;padding:2px 10px;text-align:left">'+
                                    '<input type="checkbox" ng-model="column.visible" ng-disabled="$ctrl.isDisabled(column)"> '+
                                    '  {{column.header}}'+
                                '</label>'+
                            '</li>'+
                        '</ul>'+
                    '</th>'+
                '</tr>'+
            '</thead>'+
            '<tbody>'+
                '<tr ng-repeat="contentItem in $ctrl.contentList">'+
                    '<td style="text-align:center" ng-repeat="column in $ctrl.columnList | filter:{visible:true}">'+
                        '{{$ctrl.evalElement(contentItem, column)}}'+
                    '</td>'+
                    '<td class="options" style="font-size:medium;text-align:center">'+
                        '<a href="" title="{{$ctrl.optionTitle}}" ng-click="$ctrl.optionClicked(contentItem, $index)">'+
                            '<i class="{{$ctrl.optionGlyphicon}}"></i>'+
                        '</a>'+
                    '</td>'+
                '</tr>'+
            '</tbody>'+
        '</table>'
    });

    DynamicTableCtrl.$inject = ['$filter', '$element'];
    function DynamicTableCtrl($filter, $element){
        var ctrl = this;

        ctrl.headerClicked = headerClicked;
        ctrl.optionClicked = optionClicked;
        ctrl.columnChanged = columnChanged;
        ctrl.isDisabled = isDisabled;
        ctrl.evalElement = evalElement;

        function headerClicked(column){
            ctrl.reverseSort = !ctrl.reverseSort;
            ctrl.orderBy = column.field;
            ctrl.onHeaderClick({orderBy: ctrl.orderBy, reverseSort: ctrl.reverseSort});
        }

        function optionClicked(contentItem, contentIndex){
            ctrl.onOptionClick({item: contentItem, index: contentIndex});
        }

        function columnChanged(){
            ctrl.onColumnListChange({columnList: ctrl.columnList});
        }

        /*
            This function will prevent for adding hidden headers if the the
            total width exceeds the width set on "limitWidth".

            If limitWidth=0, no limits will apply.
        */
        function isDisabled(column){
            if(ctrl.limitWidth === 0){
                return false;
            }else{
                var currentWidth = $element[0].children[0].offsetWidth;
                return(!column.visible && (currentWidth > ctrl.limitWidth));
            }
        }

        function evalElement(contentItem, column){
            var item = eval("contentItem."+column.field);

            if(item !== null){
                if(column.nestedField)
                    item = eval("contentItem."+column.nestedField);
                if(column.isDateField)
                    item = $filter('date')(item,"dd/MM/yy H:mm");
            }else{
                return "";
            }

            return item.toString();
        }
    }

})();