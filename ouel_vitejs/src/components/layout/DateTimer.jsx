import { useState, useEffect } from "react";
import { format } from 'date-fns';

const DateTimer = () => {
  const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDate ? format(currentDate, 'dd/MM/yyyy - HH:mm:ss') : "Đang tải...";

  return (
    <div className="mb-5 text-lg font-medium text-white">
        <p>
          <strong>Thời gian hiện tại: </strong>{" "}
          {formattedDate}
        </p>
    </div>
  );
};

export default DateTimer;