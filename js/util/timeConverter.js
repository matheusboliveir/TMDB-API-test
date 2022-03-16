export default function(n) {
    let num = n;
    let h = (num / 60);
    let rh = Math.floor(h);
    let m = (h - rh) * 60;
    let rm = Math.round(m);
    return rh + "h " + rm + "m";
}