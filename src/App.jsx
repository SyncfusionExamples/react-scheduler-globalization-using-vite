import { createRoot } from 'react-dom/client';
import './App.css';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import { loadCldr, L10n, setCulture } from '@syncfusion/ej2-base';

import * as numberingSystems from "./cldr-data/supplemental/numberingSystems.json";
import * as gregorian from "./cldr-data/main/es/ca-gregorian.json";
import * as timeZoneNames from "./cldr-data/main/es/timeZoneNames.json";
import * as numbers from "./cldr-data/main/es/numbers.json";
import * as gregorianEn from "./cldr-data/main/en-US/ca-gregorian.json";
import * as numbersEn from "./cldr-data/main/en-US/numbers.json";
import * as timeZoneNamesEn from "./cldr-data/main/en-US/timeZoneNames.json";
import * as localeData from "./locale.json";

loadCldr(numberingSystems, gregorian, numbers, timeZoneNames, gregorianEn, numbersEn, timeZoneNamesEn);
L10n.load(localeData);

const Views = () => {

  const onCultureChange = (culture) => {
    setCulture(culture);
  };
  const scheduleObj = useRef(null);
  const data = extend([], [], null, true);
  return (<div className='schedule-control-section'>
    <div className='col-lg-9 control-section'>
      <div>
        <label htmlFor="cultures">Culture</label>
        <select
          id="cultures"
          onChange={(e) => onCultureChange(e.target.value)}>
          <option value="es">Spain*</option>
          <option value="en-US">English</option>
        </select>
      </div>
      <div className='control-wrapper'>
        <ScheduleComponent width='100%' height='650px' ref={scheduleObj} selectedDate={new Date(2021, 1, 15)} eventSettings={{ dataSource: data }} locale="es">
          <ViewsDirective>
            <ViewDirective option='Day' />
            <ViewDirective option='Week' />
            <ViewDirective option='WorkWeek' />
            <ViewDirective option='Month' />
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]} />
        </ScheduleComponent>
      </div>
    </div>
  </div>);
};
export default Views;

const root = createRoot(document.getElementById('root'));
root.render(<Views />);