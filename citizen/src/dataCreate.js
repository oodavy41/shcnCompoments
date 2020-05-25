import echarts from "echarts/lib/echarts";

const CreateOption = {
  peopleHotLineOpt: (data, val) => {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}({d}%)"
      },
      grid: {
        top: 10,
        bottom: 10,
        containLabel: true
      },
      legend: {
        textStyle: {
          color: "#Fff"
        },
        top: 20,
        right: 10,
        type: "plain",
        show: true,
        orient: "vertical"
      },
      color: ["#e69457", "#3f8df5", "#7482d0", "#16ddd1", "#16add1", "#126f91"],
      series: [
        {
          name: "市民热线",
          type: "pie",
          radius: [50, 75],
          center: ["35%", "50%"],
          hoverAnimation: true,
          avoidLabelOverlap: false,
          startAngle: 150,
          // roseType: "radius",
          label: {
            formatter: "{c}({d}%)",
            show: true,
            position: "outside",
            textStyle: {
              fontSize: "15",
              fontWeight: "bold"
            },
            alignTo: "labelLine",

            fontSize: 9,
            fontFamily: "FranklinGothic Medium",
            color: "#fff"
          },
          data: data
        }
      ]
    };
  }
};
export default CreateOption;
