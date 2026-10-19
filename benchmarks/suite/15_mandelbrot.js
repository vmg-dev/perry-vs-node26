const WIDTH = 800;
const HEIGHT = 800;
const MAX_ITER = 100;
function benchmark() {
let totalIter = 0;
const start = performance.now();
for (let py = 0; py < HEIGHT; py++) {
    for (let px = 0; px < WIDTH; px++) {
        const cx = (px - WIDTH / 2.0) * 4.0 / WIDTH;
        const cy = (py - HEIGHT / 2.0) * 4.0 / HEIGHT;

        // Mandelbrot iteration inline
        let x = 0.0;
        let y = 0.0;
        let iter = 0;
        while (x * x + y * y <= 4.0 && iter < MAX_ITER) {
            const xtemp = x * x - y * y + cx;
            y = 2.0 * x * y + cy;
            x = xtemp;
            iter = iter + 1;
        }
        totalIter = totalIter + iter;
    }
}
const elapsed = performance.now() - start;
console.log("mandelbrot:" + elapsed);
console.log("total_iter:" + totalIter);
}
for(let round=0;round<12;round++){console.log("round:"+round);benchmark();}
