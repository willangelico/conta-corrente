
;(function($){

    "use strict";

    $.fn.Count = function( params ) {

        // Default options
        var options = $.extend( {
            btnRegisterClick    :   '.add-count',
            btnRegisterDelete   :   '.del-count', 
            formRegister        :   '.form-count',
            tblContent          :   '.tbl-count',
            sum                 :    '.sum',
            htmlCount           :   '<tr> '+
                                        '<td>{{DATA}}</td>' +
                                        '<td>{{TYPE}}</td>' +
                                        '<td>{{VALUE}}</td>' +
                                        '<td><button type="button" data-id={{ID}} class="btn btn-danger del-count">Apagar</button></td>' +                  
                                    '</tr>',       
            urlApi              :   'https://willangelico.000webhostapp.com/api/index.php/count',
            //urlApi              :   'http://www.connectparts.eco.br/json.json',
        }, params);

        // Plugin variables
        var $self           = $(this);
        
        // Put your DOM elements here
        var elements = {
            $window         : $( window ),
        };
        
        var methods = {
            init : function(){
                events.btnRegisterClick();
                events.btnDeleteClick();
                events.update();
            },

            registerValue : function(data){
                var type    = data[0]['value'];
                var value   = data[1]['value'].replace(/[^0-9]/g, '');
                $.ajax({
                      url: options.urlApi,
                      dataType: 'json',
                      type: 'POST',
                      data: {type: type, value: value},                     
                      success: function(data) {
                            methods.updateTable(); 
                      }
                }); 
            },

            deleteValue: function( id ){
                 $.ajax({
                    url: options.urlApi,
                    dataType: 'json',
                    type: 'DELETE',
                    data: {id:id},
                    success: function(data) {
                        methods.updateTable(); 
                    }
                });                  
            },

            updateTable: function(){
                $(options.tblContent).html('');
                $.get(options.urlApi, function(result) {
                    console.log(result);
                    var sum = 0;
                    var type="";
                    $.each(result, function(i, item) {
                       // alert(data[i].PageName);
                        if(item.type==1){
                            type= "Saque";
                            sum = parseInt(sum) - parseInt(item.value);
                        }else{
                            type = "Depósito";
                            sum = parseInt(sum) + parseInt(item.value);
                        }  
                        var html = options.htmlCount;
                        html = html.replace( /\{{DATA}}/g,      methods.invertDate(item.date) )
                                     .replace( /\{{TYPE}}/g,    type )
                                     .replace( /\{{VALUE}}/g,   methods.formatMoney(item.value, 2, ',', '.')  )
                                     .replace( /\{{ID}}/g,      item.id ); 
                        
                        $(options.tblContent).append( html );
                    });                                          
                    $(options.sum).html(methods.formatMoney(sum, 2, ',', '.'));
                });
            },

            invertDate: function(date){
              var monthNames = [
                "Janeiro", "Favereiro", "Março",
                "Abril", "Maio", "Junho", "Julho",
                "Agosto", "Setembro", "Outubro",
                "Novembro", "Dezembro"
              ];

              var date = new Date(date);
              var day = date.getDate();
              var monthIndex = date.getMonth();
              var year = date.getFullYear();
              var hour = date.getHours();
              var minutes = date.getMinutes();

          
              return day + ' ' + monthNames[monthIndex] + ' ' + year + ' às ' + hour + 'h ' + minutes;  
            },

            formatMoney : function(e, c, d, t){
                e = e.toString();
                if( e.indexOf('.') < 0 || e.indexOf(',') < 0 ){
                    e = e.substr(0, e.length - 2 ) + '.' + e.substr(-2);
                }

                var n = e, 
                    c = isNaN(c = Math.abs(c)) ? 2 : c, 
                    d = d == undefined ? "." : d, 
                    t = t == undefined ? "," : t, 
                    s = n < 0 ? "-" : "", 
                    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
                    j = (j = i.length) > 3 ? j % 3 : 0;
                return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
             },
                      
        };
        
        // Plugin events
        var events = {


            btnRegisterClick : function(){
                $(document).on('submit', options.formRegister, function(event){
                    event.preventDefault();
                    var $this = $(options.formRegister);
                    methods.registerValue($this.serializeArray());
                    return false;

                });

            },

            btnDeleteClick : function(){
                $(document).on('click', options.btnRegisterDelete, function(event){
                    event.preventDefault();
                    var $this = $(this);
                    var id    = $this.attr('data-id');
                    methods.deleteValue( id );
                    return false;
                });
            },

            update : function(){                
                methods.updateTable();
            }            
        };
        methods.init();

    };

})( jQuery );
