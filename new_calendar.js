function initNewFC()
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
// 				var coll = globalResourceCalDAVList.getCollectionByUID(calEvent.res_id);
// 				if(coll!=null && coll.permissions.read_only)
// 				{
// 					revertFunc();
// 					return false;
// 				}
// 
// 			}
// 			if(calEvent.realStart && calEvent.realEnd)
// 			{
// 				var checkDate=new Date(calEvent.realStart.getFullYear(), calEvent.realStart.getMonth(), calEvent.realStart.getDate()+dayDelta, calEvent.realStart.getHours(), calEvent.realStart.getMinutes()+minuteDelta,0);
// 				var checkDateEnd=new Date(calEvent.realEnd.getFullYear(), calEvent.realEnd.getMonth(), calEvent.realEnd.getDate()+dayDelta, calEvent.realEnd.getHours(), calEvent.realEnd.getMinutes()+minuteDelta,0);
// 				if(calEvent.type!='')
// 				{
// 					calEvent.start=checkDate;
// 					calEvent.end=checkDateEnd;
// 				}
// 				else
// 				{
// 					calEvent.realStart=checkDate;
// 					calEvent.realEnd=checkDateEnd;
// 				}
// 			}
// 			else
// 			{
// 				calEvent.realStart=calEvent.start;
// 				calEvent.realEnd=calEvent.end;
// 			}
// 
// 			globalRevertFunction=revertFunc;
// 			if(calEvent.type!='')
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
// 				var coll = globalResourceCalDAVList.getCollectionByUID(calEvent.res_id);
// 				if(coll!=null && coll.permissions.read_only)
// 				{
// 					revertFunc();
// 					return false;
// 				}
// 			}
// 
// 			if(calEvent.realStart && calEvent.realEnd)
// 			{
// 				var checkDateEnd = new Date(calEvent.realEnd.getFullYear(),calEvent.realEnd.getMonth(), calEvent.realEnd.getDate()+dayDelta, calEvent.realEnd.getHours(),calEvent.realEnd.getMinutes()+minuteDelta,0);
// 				if(calEvent.type!='')
// 					calEvent.end=checkDateEnd;
// 				else
// 					calEvent.realEnd=checkDateEnd;
// 			}
// 			else
// 				calEvent.realEnd=calEvent.end;
// 			globalRevertFunction=revertFunc;
// 
// 			if(calEvent.type!='')
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
