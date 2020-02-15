import Snap from 'snapsvg';

const stations =  function () {

    let mapSvg = document.getElementById('mapSvg');
    let s = Snap("#mapSvg");

    return {
        render(){
            return new Promise((resolve, reject)=>{
                getAllStations().then(res=>{
                    let readyCords = [];
                    let openCounter = 0;
                    res.forEach((item, index)=>{
                        let stationCircle = $(`[data-name=${item.slug}]`);
                        if (stationCircle.length){
                            const inst = stationCircle[0];
                            const instCords = {x: +inst.getAttribute('cx') , y: +inst.getAttribute('cy')};
                            mapSvg.appendChild(stationNameTemplate(instCords.x, instCords.y, item.slug, item.title));
                            if (item.status==='ready'){
                                openCounter++;
                                stationCircle.remove();
                                openStationCircle(instCords.x, instCords.y, item.slug, item.id, openCounter);
                                mapSvg.appendChild(openStation4gLabel(instCords.x, instCords.y) );
                                readyCords.push({x:instCords.x, y: instCords.y})
                            }
                        }
                    });
                    resolve(readyCords)
                });
            });
        },
    };


    function getAllStations(){
        return new Promise((resolve, reject)=>{
            $.ajax({
                url:"/img/metro.json",
                method:"GET",
                dataType:"json",
                success(res){
                    resolve(res)
                },
                error(e){
                    console.log(e);
                    resolve([])
                }
            });
        })
    }
    function openStation4gLabel(x,y){
        let textTag = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textTag.setAttributeNS(null,'x',x-10);
        textTag.setAttributeNS(null,'y',y+5);
        textTag.setAttributeNS(null,'fill','red');
        textTag.classList.add('text-4g');
        let text = document.createTextNode('4G');
        textTag.appendChild(text);
        return textTag
    }
    function stationNameTemplate(x,y,name,title){
        let textTag = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textTag.setAttributeNS(null,'x',x+27);
        textTag.setAttributeNS(null,'y',y);
        textTag.setAttributeNS(null,'fill','red');
        textTag.setAttributeNS(null,'data-station-name',name);
        textTag.classList.add('station-name');
        let text = document.createTextNode(title);
        textTag.appendChild(text);
        return textTag
    }
    function openStationCircle(cx,cy,name,id, index){
        let circle = s.circle(cx, cy, 1);
        console.log(circle);
        circle.attr({
            'fill':'#ffffff',
            'data-name': name,
            'data-id':id,
            class:'open-4g station-circle'
        });
        setTimeout(()=>{
            circle.animate({r: 20}, 1000, mina.bounce);
        }, index*200);

    }

};
export default  stations();