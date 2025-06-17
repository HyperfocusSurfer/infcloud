function initFullCalendar()
{
  window.calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: 'dayGridMonth',
    //weekNumbers: true
    //weekStart: 
      dateClick: function(info){
        if($('#ResourceCalDAVList .resourceCalDAV_item:visible').not('.resourceCalDAV_item_ro').length==0)
          return false;
        $('#show').val('');
        $('#CAEvent').hide();
        $('#timezonePicker').prop('disabled', true);
        $('#EventDisabler').fadeIn(globalEditorFadeAnimation, function(){
          showEventForm(info.date, info.allDay, null, info.jsEvent, 'new','');
          $('#name').trigger("focus");
        });
      },
      eventClick: function(info){
        globalCalEvent=info.event;
        globalJsEvent=info.jsEvent;
        if(info.event.type=='')
          showEventForm(null, info.event.allDay, info.event, info.jsEvent, 'show', '');
        else
          showEventForm(null, info.event.allDay, info.event, info.jsEvent, 'show', 'editOnly');
      },
   		select: function(info){
   			$('#show').val('');
   			$('#CAEvent').hide();
   			$('#timezonePicker').prop('disabled', true);
   			$('#EventDisabler').fadeIn(globalEditorFadeAnimation, function(){
   				var calEvent=new Object();
   				calEvent.start=info.startDate;
   				calEvent.end=info.endDate;
   				showEventForm(null, info.allDay, calEvent, info.jsEvent, 'new', '');
   				$('#name').focus();
   			});
   		},

  });
  window.calendar.render();
}

// function initFullCalendar()
// {
// 	$('#calendar').fullCalendar({
// 		eventMode: true,  // nope
// 		contentHeight: $('#main').height() - 14, // -14px for 7px padding on top and bottom
// 		windowResize: function(view){ // handled by default
// 			if(globalSettings.displayhiddenevents.value)
// 				hideEventCalendars();
// 			globalCalWidth = $('#main').width();
// 			if(typeof globalCalDAVInitLoad!='undefined' && !globalCalDAVInitLoad && !globalResourceRefreshNumber)
// 				$('#CalendarLoader').css('display','none');
// 		},
// 		bindingMode: globalSettings.openformmode.value, // nope

// 		startOfBusiness: globalSettings.calendarstartofbusiness.value,
// 		endOfBusiness: globalSettings.calendarendofbusiness.value,
// 		showWeekNumbers: true,

// 		multiWeekSize: globalMultiWeekSize,
// 		showDatepicker: true,
// 		//ignoreTimezone: !globalSettings.timezonesupport.value,
// 		titleFormat: {
// 			month: globalSettings.titleformatmonth.value,
// 			multiWeek: globalSettings.titleformatweek.value,
// 			week: globalSettings.titleformatweek.value,
// 			day: globalSettings.titleformatday.value,
// 			table: globalSettings.titleformattable.value,
// 		},
// 		columnFormat: {
// 			month: 'ddd',
// 			multiWeek: 'ddd',
// 			week: globalSettings.columnformatagenda.value,
// 			day: globalSettings.columnformatagenda.value,
// 			table: globalSettings.columnformatagenda.value,
// 		},
// 		timeFormat: {
// 			agenda: globalSettings.timeformatagenda.value,
// 			list: globalSettings.ampmformat.value ? 'hh:mm TT{ - hh:mm TT}' : 'HH:mm{ - HH:mm}',
// 			listFull: dateFormatJqToFc(globalSettings.datepickerformat.value) + (globalSettings.ampmformat.value ? ' hh:mm TT{ - ' : ' HH:mm{ - ') + dateFormatJqToFc(globalSettings.datepickerformat.value) + (globalSettings.ampmformat.value ? ' hh:mm TT}' : ' HH:mm}'),
// 			listFullAllDay: dateFormatJqToFc(globalSettings.datepickerformat.value) + '{ - ' + dateFormatJqToFc(globalSettings.datepickerformat.value) + '}',
// 			'': globalSettings.timeformatbasic.value
// 		},
// 		axisFormat: globalSettings.ampmformat.value ? 'h:mm TT' : 'H:mm',
// 		buttonText: {
// 			month: localization[globalInterfaceLanguage].fullCalendarMonth,
// 			multiWeek: localization[globalInterfaceLanguage].fullCalendarMultiWeek,
// 			week: localization[globalInterfaceLanguage].fullCalendarAgendaWeek,
// 			day: localization[globalInterfaceLanguage].fullCalendarAgendaDay,
// 			table: localization[globalInterfaceLanguage].fullCalendarTable,
// 			today: localization[globalInterfaceLanguage].fullCalendarTodayButton,
// 			prevMonth: localization[globalInterfaceLanguage].loadPrevMonth,
// 			nextMonth: localization[globalInterfaceLanguage].loadNextMonth,
// 		},
// 		allDayText: localization[globalInterfaceLanguage].fullCalendarAllDay,
// 		monthNames: localization[globalInterfaceLanguage].monthNames,
// 		monthNamesShort: localization[globalInterfaceLanguage].monthNamesShort,
// 		dayNames: localization[globalInterfaceLanguage].dayNames,
// 		dayNamesShort: localization[globalInterfaceLanguage].dayNamesShort,
// 		dayEventSizeStrict: true,

// 		beforeViewDisplay: function(view){
// 			// Hide scrollbar to force view rendering on full width
// 			if(globalAllowFcRerender)
// 				$('#main').css('overflow','hidden');
// 		},
// 		viewDisplay: function(view){
// 			// Allow scrollbar if previosly hidden
// 			if(globalAllowFcRerender)
// 				$('#main').css('overflow','');
// 			// If scrollbar present, force view rendering on reduced width
// 			if(globalAllowFcRerender && $('#main').width() - $('#calendar').width())
// 			{
// 				globalAllowFcRerender=false;
// 				$('#calendar').fullCalendar('render');
// 				return false;
// 			}
// 
// 			globalCalWidth=$('#main').width();
// 			if(globalSettings.displayhiddenevents.value)
// 				hideEventCalendars();
// 			globalAllowFcRerender=true;
// 		},
// 		firstDay: globalSettings.datepickerfirstdayofweek.value,
// 		weekendDays: globalSettings.weekenddays.value,
// 		header: {
// 			left: 'prev,next today',
// 			center: 'title',
// 			right: 'month,multiWeek,agendaWeek,agendaDay'
// 		},
// 		listSections: 'day',
// 		headerContainer: $('#main_h_placeholder'),
// 		defaultView: globalSettings.activeview.value,
// 		editable: true,
// 		currentTimeIndicator: true,
// 		unselectAuto: false,

  // important

// 		
// 		eventDragStart: function(calEvent, jsEvent, ui, view){
// 			globalPrevDragEventAllDay=calEvent.allDay;
// 		},
// 		eventDrop: function(calEvent, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
// 			if(calEvent.rid!='')
// 			{
// 				var coll = globalResourceCalDAVList.getCollectionByUID(calEvent.extendedProps.res_id);
// 				if(coll!=null && coll.permissions.read_only)
// 				{
// 					revertFunc();
// 					return false;
// 				}
// 
// 			}
// 			if(calEvent.extendedProps.realStart && calEvent.extendedProps.realEnd)
// 			{
// 				var checkDate=new Date(calEvent.extendedProps.realStart.getFullYear(), calEvent.extendedProps.realStart.getMonth(), calEvent.extendedProps.realStart.getDate()+dayDelta, calEvent.extendedProps.realStart.getHours(), calEvent.extendedProps.realStart.getMinutes()+minuteDelta,0);
// 				var checkDateEnd=new Date(calEvent.extendedProps.realEnd.getFullYear(), calEvent.extendedProps.realEnd.getMonth(), calEvent.extendedProps.realEnd.getDate()+dayDelta, calEvent.extendedProps.realEnd.getHours(), calEvent.extendedProps.realEnd.getMinutes()+minuteDelta,0);
// 				if(calEvent.extendedProps.type!='')
// 				{
// 					calEvent.start=checkDate;
// 					calEvent.end=checkDateEnd;
// 				}
// 				else
// 				{
// 					calEvent.extendedProps.realStart=checkDate;
// 					calEvent.extendedProps.realEnd=checkDateEnd;
// 				}
// 			}
// 			else
// 			{
// 				calEvent.extendedProps.realStart=calEvent.start;
// 				calEvent.extendedProps.realEnd=calEvent.end;
// 			}
// 
// 			globalRevertFunction=revertFunc;
// 			if(calEvent.extendedProps.type!='')
// 				showEventForm(null, calEvent.allDay, calEvent, jsEvent, 'drop', 'editOnly');
// 			else
// 				showEventForm(null, calEvent.allDay, calEvent, jsEvent, 'drop', '');
// 
// 			save(true);
// 			globalPrevDragEvent = null;
// 		},

// 		eventResize: function(calEvent, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view){
// 			globalPrevDragEventAllDay=calEvent.allDay;
// 			if(calEvent.rid!='')
// 			{
// 				var coll = globalResourceCalDAVList.getCollectionByUID(calEvent.extendedProps.res_id);
// 				if(coll!=null && coll.permissions.read_only)
// 				{
// 					revertFunc();
// 					return false;
// 				}
// 			}
// 
// 			if(calEvent.extendedProps.realStart && calEvent.extendedProps.realEnd)
// 			{
// 				var checkDateEnd = new Date(calEvent.extendedProps.realEnd.getFullYear(),calEvent.extendedProps.realEnd.getMonth(), calEvent.extendedProps.realEnd.getDate()+dayDelta, calEvent.extendedProps.realEnd.getHours(),calEvent.extendedProps.realEnd.getMinutes()+minuteDelta,0);
// 				if(calEvent.extendedProps.type!='')
// 					calEvent.end=checkDateEnd;
// 				else
// 					calEvent.extendedProps.realEnd=checkDateEnd;
// 			}
// 			else
// 				calEvent.extendedProps.realEnd=calEvent.end;
// 			globalRevertFunction=revertFunc;
// 
// 			if(calEvent.extendedProps.type!='')
// 				showEventForm(null, calEvent.allDay, calEvent, jsEvent, 'drop', 'editOnly');
// 			else
// 				showEventForm(null, calEvent.allDay, calEvent, jsEvent, 'drop', '');
// 
// 			save(true);
// 		},

// 		eventResizeHelperCreated: function(calEvent, jsEvent, element, helper, view){
// 			if(element.hasClass('searchCalDAV_hide'))
// 				helper.addClass('searchCalDAV_hide');
// 			if(element.hasClass('checkCalDAV_hide'))
// 				helper.addClass('checkCalDAV_hide');
// 		},

// 		selectable: true,
// 		selectHelper: false,

// 		eventAfterRender: function(event, element, view){
// 			element.attr('data-res-id',event.res_id);
// 			element.attr('data-id',event.id);
// 			element.addClass('event_item');
// 
// 			if(event.status == 'CANCELLED')
// 				$(element).find('.fc-event-title').css('text-decoration', 'line-through');
// 
// 			if(typeof event.hidden!='undefined' && event.hidden) {
// 				element.addClass('searchCalDAV_hide');
// 				if(view.name=='table' && !$(element).siblings().addBack().not('.searchCalDAV_hide').length)
// 					$(element).parent().prev().find('tr').addClass('searchCalDAV_hide');
// 			}
// 
// 			element.mouseenter(function(e){
// 				clearTimeout(globalEventTimeoutID);
// 				globalEventTimeoutID = setTimeout(function(){
// 					showEventPopup(e, event);
// 				}, 500);
// 			});
// 			element.mousemove(function(e){
// 				if($('#CalDavZAPPopup').is(':visible'))
// 					moveEventPopup(e);
// 			});
// 			element.mouseout(function(e){
// 				if(!$.contains(element.get(0),e.relatedTarget)) {
// 					clearTimeout(globalEventTimeoutID);
// 					hideEventPopup();
// 				}
// 			});
// 		},

// 		viewChanged: function(view) {
// 			$('#CAEvent').hide();
// 		},
// 		todayClick: function() {
// 			$('#CAEvent').hide();
// 		},
// 		prevClick: function() {
// 			$('#CAEvent').hide();
// 			getPrevMonths($('#calendar').fullCalendar('getView').start);
// 		},
// 		nextClick: function() {
// 			$('#CAEvent').hide();
// 			getNextMonths($('#calendar').fullCalendar('getView').end);
// 		}
// 	});
// }

function initTodoList()
{
  window.todoCalendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: 'dayGridMonth',
    //weekNumbers: true
    //weekStart: 
      eventClick: function(info){
        globalCalTodo=calTodo;
        if(calTodo.extendedProps.type=='')
          showTodoForm(calTodo, 'show', '');
        else
        {
          if(globalSettings.appleremindersmode.value && (calTodo.extendedProps.status=='COMPLETED' || calTodo.extendedProps.status== 'CANCELLED'))
            showTodoForm(calTodo, 'show', '');
                                                                                                          // idk, was just id
          else if(!globalSettings.appleremindersmode.value || typeof globalAppleSupport.nextDates[calTodo.extendedProps.ev_id] != 'undefined')
            showTodoForm(calTodo, 'show', 'editOnly');
          else
            showTodoForm(calTodo, 'show', '');
        }
      },
  });
}

// function initTodoList()
// {
// 	$('#todoList').fullCalendar({
// 		eventMode: false,
// 		showUnstartedEvents: globalSettings.appleremindersmode.value,
// 		simpleFilters: globalSettings.appleremindersmode.value,
// 		contentHeight: $('#mainTODO').height() - 14, //-14px for 7px padding on top and bottom
// 		windowResize: function(view){
// 			if(globalSettings.displayhiddenevents.value)
// 				hideTodoCalendars();
// 		},
// 		showDatepicker: true,
// 		titleFormat: {
// 			todo: globalSettings.titleformattable.value
// 		},
// 		columnFormat: {
// 			todo: globalSettings.columnformatagenda.value
// 		},
// 		timeFormat: {
// 			list: dateFormatJqToFc(globalSettings.datepickerformat.value) + (globalSettings.ampmformat.value ? ' hh:mm TT' : ' HH:mm')
// 		},
// 		axisFormat: globalSettings.ampmformat.value ? 'h:mm TT' : 'H:mm',
// 		buttonText: {
// 			today: localization[globalInterfaceLanguage].fullCalendarTodayButton,
// 			filtersHeader: localization[globalInterfaceLanguage].txtStatusFiltersHeaderTODO,
// 			filtersFooter: localization[globalInterfaceLanguage].txtStatusFiltersFooterTODO,
// 			filterAction: localization[globalInterfaceLanguage].txtStatusNeedsActionTODO,
// 			filterProgress: localization[globalInterfaceLanguage].txtStatusInProcessTODO,
// 			filterCompleted: localization[globalInterfaceLanguage].txtStatusCompletedTODO,
// 			filterCanceled: localization[globalInterfaceLanguage].txtStatusCancelledTODO,
// 		},
// 		allDayText: localization[globalInterfaceLanguage].fullCalendarAllDay,
// 		monthNames: localization[globalInterfaceLanguage].monthNames,
// 		monthNamesShort: localization[globalInterfaceLanguage].monthNamesShort,
// 		dayNames: localization[globalInterfaceLanguage].dayNames,
// 		dayNamesShort: localization[globalInterfaceLanguage].dayNamesShort,
// 		defaultFilters: globalSettings.todolistfilterselected.value,
// 		viewDisplay: function(view){
// 			if(globalSettings.displayhiddenevents.value)
// 				hideTodoCalendars();
// 			$('.fc-view-todo').removeClass('fc-view-trans');
// 		},
// 		firstDay: globalSettings.datepickerfirstdayofweek.value,
// 		weekendDays: globalSettings.weekenddays.value,
// 		header: {
// 			left: 'prev,next today',
// 			center: '',
// 			right: ''
// 		},
// 		listSections: 'day',
// 		headerContainer: $('#mainTODO_h_placeholder'),
// 		defaultView: 'todo',
// 		editable: true,
// 		todoColThresholds: [
// 			{'col':'priority', 'width':552},
// 			{'col':'location', 'width':702}
// 		],
// 		todoOptionalCols: [
// 			{'col':'time', 'width':142},
// 			{'col':'priority', 'width':18},
// 			{'col':'location', 'width':150}
// 		],
// 		selectEmpty: function(){
// 			if($('#todoInEdit').val()!=='true') {
// 				$('#CATodo').attr('style','display:none');
// 				$('#todoColor').css('background-color','');
// 			}
// 		},
// 		eventClick: function(calTodo, jsEvent, view){
// 			if($('#todoInEdit').val()=='true')
// 				return false;
// 
// 			globalCalTodo=calTodo;
// 			if(calTodo.type=='')
// 				showTodoForm(calTodo, 'show', '');
// 			else
// 			{
// 				if(globalSettings.appleremindersmode.value && (calTodo.status=='COMPLETED' || calTodo.status== 'CANCELLED'))
// 					showTodoForm(calTodo, 'show', '');
// 				else if(!globalSettings.appleremindersmode.value || typeof globalAppleSupport.nextDates[calTodo.id] != 'undefined')
// 					showTodoForm(calTodo, 'show', 'editOnly');
// 				else
// 					showTodoForm(calTodo, 'show', '');
// 			}
// 		},
// 		eventCheckDefault: function(event, checkbox, view) {
// 			var percent = parseInt(event.percent, 10);
// 			if(globalSettings.appleremindersmode.value)
// 				checkbox.prop('checked', percent>99);
// 			else {
// 				checkbox.prop({'checked':percent>0, 'indeterminate':percent>0 && percent<100});
// 				checkbox.attr('data-ind', percent>0 && percent<100 ? 'true' : 'false');
// 			}
// 
// 			checkbox.prop('disabled', globalResourceCalDAVList.getTodoCollectionByUID(event.res_id).permissions.read_only);
// 		},
// 		eventCheckClicked: function(checkbox, calTodo, jsEvent, view) {
// 			// [] -> [-]	--->	false, false -> true, false  -> true, true
// 			// [-] -> [x]	--->	true, true   -> false, false -> true, false
// 			// [x] -> [-x-] --->	true, false  -> false, false -> true, false
// 			// [-x-] -> []	--->	true, false  -> false, false -> false, false
// 
// 			jsEvent.stopPropagation();
// 
// 			var eventElement = checkbox.parent().parent();
// 			var checked = checkbox.prop('checked');
// 			var ind = checkbox.attr('data-ind')==='true';
// 			var cancelled = eventElement.hasClass('fc-event-cancelled');
// 
// 			if(!globalSettings.appleremindersmode.value) {
// 				checkbox.prop({'checked':ind || !checked && !cancelled ? !checked : checked, 'indeterminate':checked});
// 				checkbox.attr('data-ind', checked ? 'true' : 'false');
// 				eventElement.toggleClass('fc-event-cancelled', !ind && !checked && !cancelled);
// 			}
// 
// 			var percent = '';
// 			var status = '';
// 
// 			if(!checkbox.prop('checked')) {
// 				percent = '0';
// 				status = 'NEEDS-ACTION';
// 			}
// 			else if(checkbox.prop('indeterminate')) {
// 				percent = '50';
// 				status = 'IN-PROCESS';
// 			}
// 			else if(eventElement.hasClass('fc-event-cancelled')) {
// 				percent = '100';
// 				status = 'CANCELLED';
// 			}
// 			else {
// 				percent = '100';
// 				status = 'COMPLETED';
// 			}
// 
// 			todoCheckClick(status, percent, calTodo);
// 		},
// 		eventAfterRender: function(event, element, view){
// 			element.attr("data-res-id",event.res_id);
// 			element.attr("data-repeat-hash",event.repeatHash);
// 			if(event.start)
// 				element.attr("data-start", luxon.DateTime.fromJSDate(event.start).toFormat( "yyyyMMdd'T'HHmmss'Z'"));
// 			else
// 				element.attr("data-start", '');
// 			element.attr("data-id",event.id);
// 			element.addClass("event_item");
// 			var title = event.title.replace(vCalendar.pre['compressNewLineRex']," ");
// 			if(event.status == 'CANCELLED')
// 				$(element).addClass('fc-event-cancelled');
// 			switch(event.filterStatus)
// 			{
// 				case 'filterAction':
// 					title+=' ('+localization[globalInterfaceLanguage].txtStatusNeedsActionTODO+')';
// 					break;
// 				case 'filterProgress':
// 					title+=' ('+localization[globalInterfaceLanguage].txtStatusInProcessTODO+')';
// 					break;
// 				case 'filterCompleted':
// 					if(event.completedOn)
// 						title+=' ('+localization[globalInterfaceLanguage].txtCompletedOn+' '+luxon.DateTime.fromJSDate(event.completedOn).toFormat( dateFormatJqToFc(globalSettings.datepickerformat.value)+' '+(globalSettings.ampmformat.value ? 'h:mm TT' : 'H:mm'))+')';
// 					else
// 						title+=' ('+localization[globalInterfaceLanguage].txtStatusCompletedTODO+')';
// 					break;
// 				case 'filterCanceled':
// 					title+=' ('+localization[globalInterfaceLanguage].txtStatusCancelledTODO+')';
// 					break;
// 				default:
// 					break;
// 			}
// 			element.attr("title",title);
// 			if(typeof event.hidden!='undefined' && event.hidden)
// 				element.addClass('searchCalDAV_hide');
// 		},
// 		prevClick: function() {
// 			getPrevMonthsTodo();
// 		},
// 		nextClick: function() {
// 			getNextMonthsTodo();
// 		},
// 		datepickerClick: function(date) {
// 			if(date>globalToLoadedLimitTodo)
// 				getNextMonthsTodo(true);
// 			else if(date<globalLoadedLimitTodo)
// 				getPrevMonthsTodo(true);
// 		}
// 	});
// 	$('#todoList').fullCalendar('allowSelectEvent',false);
// }
