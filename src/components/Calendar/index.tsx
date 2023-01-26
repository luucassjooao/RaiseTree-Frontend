import { useState } from 'react';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';
import Button from '../Button';
import ReactPortal from '../ReactPortal';
import CalendarDays from './CalendarDays';
import {
  CalendarBody, CalendarHeader, Container, Overlay, TableHeader,
} from './style';
import { TDay } from './types';

type TPropsCalendar = {
  visible: boolean;
  arrayDates: string[];
  onClose(): void;
}

export default function Calendar({ visible, arrayDates, onClose }: TPropsCalendar) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);
  const [currentDay, setCurrentDay] = useState(new Date());

  const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosta', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  function ChangeCurrentDay(day: TDay) {
    setCurrentDay(new Date(day.year, day.month, day.number));
  }

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="calendar">
      <Overlay isLeaving={!visible} ref={animatedElementRef}>
        <div className="divColorBackground">
          <Container isLeaving={!visible}>
            <CalendarHeader>
              <h1>
                {months[currentDay.getMonth()]}
                {' '}
                {currentDay.getFullYear()}
              </h1>
              (Os dias que o aluno(a) foi presente, está colorido de amarelo!)
            </CalendarHeader>
            <CalendarBody>
              <TableHeader>
                {weekdays.map((week) => (
                  <div className="weekday" key={week}><p>{week}</p></div>
                ))}
              </TableHeader>
              <CalendarDays
                data={currentDay}
                ChangeCurrentDay={ChangeCurrentDay}
                pickingDates={arrayDates}
              />
            </CalendarBody>
          </Container>
          <Button
            size={120}
            onClick={onClose}
          >
            Fechar
          </Button>
        </div>
      </Overlay>
    </ReactPortal>
  );
}
