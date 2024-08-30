import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1000, // Number of virtual users
  duration: "30s", // Test duration
};

export default function () {
  // Replace this URL with your API endpoint
  const res = http.get("http://192.168.49.2:30500");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time is less than 200ms": (r) => r.timings.duration < 200,
  });

  sleep(1);
}
