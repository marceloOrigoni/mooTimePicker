/*
---
description:     
  - mooTimePicker is a sliding timepicker. Allows to select seconds, and the amount of hours/minutes/seconds each step change.

authors:
  - Marcelo Origoni

version:
  - 1.1

license:
  - MIT-style license

requires:
  - core/1.3.0:   '*'
  - more:	'slider'
  
provides:
  - mooTimePicker
...
*/

var mooTimePicker = new Class({
	Implements: [Options,Events],
	options: {
		secondsSliders: false,
		hoursSteps: '1',
		minuteSteps: '10',
		secsSteps: '30',
		hourLabel: 'Hours',
		minsLabel: 'Minutes',
		secsLabel: 'Seconds',
		labelsPosition: 'top',
		alwaysOn: false,
		showLabels: false,
		injectInside: ''
		},
	initialize: function(input,options){
		//Set the options
		if(MooTools.version >= '1.3'){
			Object.merge(this.options, options);
		}else{
			this.options = $merge(this.options, options);
		}
		// Create the variables
		var appear,hourLabel,minsLabel,secsLabel,labels,hourSlider,minSlider,secSlider,hourKnob,minKnob,secKnob,hourBack,minBack,secBack,container, hours, mins, start, hourSteps, minsSteps, secsSteps, sliders, type, arrayHours, arrayMinutes, arraySeconds,i,h,m,s,startHourStep,startMinStep,startSecStep;
		//Create the containters of the sliders
		container = new Element('div', {'class': 'timePicker'});
		sliders = new Element('div', {'class': 'sliders'});
		//Create the labels
		if(this.options.showLabels){
			labels = new Element('div', {'class': 'labels'});
			hourLabel = new Element('div', {'class': 'label', 'text': this.options.hourLabel});
			minsLabel = new Element('div', {'class': 'label', 'text': this.options.minsLabel});
			secsLabel = new Element('div', {'class': 'label', 'text': this.options.secsLabel});
			hourLabel.inject(labels);
			minsLabel.inject(labels);
		}
		//create the hour Slider, background and knob
		hourSlider = new Element('div', {'class': 'bar'});hourBack = new Element('div', {'class': 'back'});hourKnob = new Element('div', {'class': 'knob',});
		//create the minutes Slider, background and knob
		minSlider = new Element('div', {'class': 'bar'});minBack = new Element('div', {'class': 'back'});minKnob = new Element('div', {'class': 'knob',});
		// Inject the background and knob indside each eslider
		hourBack.inject(hourSlider);hourKnob.inject(hourSlider);
		minBack.inject(minSlider);minKnob.inject(minSlider);
		hourSlider.inject(sliders);minSlider.inject(sliders);
		//If the seconds sliders is selected, create it, and inject it inside the container.
		if(this.options.secondsSliders){
			secSlider = new Element('div', {'class': 'bar'});secBack = new Element('div', {'class': 'back'});secKnob = new Element('div', {'class': 'knob',});
			secBack.inject(secSlider);secKnob.inject(secSlider);
			secSlider.inject(sliders);
			if(this.options.showLabels){
				secsLabel.inject(labels);
			}
		}
		//inject the sliders and labels inside the container, and the container after the input passed
		sliders.inject(container);
		if(this.options.showLabels){
			labels.inject(container, this.options.labelsPosition);
		}
		if(this.options.injectInside){
			this.options.injectInside = document.id(this.options.injectInside);
			container.inject(this.options.injectInside);
		}else{
			container.inject(input.getParent());			
		}
		
		//Add the focus/blur event to the input
		if(!this.options.alwaysOn){
			input.addEvent('focus', function(){var appear = new Fx.Tween(sliders,{duration: 500});appear.start('opacity', '1');});
			input.addEvent('blur', function(){var appear = new Fx.Tween(sliders,{duration: 500});appear.start('opacity', '0');});
		}
		// Check the Starting value, and set it to 0
		start = $(input).getProperty('value');
		if(!start.contains(':')){
			if(this.options.secondsSliders){
				start = '00:00:00';
			}else{
				start = '00:00';
			}
		}else{
			if(this.options.secondsSliders){
				if(start.split(':').length < 3){
					start = start + ':00';
				}
			}
		}
		// Check if hourSteps is an array, string or number, if not create an array.
		type = typeof(this.options.hoursSteps);
		arrayHours = new Array();
		switch(type){
			case 'string':
				if(this.options.hoursSteps.contains(',')){
					arrayHours = this.options.hoursSteps.split(',');
					hourSteps = Object.getLength(arrayHours);
				}else{
					this.options.hoursSteps = this.options.hoursSteps.toInt();
					hourSteps = 24 / this.options.hoursSteps;
					i=0;h=0;
					while(i < hourSteps){
						arrayHours[i] = h;
						i++;
						h = h + this.options.hoursSteps;
					}
				}
				break;
			case 'object':
				Object.each(this.options.hoursSteps,function(h,i){
					arrayHours[i] = h;
				});
				hourSteps = Object.getLength(arrayHours);				
				break;
			case 'array':
				hourSteps = this.options.hoursSteps.length();
				arrayHours = this.options.hoursSteps;
				break;
			case 'number':
			default:
				hourSteps = 24 / this.options.hoursSteps;
				i=0;h=0;
				while(i < hourSteps){
					arrayHours[i] = h;
					i++;h = h + this.options.hoursSteps;
				}
				break;
		}
		//Set the start Hour Step and the hourStep
		if(typeof(arrayHours) == 'object'){
			Object.keyOf(arrayHours,start.split(':')[0].toInt()) ? startHourStep = Object.keyOf(arrayHours,start.split(':')[0].toInt()): startHourStep = hourSteps;
		}else{
			arrayHours.indexOf(start.split(':')[0].toInt()) > -1 ? startHourStep = arrayHours.indexOf(start.split(':')[0].toInt()): startHourStep = hourSteps;
			}
		// startSecStep
		// Check if minuteSteps is an array, string or number, if not create an array.
		type = typeof(this.options.minuteSteps);
		arrayMinutes = new Array();
		switch(type){
			case 'string':
				if(this.options.minuteSteps.contains(',')){
					arrayMinutes = this.options.minuteSteps.split(',');
					minsSteps = Object.getLength(arrayMinutes);
				}else{
					this.options.minuteSteps = this.options.minuteSteps.toInt();
					minsSteps = 60 / this.options.minuteSteps;
					i=0;m=0;
					while(i < minsSteps){
						arrayMinutes[i] = m;
						i++;
						m = m + this.options.minuteSteps;
					}
				}
				break;
			case 'object':
				Object.each(this.options.minuteSteps,function(m,i){
					arrayMinutes[i] = m;
				});
				minsSteps = Object.getLength(arrayMinutes);				
				break;
			case 'array':
				minsSteps = this.options.minuteSteps.length();
				arrayMinutes = this.options.minuteSteps;
				break;
			case 'number':
			default:
				minsSteps = 60 / this.options.minuteSteps;
				i=0;m=0;
				while(i < minsSteps){
					arrayMinutes[i] = m;
					i++;m = m + this.options.minuteSteps;
				}
				break;
		}
		//Set the start Minutes Step and the minuteStep
		if(typeof(arrayMinutes) == 'object'){
			Object.keyOf(arrayMinutes,start.split(':')[1].toInt()) ? startMinStep = Object.keyOf(arrayMinutes,start.split(':')[1].toInt()): startMinStep = minsSteps;
		}else{
			arrayMinutes.indexOf(start.split(':')[1].toInt()) > -1 ? startMinStep = arrayMinutes.indexOf(start.split(':')[1].toInt()): startMinStep = minsSteps;
			}		
		//Create the Hours slider
		hours = new Slider(hourSlider, hourKnob,{
						snap: false,
						steps: hourSteps - 1,
						wheel: false,
						mode: 'vertical',
						onChange: function(hour){
							hour = arrayHours[hourSteps - hour - 1];
							hour < 10 ? hour = '0' + hour : hour = hour;
							var mins,secs,time = input.getProperty('value');
							time = time.split(":");
							mins = time[1];
							if(time.length > 2){
								secs = time[2]
								time = hour + ":" + mins + ":" + secs;
							}else{
								time = hour + ":" + mins;
							}
							input.setProperty('value', time);
							hourBack.setStyle('height', hourSlider.getStyle('height').toInt() - hourKnob.getStyle('top').toInt() - hourKnob.getStyle('height').toInt());
							}
						}).set(startHourStep);
						
		//Create the Minutes slider
		mins = new Slider(minSlider, minKnob,{
						snap: false,
						steps: minsSteps -1,
						wheel: false,
						mode: 'vertical',
						onChange: function(min){
							min = arrayMinutes[minsSteps - min - 1];
							min < 10 ? min = '0' + min : min = min;
							var hour,sec,time = input.getProperty('value');
							time = time.split(":");
							hour = time[0];
							if(time.length > 2){
								sec = time[2]
								time = hour + ":" + min + ":" + sec;
							}else{
								time = hour + ":" + min;
							}
							input.setProperty('value', time);
							minBack.setStyle('height', minSlider.getStyle('height').toInt() - minKnob.getStyle('top').toInt() - minKnob.getStyle('height').toInt());
							}
						}).set(startMinStep);
		// If Secondsslider is set, add the slider.
		if(this.options.secondsSliders){
			// Check if secondsSteps is an array, string or number, if not create an array.
			type = typeof(this.options.secsSteps);
			arraySeconds = new Array();
			switch(type){
				case 'string':
					if(this.options.secsSteps.contains(',')){
						arraySeconds = this.options.secsSteps.split(',');
						secsSteps = Object.getLength(arraySeconds);
					}else{
						this.options.secsSteps = this.options.secsSteps.toInt();
						secsSteps = 60 / this.options.secsSteps;
						i=0;s=0;
						while(i < secsSteps){
							arraySeconds[i] = s;
							i++;
							s = s + this.options.secsSteps;
						}
					}
					break;
				case 'object':
					Object.each(this.options.secsSteps,function(s,i){
						arraySeconds[i] = s;
					});
					secsSteps = Object.getLength(arraySeconds);				
					break;
				case 'array':
					secsSteps = this.options.secsSteps.length();
					arraySeconds = this.options.secsSteps;
					break;
				case 'number':
				default:
					secsSteps = 60 / this.options.secsSteps;
					i=0;s=0;
					while(i < secsSteps){
						arraySeconds[i] = s;
						i++;s = s + this.options.secsSteps;
					}
					break;
			}
			//Set the start Seconds Step and the secsStep
			if(typeof(arraySeconds) == 'object'){
				Object.keyOf(arraySeconds,start.split(':')[2].toInt()) ? startSecStep = Object.keyOf(arraySeconds,start.split(':')[2].toInt()): startSecStep = secsSteps;
			}else{
				arraySeconds.indexOf(start.split(':')[2].toInt()) > -1 ? startSecStep = arraySeconds.indexOf(start.split(':')[2].toInt()): startSecStep = secsSteps;
				}
			//Create the Seconds slider
			secs = new Slider(secSlider, secKnob,{
							snap: false,
							steps: secsSteps - 1,
							wheel: false,
							mode: 'vertical',
							onComplete: function(sec){
								sec = arraySeconds[secsSteps - sec - 1];
								sec < 10 ? sec = '0' + sec : sec = sec;
								var back,hour,min,time = input.getProperty('value');
								time = time.split(":");
								hour = time[0];
								min = time[1];
								time = hour + ":" + min + ":" + sec;
								input.setProperty('value', time);
								back = secSlider.getStyle('height').toInt() - secKnob.getStyle('top').toInt() - secKnob.getStyle('height').toInt();
								secBack.setStyle('height', back + 'px');
								}						
							}).set(startSecStep);
		secBack.setStyle('height', secSlider.getStyle('height').toInt() - secKnob.getStyle('top').toInt() - secKnob.getStyle('height').toInt());							
		}
		this.hours = hours;this.mins = mins;this.hourBack = hourBack;this.hourSlider = hourSlider;this.hourKnob = hourKnob;this.minBack = minBack;this.minSlider = minSlider;this.minKnob = minKnob;		
		hourBack.setStyle('height', hourSlider.getStyle('height').toInt() - hourKnob.getStyle('top').toInt() - hourKnob.getStyle('height').toInt());
		minBack.setStyle('height', minSlider.getStyle('height').toInt() - minKnob.getStyle('top').toInt() - minKnob.getStyle('height').toInt());
		appear = new Fx.Tween(sliders,{duration: 50});
		if(!this.options.alwaysOn){
			appear.start('opacity', '0');
		}
	},
	setSlider: function(input){
		start = $(input).getProperty('value');
		if(!start.contains(':')){start = '00:00';}
		this.hours.set(23 - start.split(':')[0]);
		this.mins.set(59 - start.split(':')[1]);
		this.hourBack.setStyle('height', this.hourSlider.getStyle('height').toInt() - this.hourKnob.getStyle('top').toInt() - this.hourKnob.getStyle('height').toInt());
		this.minBack.setStyle('height', this.minSlider.getStyle('height').toInt() - this.minKnob.getStyle('top').toInt() - this.minKnob.getStyle('height').toInt());		
	}
});