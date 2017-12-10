/*
 Highcharts JS v5.0.11 (2017-05-04)
 Highcharts Drilldown module

 Author: Torstein Honsi
 License: www.highcharts.com/license

*/
(function(n){"object"===typeof module&&module.exports?module.exports=n:n(Highcharts)})(function(n){(function(f){function n(a,b,d){var c;b.rgba.length&&a.rgba.length?(a=a.rgba,b=b.rgba,c=1!==b[3]||1!==a[3],a=(c?"rgba(":"rgb(")+Math.round(b[0]+(a[0]-b[0])*(1-d))+","+Math.round(b[1]+(a[1]-b[1])*(1-d))+","+Math.round(b[2]+(a[2]-b[2])*(1-d))+(c?","+(b[3]+(a[3]-b[3])*(1-d)):"")+")"):a=b.input||"none";return a}var A=f.noop,t=f.color,B=f.defaultOptions,h=f.each,p=f.extend,H=f.format,C=f.objectEach,v=f.pick,
u=f.wrap,q=f.Chart,w=f.seriesTypes,D=w.pie,r=w.column,E=f.Tick,x=f.fireEvent,F=f.inArray,G=1;h(["fill","stroke"],function(a){f.Fx.prototype[a+"Setter"]=function(){this.elem.attr(a,n(t(this.start),t(this.end),this.pos),null,!0)}});p(B.lang,{drillUpText:"\u25c1 Back to {series.name}"});B.drilldown={animation:{duration:500},drillUpButton:{position:{align:"right",x:-10,y:10}}};f.SVGRenderer.prototype.Element.prototype.fadeIn=function(a){this.attr({opacity:.1,visibility:"inherit"}).animate({opacity:v(this.newOpacity,
1)},a||{duration:250})};q.prototype.addSeriesAsDrilldown=function(a,b){this.addSingleSeriesAsDrilldown(a,b);this.applyDrilldown()};q.prototype.addSingleSeriesAsDrilldown=function(a,b){var d=a.series,c=d.xAxis,e=d.yAxis,g,k=[],y=[],l,m,z;z={colorIndex:v(a.colorIndex,d.colorIndex)};this.drilldownLevels||(this.drilldownLevels=[]);l=d.options._levelNumber||0;(m=this.drilldownLevels[this.drilldownLevels.length-1])&&m.levelNumber!==l&&(m=void 0);b=p(p({_ddSeriesId:G++},z),b);g=F(a,d.points);h(d.chart.series,
function(a){a.xAxis!==c||a.isDrilling||(a.options._ddSeriesId=a.options._ddSeriesId||G++,a.options._colorIndex=a.userOptions._colorIndex,a.options._levelNumber=a.options._levelNumber||l,m?(k=m.levelSeries,y=m.levelSeriesOptions):(k.push(a),y.push(a.options)))});a=p({levelNumber:l,seriesOptions:d.options,levelSeriesOptions:y,levelSeries:k,shapeArgs:a.shapeArgs,bBox:a.graphic?a.graphic.getBBox():{},color:a.isNull?(new f.Color(t)).setOpacity(0).get():t,lowerSeriesOptions:b,pointOptions:d.options.data[g],
pointIndex:g,oldExtremes:{xMin:c&&c.userMin,xMax:c&&c.userMax,yMin:e&&e.userMin,yMax:e&&e.userMax}},z);this.drilldownLevels.push(a);b=a.lowerSeries=this.addSeries(b,!1);b.options._levelNumber=l+1;c&&(c.oldPos=c.pos,c.userMin=c.userMax=null,e.userMin=e.userMax=null);d.type===b.type&&(b.animate=b.animateDrilldown||A,b.options.animation=!0)};q.prototype.applyDrilldown=function(){var a=this.drilldownLevels,b;a&&0<a.length&&(b=a[a.length-1].levelNumber,h(this.drilldownLevels,function(a){a.levelNumber===
b&&h(a.levelSeries,function(a){a.options&&a.options._levelNumber===b&&a.remove(!1)})}));this.redraw();this.showDrillUpButton()};q.prototype.getDrilldownBackText=function(){var a=this.drilldownLevels;if(a&&0<a.length)return a=a[a.length-1],a.series=a.seriesOptions,H(this.options.lang.drillUpText,a)};q.prototype.showDrillUpButton=function(){var a=this,b=this.getDrilldownBackText(),d=a.options.drilldown.drillUpButton,c,e;this.drillUpButton?this.drillUpButton.attr({text:b}).align():(e=(c=d.theme)&&c.states,
this.drillUpButton=this.renderer.button(b,null,null,function(){a.drillUp()},c,e&&e.hover,e&&e.select).addClass("highcharts-drillup-button").attr({align:d.position.align,zIndex:7}).add().align(d.position,!1,d.relativeTo||"plotBox"))};q.prototype.drillUp=function(){for(var a=this,b=a.drilldownLevels,d=b[b.length-1].levelNumber,c=b.length,e=a.series,g,k,f,l,m=function(b){var c;h(e,function(a){a.options._ddSeriesId===b._ddSeriesId&&(c=a)});c=c||a.addSeries(b,!1);c.type===f.type&&c.animateDrillupTo&&(c.animate=
c.animateDrillupTo);b===k.seriesOptions&&(l=c)};c--;)if(k=b[c],k.levelNumber===d){b.pop();f=k.lowerSeries;if(!f.chart)for(g=e.length;g--;)if(e[g].options.id===k.lowerSeriesOptions.id&&e[g].options._levelNumber===d+1){f=e[g];break}f.xData=[];h(k.levelSeriesOptions,m);x(a,"drillup",{seriesOptions:k.seriesOptions});l.type===f.type&&(l.drilldownLevel=k,l.options.animation=a.options.drilldown.animation,f.animateDrillupFrom&&f.chart&&f.animateDrillupFrom(k));l.options._levelNumber=d;f.remove(!1);l.xAxis&&
(g=k.oldExtremes,l.xAxis.setExtremes(g.xMin,g.xMax,!1),l.yAxis.setExtremes(g.yMin,g.yMax,!1))}x(a,"drillupall");this.redraw();0===this.drilldownLevels.length?this.drillUpButton=this.drillUpButton.destroy():this.drillUpButton.attr({text:this.getDrilldownBackText()}).align();this.ddDupes.length=[]};r.prototype.supportsDrilldown=!0;r.prototype.animateDrillupTo=function(a){if(!a){var b=this,d=b.drilldownLevel;h(this.points,function(a){var b=a.dataLabel;a.graphic&&a.graphic.hide();b&&(b.hidden="hidden"===
b.attr("visibility"),b.hidden||(b.hide(),a.connector&&a.connector.hide()))});setTimeout(function(){b.points&&h(b.points,function(a,b){b=b===(d&&d.pointIndex)?"show":"fadeIn";var c="show"===b?!0:void 0,e=a.dataLabel;if(a.graphic)a.graphic[b](c);if(e&&!e.hidden&&(e[b](c),a.connector))a.connector[b](c)})},Math.max(this.chart.options.drilldown.animation.duration-50,0));this.animate=A}};r.prototype.animateDrilldown=function(a){var b=this,d=this.chart.drilldownLevels,c,e=this.chart.options.drilldown.animation,
g=this.xAxis;a||(h(d,function(a){b.options._ddSeriesId===a.lowerSeriesOptions._ddSeriesId&&(c=a.shapeArgs)}),c.x+=v(g.oldPos,g.pos)-g.pos,h(this.points,function(a){a.graphic&&a.graphic.attr(c).animate(p(a.shapeArgs,{fill:a.color||b.color}),e);a.dataLabel&&a.dataLabel.fadeIn(e)}),this.animate=null)};r.prototype.animateDrillupFrom=function(a){var b=this.chart.options.drilldown.animation,d=this.group,c=d!==this.chart.seriesGroup,e=this;h(e.trackerGroups,function(a){if(e[a])e[a].on("mouseover")});c&&
delete this.group;h(this.points,function(e){var g=e.graphic,h=a.shapeArgs,l=function(){g.destroy();d&&c&&(d=d.destroy())};g&&(delete e.graphic,b?g.animate(h,f.merge(b,{complete:l})):(g.attr(h),l()))})};D&&p(D.prototype,{supportsDrilldown:!0,animateDrillupTo:r.prototype.animateDrillupTo,animateDrillupFrom:r.prototype.animateDrillupFrom,animateDrilldown:function(a){var b=this.chart.options.drilldown.animation,d=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1].shapeArgs,c=d.start,e=(d.end-
c)/this.points.length;a||(h(this.points,function(a,k){var g=a.shapeArgs;if(a.graphic)a.graphic.attr(f.merge(d,{start:c+k*e,end:c+(k+1)*e}))[b?"animate":"attr"](g,b)}),this.animate=null)}});f.Point.prototype.doDrilldown=function(a,b,d){var c=this.series.chart,e=c.options.drilldown,g=(e.series||[]).length,f;c.ddDupes||(c.ddDupes=[]);for(;g--&&!f;)e.series[g].id===this.drilldown&&-1===F(this.drilldown,c.ddDupes)&&(f=e.series[g],c.ddDupes.push(this.drilldown));x(c,"drilldown",{point:this,seriesOptions:f,
category:b,originalEvent:d,points:void 0!==b&&this.series.xAxis.getDDPoints(b).slice(0)},function(b){var c=b.point.series&&b.point.series.chart,d=b.seriesOptions;c&&d&&(a?c.addSingleSeriesAsDrilldown(b.point,d):c.addSeriesAsDrilldown(b.point,d))})};f.Axis.prototype.drilldownCategory=function(a,b){C(this.getDDPoints(a),function(d){d&&d.series&&d.series.visible&&d.doDrilldown&&d.doDrilldown(!0,a,b)});this.chart.applyDrilldown()};f.Axis.prototype.getDDPoints=function(a){var b=[];h(this.series,function(d){var c,
e=d.xData,f=d.points;for(c=0;c<e.length;c++)if(e[c]===a&&d.options.data[c]&&d.options.data[c].drilldown){b.push(f?f[c]:!0);break}});return b};E.prototype.drillable=function(){var a=this.pos,b=this.label,d=this.axis,c="xAxis"===d.coll&&d.getDDPoints,e=c&&d.getDDPoints(a);c&&(b&&e.length?(b.drillable=!0,b.addClass("highcharts-drilldown-axis-label").on("click",function(b){d.drilldownCategory(a,b)})):b&&b.drillable&&(b.on("click",null),b.removeClass("highcharts-drilldown-axis-label")))};u(E.prototype,
"addLabel",function(a){a.call(this);this.drillable()});u(f.Point.prototype,"init",function(a,b,d,c){var e=a.call(this,b,d,c);c=(a=b.xAxis)&&a.ticks[c];e.drilldown&&f.addEvent(e,"click",function(a){b.xAxis&&!1===b.chart.options.drilldown.allowPointDrilldown?b.xAxis.drilldownCategory(e.x,a):e.doDrilldown(void 0,void 0,a)});c&&c.drillable();return e});u(f.Series.prototype,"drawDataLabels",function(a){var b=this.chart.options.drilldown.activeDataLabelStyle,d=this.chart.renderer;a.call(this);h(this.points,
function(a){a.drilldown&&a.dataLabel&&("contrast"===b.color&&d.getContrast(a.color||this.color),a.dataLabel.addClass("highcharts-drilldown-data-label"))},this)});var I=function(a){a.call(this);h(this.points,function(a){a.drilldown&&a.graphic&&a.graphic.addClass("highcharts-drilldown-point")})};C(w,function(a){a.prototype.supportsDrilldown&&u(a.prototype,"drawTracker",I)})})(n)});