// All hours and date boundaries use India Standard Time.
export function dailyHours(day) {
  // Repeatable across retries, independent of the active repository.
  let state = Number(day.replaceAll("-", ""));
  function draw(limit) {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return Math.floor((state / 4294967296) * limit);
  }
  // Mix adjacent calendar dates before drawing the count.
  for (let i = 0; i < 5; i++) draw(1);
  const hours = Array.from({ length: 13 }, (_, i) => i + 9);
  const count = 1 + draw(6);
  const chosen = [];
  while (chosen.length < count) chosen.push(hours.splice(draw(hours.length), 1)[0]);
  return chosen.sort((a, b) => a - b);
}

export function activeRepository(config, day) {
  const matches = config.periods.filter(p => p.start <= day && day <= p.end);
  if (matches.length > 1) throw new Error("Overlapping repository periods");
  const repo = matches.length ? matches[0].repository : config.default_repository;
  if (!/^ShreyPatel-1008\/[\w.-]+$/i.test(repo)) throw new Error("Invalid repository owner or name");
  return repo;
}
