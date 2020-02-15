import Snap from 'snapsvg';


const clipStations = function (readyCords) {
    let s = Snap("#mapSvg");
    let bg = s.select('#svgBg');
    let circlesArr = [];
    readyCords.forEach(cords=>{
        let circle = s.circle(cords.x, cords.y, 1);
        circle.attr({
            fill: "#fff",
            class:"clip-circle"
        });
        circlesArr.push(circle);
    });
    

    let circles = s.group( s.selectAll('.clip-circle') );

    return {
        start(){
            return new Promise(resolve=>{
                bg.attr({
                    mask: circles
                });
                resolve();
            })
        },
        appear(){
            return new Promise(resolve=>{
                circlesArr.forEach((circle, index)=>{
                    setTimeout(()=>{
                        appearDisc(circle)
                    },index*777)
                });
                resolve();
            })
        },

    };

    function appearDisc(circle) {
        circle.animate({r: 200}, 2000);
        animateDisc(circle);
    }
    function animateDisc(circle) {
        setInterval(()=>{
            circle.animate({r: 190}, 1000, function () {
                circle.animate({r: 200}, 1000);
            });
        }, 2001);
    }

};

export default clipStations;