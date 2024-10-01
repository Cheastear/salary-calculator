import { useState } from "react";
import Line from "./components/Line";

const SAVE = "qwerty";

function App() {
  const [selectedDate, setSelectedDate] = useState({
    month: new Date().getUTCMonth() + 1,
    year: new Date().getUTCFullYear(),
  });
  const [data, setData] = useState(() => {
    const qq = localStorage.getItem(SAVE);
    if (qq === null) {
      return {
        date: selectedDate,
        save: Array(31).fill([0]),
        tea: [0],
        teaCash: [0],
        home: [0],
      };
    }
    const savedData = JSON.parse(qq).find((elem) => {
      if (
        elem.date.month === selectedDate.month &&
        elem.date.year === selectedDate.year
      ) {
        return elem;
      }
    });

    if (savedData !== undefined) return savedData;
    else
      return {
        date: selectedDate,
        save: Array(31).fill([0]),
        tea: [0],
        teaCash: [0],
        home: [0],
      };
  });

  const dataOnChange = (x, y, value) => {
    const copyData = data.save.map((row, rowIndex) => {
      if (rowIndex === x) {
        const updatedRow = row.map((cell, cellIndex) => {
          if (cellIndex === y) return parseInt(value) || 0;
          else return cell;
        });

        if (updatedRow[updatedRow.length - 1] !== 0) {
          updatedRow.push(0);
        }

        return updatedRow;
      } else {
        return row;
      }
    });

    setData({ ...data, save: copyData });
    saveData();
  };

  const teaOnChange = (x, y, value) => {
    const updatedRow = data.tea.map((cell, cellIndex) => {
      if (cellIndex === y) return parseInt(value) || 0;
      else return cell;
    });

    if (updatedRow[updatedRow.length - 1] !== 0) {
      updatedRow.push(0);
    }

    setData({ ...data, tea: updatedRow });
    saveData();
  };

  const teaCashOnChange = (x, y, value) => {
    console.log("qq");
    const updatedRow = data.teaCash.map((cell, cellIndex) => {
      if (cellIndex === y) return parseInt(value) || 0;
      else return cell;
    });

    if (updatedRow[updatedRow.length - 1] !== 0) {
      updatedRow.push(0);
    }

    setData({ ...data, teaCash: updatedRow });
    saveData();
  };

  const homeOnChange = (x, y, value) => {
    const updatedRow = data.home.map((cell, cellIndex) => {
      if (cellIndex === y) return parseInt(value) || 0;
      else return cell;
    });

    if (updatedRow[updatedRow.length - 1] !== 0) {
      updatedRow.push(0);
    }

    setData({ ...data, home: updatedRow });
    saveData();
  };

  const calculateSum = () => {
    return data.save.reduce((acc, row) => {
      return acc + row.reduce((rowAcc, cell) => rowAcc + cell, 0);
    }, 0);
  };

  const clearData = () => {
    const confirmed = window.confirm("Ви дійсно хочете видалити всі дані?");
    if (confirmed) {
      localStorage.removeItem(SAVE);
      setData({
        save: Array(31).fill([0]),
        tea: [0],
        teaCash: [0],
        home: [0],
      });
      saveData();
    }
  };

  const prevDate = () => {
    const newSelectedDate = {
      month: selectedDate.month === 1 ? 12 : selectedDate.month - 1,
      year:
        selectedDate.month === 1 ? selectedDate.year - 1 : selectedDate.year,
    };

    let savedData = JSON.parse(localStorage.getItem(SAVE)).find((elem) => {
      if (
        elem.date.month === newSelectedDate.month &&
        elem.date.year === newSelectedDate.year
      )
        return elem;
    });

    if (!savedData) {
      savedData = {
        date: newSelectedDate,
        save: Array(31).fill([0]),
        tea: [0],
        teaCash: [0],
        home: [0],
      };
    }

    saveData();

    setSelectedDate(newSelectedDate);
    setData(savedData);
  };

  const nextDate = () => {
    const newSelectedDate = {
      month: selectedDate.month === 12 ? 1 : selectedDate.month + 1,
      year:
        selectedDate.month === 12 ? selectedDate.year + 1 : selectedDate.year,
    };

    let savedData = JSON.parse(localStorage.getItem(SAVE)).find((elem) => {
      if (
        elem.date.month === newSelectedDate.month &&
        elem.date.year === newSelectedDate.year
      )
        return elem;
    });

    if (!savedData) {
      savedData = {
        date: newSelectedDate,
        save: Array(31).fill([0]),
        tea: [0],
        teaCash: [0],
        home: [0],
      };
    }

    saveData();

    setSelectedDate(newSelectedDate);
    setData(savedData);
  };

  const saveData = () => {
    let savedData = JSON.parse(localStorage.getItem(SAVE));

    if (savedData === null)
      savedData = [
        {
          date: selectedDate,
          save: Array(31).fill([0]),
          tea: [0],
          teaCash: [0],
          home: [0],
        },
      ];
    const indexData = savedData.findIndex(
      (elem) =>
        elem.date.month === selectedDate.month &&
        elem.date.year === selectedDate.year
    );

    if (indexData !== -1) savedData[indexData] = data;
    else savedData.push(data);

    localStorage.setItem(SAVE, JSON.stringify(savedData));
  };

  return (
    <>
      <h1>{`${selectedDate.month}.${selectedDate.year}`}</h1>
      <button onClick={prevDate}>Prev</button>
      <button onClick={nextDate}>Next</button>
      <table>
        <thead>
          <tr>
            <th>Date:</th>
            <th>Money:</th>
          </tr>
        </thead>
        <tbody>
          {data.save.map((elem, i) => {
            return (
              <Line key={i} data={elem} index={i} onChange={dataOnChange} />
            );
          })}
          <tr>
            <th>Sum: </th>
            <th>{calculateSum()}</th>
            <th>{((calculateSum() / 100) * 40).toFixed(2)}</th>
          </tr>
          <Line data={data.tea} Name="Tea" onChange={teaOnChange} />
          <Line
            data={data.teaCash}
            Name="Tea cash"
            onChange={teaCashOnChange}
          />
          <Line data={data.home} Name="Home" onChange={homeOnChange} />

          <tr>
            <th>Sum: </th>
            <th>
              {calculateSum() +
                data.tea.reduce((rowAcc, cell) => rowAcc + cell, 0) +
                data.teaCash.reduce((rowAcc, cell) => rowAcc + cell, 0) +
                data.home.reduce((rowAcc, cell) => rowAcc + cell, 0)}
            </th>
          </tr>
        </tbody>
      </table>
      <button onClick={clearData}>Clear</button>
    </>
  );
}

export default App;
