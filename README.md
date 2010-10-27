mooTwits
===========
![Screenshot](http://marcelo.origoni.com.ar/images/mooTimePicker.png)
	- mooTimePicker is a sliding timepicker. Allows to select seconds, and the amount of hours/minutes/seconds each step change.
	  
How to use
----------

	1.	#JS
		new mooTimePicker(input,options);
		element must be an input element
		options are:
			secondsSliders: false, 	--> Enables/disables the seconds slider
			hoursSteps: '1',		--> hours/minute/secsSteps, allow various data tipe. 
			minuteSteps: '10',			 _ If a number is passed, it will automatically calculated the steps, e.g if hoursSteps is set to 6, it will generate 4 steps, 0-6-12-18 
			secsSteps: '30',			 _ If a string with comma separated numbers, and object or an array are passed, it will calculate the steps, based on those number, e.g. minuteSteps set to [5,15,20,45,50], will set 5 steps, and assing the value ti each step
			hourLabel: 'Hours',		--> hours/mins/secsLabel, sets the text to display on top or at the bottom of each slider
			minsLabel: 'Minutes',	
			secsLabel: 'Seconds',	
			labelsPosition: 'top',	--> Where tp dislay the labels, 'top' or 'bottom'
			alwaysOn: false,		--> Sets if the slider are always on, or they fadein/out on focus/blur of the element
			showLabels: true,		--> Sets if the labels are displayed or not. 
			injectInside: ''	    --> The element where the sliders will be inject, if blank, the input's parent will be used.
			
Changelog:
----------

V. 1.1		- Added showLabels option.
			- Added injectInside option.
			- Fixed bug that showed the seconds label, even if secondSliders was set to false.
			- Fixed bug that didn't allow to select every minute, when steps was 1 or 2 minutes.