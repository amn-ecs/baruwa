// 
// Baruwa - Web 2.0 MailScanner front-end.
// Copyright (C) 2010  Andrew Colin Kissa <andrew@topdog.za.net>
// 
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
//
// vim: ai ts=4 sts=4 et sw=4
//
function init_form(){
    //form initialization
    bool_fields = ["scaned","spam","highspam","saspam","rblspam","whitelisted","blacklisted","virusinfected","nameinfected","otherinfected","isquarantined"];
    num_fields = ["size","sascore"];
    text_fields = ["id","from_address","from_domain","to_address","to_domain","subject","clientip","spamreport","headers"];
    time_fields = ["date","time"];
    num_values = [{'value':1,'opt':'is equal to'},{'value':2,'opt':'is not equal to'},{'value':3,'opt':'is greater than'},{'value':4,'opt':'is less than'}];
    text_values = [{'value':1,'opt':'is equal to'},{'value':2,'opt':'is not equal to'},{'value':9,'opt':'is null'},{'value':10,'opt':'is not null'},
    {'value':5,'opt':'contains'},{'value':6,'opt':'does not contain'},{'value':7,'opt':'matches regex'},{'value':8,'opt':'does not match regex'}];
    time_values = [{'value':1,'opt':'is equal to'},{'value':2,'opt':'is not equal to'},{'value':3,'opt':'is greater than'},{'value':4,'opt':'is less than'}];
    bool_values = [{'value':11,'opt':'is true'},{'value':12,'opt':'is false'}];
    dojo.place('<option value="0" selected="0">Please select</option>', "id_filtered_field", 'first');
    dojo.attr('id_filtered_value', 'disabled', 'disabled');
    select_field = dojo.query("#id_filtered_field");
    select_field.onchange(function(e){
    	var value_to_check = dojo.byId("id_filtered_field").value;
    	if (dojo.indexOf(bool_fields, value_to_check) != -1) {
    		dojo.empty("id_filtered_by");
    		dojo.forEach(bool_values, function(item, i){
    			dojo.create("option",{value:item.value,innerHTML:item.opt},'id_filtered_by','last');
    		});
    		dojo.attr('id_filtered_value', 'disabled', 'disabled');
    		dojo.byId('id_filtered_value').value = '';
    	};
    	if (dojo.indexOf(num_fields, value_to_check) != -1) {
    		dojo.empty("id_filtered_by");
    		dojo.forEach(num_values, function(item, i){
    			dojo.create("option",{value:item.value,innerHTML:item.opt},'id_filtered_by','last');
    		});
    		dojo.removeAttr('id_filtered_value','disabled');
    		dojo.byId('id_filtered_value').value = '';
    	};
    	if (dojo.indexOf(text_fields, value_to_check) != -1) {
    		dojo.empty("id_filtered_by");
    		dojo.forEach(text_values, function(item, i){
    			dojo.create("option",{value:item.value,innerHTML:item.opt},'id_filtered_by','last');
    		});
    		dojo.removeAttr('id_filtered_value','disabled');
    		dojo.byId('id_filtered_value').value = '';
    	};
    	if (dojo.indexOf(time_fields, value_to_check) != -1) {
    		dojo.empty("id_filtered_by");
    		dojo.forEach(time_values, function(item, i){
    			dojo.create("option",{value:item.value,innerHTML:item.opt},'id_filtered_by','last');
    		});
    		dojo.removeAttr('id_filtered_value','disabled');
    		if (value_to_check == 'time') {
    			dojo.byId('id_filtered_value').value = 'HH:MM';
    		};
    		if (value_to_check == 'date') {
    			dojo.byId('id_filtered_value').value = 'YYYY-MM-DD';
    		};
    	};
    });    
}

function build_filters(filter_array){
	var links = [];
	var count = 0;
	dojo.forEach(filter_array, function(item, i){
		links[count++] = '<a href="/reports/fd/'+i+'/"><img src="/static/imgs/sm-del.png" alt="[x]"/></a>';
		links[count++] = '&nbsp;"'+item.filter_field+' '+item.filter_by+' '+item.filter_value+'"';
	});
	return links.join('');
}

function remove_filter(e,object){
    e.preventDefault();
    dojo.attr("filter_form_submit", {'disabled':'disabled','value':'Loading'});
	dojo.style('my-spinner','display','block');
    var url = dojo.attr(object,'href');
    dojo.xhrGet({
        url:url,
        handleAs:"json",
        load:function(data){process_response(data);}
    });
}