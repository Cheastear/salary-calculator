import { useState, useEffect } from "react";
import Line from "./components/Line";

function App() {
  const [data, setData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("save"));
    return savedData ? savedData : Array(31).fill([0]);
  });
  const [tea, setTea] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("tea"));
    return savedData ? savedData : [0];
  });
  const [teaCash, setTeaCash] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("teaCash"));
    return savedData ? savedData : [0];
  });
  const [home, setHome] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("home"));
    return savedData ? savedData : [0];
  });

  useEffect(() => {
    localStorage.setItem("save", JSON.stringify(data));
    localStorage.setItem("tea", JSON.stringify(tea));
    localStorage.setItem("teaCash", JSON.stringify(teaCash));
    localStorage.setItem("home", JSON.stringify(home));
  }, [data, tea, teaCash, home]);

  const dataOnChange = (x, y, value) => {
    const copyData = data.map((row, rowIndex) => {
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

    setData(copyData);
  };

  const teaOnChange = (x, y, value) => {
    const updatedRow = tea.map((cell, cellIndex) => {
      if (cellIndex === y) return parseInt(value) || 0;
      else return cell;
    });

    if (updatedRow[updatedRow.length - 1] !== 0) {
      updatedRow.push(0);
    }

    setTea(updatedRow);
  };

  const teaCashOnChange = (x, y, value) => {
    const updatedRow = teaCash.map((cell, cellIndex) => {
      if (cellIndex === y) return parseInt(value) || 0;
      else return cell;
    });

    if (updatedRow[updatedRow.length - 1] !== 0) {
      updatedRow.push(0);
    }

    setTeaCash(updatedRow);
  };

  const homeOnChange = (x, y, value) => {
    const updatedRow = home.map((cell, cellIndex) => {
      if (cellIndex === y) return parseInt(value) || 0;
      else return cell;
    });

    if (updatedRow[updatedRow.length - 1] !== 0) {
      updatedRow.push(0);
    }

    setHome(updatedRow);
  };

  const calculateSum = () => {
    return data.reduce((acc, row) => {
      return acc + row.reduce((rowAcc, cell) => rowAcc + cell, 0);
    }, 0);
  };

  const clearData = () => {
    const confirmed = window.confirm("Ви дійсно хочете видалити всі дані?");
    if (confirmed) {
      localStorage.removeItem("save");
      setData(Array(31).fill([0]));
      setTea([0]);
      setTeaCash([0]);
      setHome([0]);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date:</th>
            <th>Money:</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem, i) => {
            return (
              <Line key={i} data={elem} index={i} onChange={dataOnChange} />
            );
          })}
          <tr>
            <th>Sum: </th>
            <th>{calculateSum()}</th>
            <th>{((calculateSum() / 100) * 45).toFixed(2)}</th>
          </tr>
          <Line data={tea} Name="Tea" onChange={teaOnChange} />
          <Line data={teaCash} Name="Tea cash" onChange={teaCashOnChange} />
          <Line data={home} Name="Home" onChange={homeOnChange} />
        </tbody>
      </table>
      <button onClick={clearData}>Clear</button>
    </>
  );
}

export default App;
