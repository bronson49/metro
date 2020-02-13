const homeFunc = function () {

const t = (a, b)=> {

    function c() {
        return a * b * b**2
    }
    return {
        sum () {
            return a + b
        },
        pow(it){
            return it**2
        },
        mul (){
            let res  = this.sum(a, b) + c();
            return res
        },
        pif (){
            return Math.sqrt(this.pow(a) + this.pow(b))
        },
    }
} ;
console.log(t(8, 15).pif());

};

export  {homeFunc}