import React, { useState, useMemo, useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

import api from '../../services/api';
import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function Dashboard() {
  const [schedules, setSchedules] = useState([]);

  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d, 'de' MMMM", { locale: pt }),
    [date]
  );

  useEffect(() => {
    async function loadSchedules() {
      const { data } = await api.get('/v1/schedules', {
        params: { date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const dateScheduled = range.map(hour => {
        const checkDate = setSeconds(setMinutes(setHours(date, hour), 0), 0);

        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: data.result.find(appointment =>
            isEqual(parseISO(appointment.date), compareDate)
          ),
        };
      });

      console.tron.log(dateScheduled);
      setSchedules(dateScheduled);
    }

    loadSchedules();
  }, [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        {schedules.map(scheduleTime => (
          <Time
            key={scheduleTime.time}
            past={scheduleTime.past}
            available={!scheduleTime.appointment}
          >
            <strong>{scheduleTime.time}</strong>
            <span>
              {scheduleTime.appointment
                ? scheduleTime.appointment.user.name
                : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
