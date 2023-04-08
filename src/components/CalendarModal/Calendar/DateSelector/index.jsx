import { useCallback, useState } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DayPickerSingleDateController } from "react-dates";
import moment from "moment";
import "moment/locale/ko";
import "./DateSelector.css";
export default function DateSelector({
  initialDate,
  onDateChange,
  isDayHighlighted,
}) {
  const [selectedDate, setSelectedDate] = useState(
    initialDate ? moment(initialDate) : null
  );
  const [focusedInput, setFocusedInput] = useState(false);
  const isDayBlocked = useCallback((day) => {
    const thatDay = moment(day).format("l");
    const today = moment(new Date()).format("l");
    if (thatDay >= today) {
      return false;
    }
    return true;
  }, []);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <DayPickerSingleDateController
      date={selectedDate}
      onDateChange={handleDateChange}
      isDayHighlighted={isDayHighlighted}
      focused={focusedInput.focused}
      onFocusChange={setFocusedInput}
      isDayBlocked={isDayBlocked}
      daySize={50}
      monthFormat="YYYY년 M 월"
      hideKeyboardShortcutsPanel
    />
  );
}
