
const stations =  function () {


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
    };
    function openStation4gLabel(x,y){
        let textTag = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textTag.setAttributeNS(null,'x',x-10);
        textTag.setAttributeNS(null,'y',y+5);
        textTag.setAttributeNS(null,'fill','red');
        textTag.classList.add('text-4g');
        let text = document.createTextNode('4G');
        textTag.appendChild(text);
        return textTag
        //return `<text x="${x-10}" y="${y-23}" fill="red" class="4g-text">4G</text>`
    };
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
        //return `<text x="${x+27}" y="${y}" fill="red" class="station-name" data-station-name="${name}">${title}</text>`
    };
    function openStationCircle(cx,cy,name,id){
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttributeNS(null,'cx',cx);
        circle.setAttributeNS(null,'cy',cy);
        circle.setAttributeNS(null,'r','20');
        circle.setAttributeNS(null,'fill','white');
        circle.setAttributeNS(null,'data-name','name');
        circle.setAttributeNS(null,'data-id','id');
        circle.classList.add('open-4g', 'station-circle');
        return circle;
    };

    let mapSvg = document.getElementById('mapSvg');

    return {
        render(){
            return new Promise((resolve, reject)=>{
                getAllStations().then(res=>{
                    res.forEach(item=>{
                        let stationCircle = $(`[data-name=${item.slug}]`);
                        if (stationCircle.length){
                            const inst = stationCircle[0];
                            const instCords = {x: +inst.getAttribute('cx') , y: +inst.getAttribute('cy')};
                            mapSvg.appendChild(stationNameTemplate(instCords.x, instCords.y, item.slug, item.title));
                            if (item.status==='ready'){
                                stationCircle.remove();
                                mapSvg.appendChild(openStationCircle(instCords.x, instCords.y, item.slug, item.id) );
                                mapSvg.appendChild(openStation4gLabel(instCords.x, instCords.y) )
                            }
                        }
                    });
                    resolve(res)
                });
            });
        },
    }

};
module.exports = stations();