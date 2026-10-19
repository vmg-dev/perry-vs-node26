// Benchmark: JSON parse + stringify roundtrip
// Measures: speed + peak RSS for large JSON operations
// Catches: json.rs memory leaks, GC root issues (v0.5.37)

// Build a ~1MB JSON blob
const items        = [];
for (let i = 0; i < 10000; i++) {
  items.push({
    id: i,
    name: "item_" + i,
    value: i * 3.14159,
    tags: ["tag_" + (i % 10), "tag_" + (i % 5)],
    nested: { x: i, y: i * 2 }
  });
}
const blob = JSON.stringify(items);


console.log(blob);
console.log(JSON.stringify(JSON.parse(blob)));
