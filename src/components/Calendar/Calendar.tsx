import React, { useState } from 'react'
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/th'

dayjs.locale('th');


const CustomCalendar = () => {
  const [day, setDay] = useState(() => dayjs());
  return (
    <>
      <div>Calendar</div>
      <Calendar
      />
    </>
  )
}

export default CustomCalendar