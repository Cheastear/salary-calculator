import PropTypes from "prop-types";
import { useState, useEffect } from "react";

function Line({ data, onChange, index = 0, Name = "" }) {
  const [sum, setSum] = useState(0);

  useEffect(() => {
    setSum(
      data.reduce((value, current) => {
        return value + current;
      }, 0)
    );
  }, [data]);

  return (
    <tr>
      <th>{Name != "" ? Name : index + 1}</th>
      <th>{sum}</th>
      {data.map((elem, i) => {
        return (
          <th key={i}>
            <input
              value={elem}
              type="number"
              onChange={(e) => onChange(index, i, parseInt(e.target.value))}
            />
          </th>
        );
      })}
    </tr>
  );
}

Line.propTypes = {
  data: PropTypes.array,
  index: PropTypes.number,
  onChange: PropTypes.func,
  Name: PropTypes.string,
};

export default Line;
