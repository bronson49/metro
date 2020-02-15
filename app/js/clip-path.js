// import './lib/snap.svg-min.js'
import Snap from 'snapsvg';



// let circle = s.circle(300, 300, 200);
// circle.attr({
//     fill: "#bada55",
//     stroke: "#c71e20",
//     strokeWidth: 5
// });
// let smallCircle = s.circle(350, 550, 200);
// let smallCircle2 = s.circle(850, 650, 200);
//
// let discs = s.group(smallCircle, smallCircle2);
// discs.attr({
//     fill: "#fff"
// });
// bg.attr({
//     mask: discs
// });
//
// smallCircle.animate({r : 60}, 2000, mina.ease);

//let disksArr = [smallCircle , smallCircle2] ;

function animateDisc(circle) {


    function blink() {
        circle.animate({r: 190}, 1000, function () {
            circle.animate({r: 200}, 1000);
        });
    };
    setInterval(blink, 2001);
}

const clipStations = function (readyCords) {
    let s = Snap("#mapSvg");
    let bg = s.select('#svgBg');
    let circlesArr = [];
    readyCords.forEach(cords=>{
        let circle = s.circle(cords.x, cords.y, 200);
        circle.attr({
            fill: "#fff",
            class:"clip-circle"
        })
    });
    

    let circles = s.group( s.selectAll('.clip-circle') );

    return {
        start(){
            bg.attr({
                mask: circles
            });
        }

    }
};

export default clipStations;