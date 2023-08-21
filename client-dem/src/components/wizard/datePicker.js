import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the default CSS
import moment from 'moment';

function DatePickers({ selectedDate, onDateChange }) {
  const maxDate = moment().add(30, 'days'); // Set a maximum date (30 days from today)

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="dd-MM-yyyy H:mm" // Customize the date format to include time
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="Time"
      minDate={new Date()} // Set a minimum date (today)
      maxDate={maxDate.toDate()}
      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
    />
  );
}

export default DatePickers;
