export function timeTransform(duration: number) {
  var seconds: number | string = Math.floor((duration / 1000) % 60),
    minutes: number | string = Math.floor((duration / (1000 * 60)) % 60),
    hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

export function timeDisign(duration: number) {
  const time = timeTransform(duration);

  let count = -1;
  for (let simbol of time) {
    if (simbol === "0" || simbol === ":") {
      count++;
    } else {
      break;
    }
  }

  console.log("count", count);

  return (
    <>
      <span style={{ color: "rgba(0, 16, 37, 0.5)" }}>
        {time.slice(0, count + 1)}
      </span>
      {time.slice(count + 1)}
    </>
  );
}
