import { ExtensionCategory, Graph, register } from "@antv/g6";
import { GNode, Group, Image, Rect, Text } from "@antv/g6-extension-react";

export const InitGraph = () => {
  register(ExtensionCategory.NODE, "g", GNode);

  const Node = ({ data, size }) => {
    const [width, height] = size;

    const { name, type, status, success, time, failure } = data.data;
    const color = status === "success" ? "#30BF78" : "#F4664A";
    const radius = 4;

    const titleMap = {
      success: "Success",
      time: "Time",
      failure: "Failure",
    };

    const format = (category, value) => {
      if (category === "success") return `${value}%`;
      if (category === "time") return `${value}min`;
      return value.toString();
    };

    const highlight = (category, value) => {
      if (category === "success") {
        if (value >= 90) return "green";
        if (value < 60) return "red";
        return "gray";
      }
      if (category === "time") {
        if (value <= 10) return "green";
        if (value >= 30) return "red";
        return "gray";
      }
      if (value >= 20) return "red";
      if (value >= 5) return "orange";
      return "gray";
    };

    return (
      <Group>
        <Rect
          width={width}
          height={height}
          stroke={color}
          fill={"white"}
          radius={radius}
        >
          <Rect
            width={width}
            height={20}
            fill={color}
            radius={[radius, radius, 0, 0]}
          >
            <Image
              src={
                type === "module"
                  ? "https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*0HC-SawWYUoAAAAAAAAAAABkARQnAQ"
                  : "https://gw.alipayobjects.com/mdn/rms_8fd2eb/afts/img/A*sxK0RJ1UhNkAAAAAAAAAAABkARQnAQ"
              }
              x={2}
              y={2}
              width={16}
              height={16}
            />
            <Text
              text={name}
              textBaseline="top"
              fill="#fff"
              fontSize={14}
              dx={20}
              dy={2}
            />
          </Rect>
          <Group transform="translate(5,40)">
            {Object.entries({ success, time, failure }).map(
              ([key, value], index) => (
                <Group
                  key={index}
                  transform={`translate(${(index * width) / 3}, 0)`}
                >
                  <Text text={titleMap[key]} fontSize={12} fill="gray" />
                  <Text
                    text={format(key, value)}
                    fontSize={12}
                    dy={16}
                    fill={highlight(key, value)}
                  />
                </Group>
              )
            )}
          </Group>
        </Rect>
      </Group>
    );
  };

  const graph = new Graph({
    container: "container",
    data: {
      nodes: [
        {
          id: "node-1",
          data: {
            name: "Module",
            type: "module",
            status: "success",
            success: <span>ddd</span>,
            time: 58,
            failure: 8,
          },
          style: { x: 100, y: 100 },
        },
        {
          id: "node-2",
          data: {
            name: "Process",
            type: "process",
            status: "error",
            success: 11,
            time: 12,
            failure: 26,
          },
          style: { x: 300, y: 100 },
        },
      ],
      edges: [{ source: "node-1", target: "node-2" }],
    },
    node: {
      type: "g",
      style: {
        size: [180, 60],
        component: (data) => <Node data={data} size={[180, 60]} />,
      },
    },
    behaviors: ["drag-element", "zoom-canvas", "drag-canvas"],
  });

  graph.render();
};
