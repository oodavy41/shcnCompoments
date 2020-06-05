import React from "react";
export default function Selector(props) {
  console.log("camlab selector", props);
  const { selectKey, data, selectedKey } = props;

  return (
    <div className="cameras_selector">
      <label>
        <select
          value={selectedKey}
          onChange={(event) => selectKey(event.target.value)}
        >
          {data.map((v, i) => (
            <option value={i} key={v.value}>
              {`${v.value}`}
            </option>
          ))}
        </select>
      </label>
      {/* <div>chosen: {this.state.value}</div> */}
    </div>
  );
}
