import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180 * (value / 100); // Ajusta el ángulo de la aguja
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path key="path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="none" fill={color} />,
  ];
};

export default class ScoreGauge extends PureComponent {
  render() {
    const { score } = this.props;
    const data = [
      { name: 'A', value: 20, color: '#FF4500' },
      { name: 'B', value: 20, color: '#FFA500' },
      { name: 'C', value: 20, color: '#FFD700' },
      { name: 'D', value: 20, color: '#9ACD32' },
      { name: 'E', value: 20, color: '#008000' },
    ];
    const cx = 200;
    const cy = 250;
    const iR = 100;
    const oR = 140;
    const value = score * 100; // Ajusta el valor del score para que esté entre 0 y 100

    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Your probability of default is: {(score * 100).toFixed(1)}%</h2>
        <PieChart width={400} height={500}>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(value, data, cx, cy, iR, oR, '#d0d000')}
        </PieChart>
      </div>
    );
  }
}