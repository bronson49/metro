import stations from './stations-render.js'

let mapSvg=document.getElementById('mapSvg') ,
    mapWrapper=document.getElementById('mapWrapper') ,
    mapContainer=document.getElementById('mapContainer') ,
    scaleBtns=document.querySelectorAll('.scale-buttons');

let subscribePopup = document.getElementById('subscribePopup');

const appMetro = {

    scale: 1,

    stations: [],
    disableStations:[],
    activeStation:null,


    init(){
        $(mapWrapper).draggable({
            start( event, ui ) {appMetro.setSubscribePopup({})},
        });
        stations.render().then(res=>{
            this.events();
        });
    },

    events(){
        mapWrapper.addEventListener('click', e=>this.setSubscribePopup({}) );
        subscribePopup.addEventListener('click', e=>e.stopPropagation() );
        mapSvg.addEventListener('wheel', this.wheelScale);
        this.disableStations = mapSvg.querySelectorAll('.close-4g');
        this.disableStations.forEach(item=>{
            item.addEventListener('click', this.stationClick)
        });
    },
    toDrag(){},
    wheelScale(e){
        e.preventDefault();
        appMetro.toScale(e.deltaY);
    },
    toScale(vector){
        if (vector>0){ this.scale -= 0.5} else {this.scale += 0.5};
        if (this.scale>5) this.scale = 5;
        if (this.scale<1) {
            this.scale = 1;
            mapWrapper.style.left='0px';mapWrapper.style.top='0px';
        };
        mapSvg.style.transform = `scale(${this.scale})`;
    },
    stationClick(event){
        event.stopPropagation();
        appMetro.setSubscribePopup({
            x: event.x - 100,
            y: event.y - 130,
            visibility: 'block'
        });
        this.activeStation = event.target.getAttribute('data-name');
    },
    setSubscribePopup(cords){
        subscribePopup.style.top = cords.y + 'px';
        subscribePopup.style.left = cords.x + 'px';
        subscribePopup.style.display = cords.visibility || 'none';
    },

};

appMetro.init();