import brightness from '@system.brightness';
let numbers,newNumbers;
export default{
    data:{
        score:0,
        best:0,
        tiles:[],
        isShow:false,
    },
    onInit() {
        this.isShow=false;
        this.score=0;
        this.tiles=[{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""},{text:""}];
        numbers=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        newNumbers=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.supplyNumber();
        this.supplyNumber();
        this.updateView();
        brightness.setKeepScreenOn({keepScreenOn: true,});
        brightness.setMode({mode: 1,});
    },
    supplyNumber(){
        let positions=[];
        for(let i=0;i<=15;i++){
            if(!newNumbers[i]) positions.push(i);
        }
        let h=Math.floor(Math.random()*positions.length);
        if (Math.random()<=0.8){
            newNumbers[positions[h]]=2;
        }else{
            newNumbers[positions[h]]=4;
        }
    },
    onSwipe(e) {
        newNumbers=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        let start=0,differ=0,step=0;
        switch(e.direction){
            case 'left':
                start=0;
                differ=1;
                step=4;
                break;
            case 'right':
                start=3;
                differ=-1;
                step=4;
                break;
            case 'up':
                start=0;
                differ=4;
                step=1;
                break;
            case 'down':
                start=12;
                differ=-4;
                step=1;
                break;
        }
        let ids;
        for (let j=0;j<=3;j++){
            ids=this.getIds(start, differ);
            let before=null;
            let noZeros=0;
            for(let k=0;k<=3;k++){
                let id=ids[k];
                let number=numbers[id];
                if (number!=0){
                    if(number==before){
                        this.score+=number*2;
                        newNumbers[ids[noZeros-1]]*=2;
                        before=null;
                    }else{
                        newNumbers[ids[noZeros]]=number;
                        before=number;
                        noZeros+=1;
                    }
                }
            }
            start+=step;
        }
        if(this.best>=this.score){
            this.best=this.best;
        }else{
            this.best=this.score;}
        if(numbers.toString()!=newNumbers.toString()){
            this.supplyNumber();
            this.updateView();
            newNumbers=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            if(this.isGameOver()==true){this.isShow=true;}
        }
    },
    getIds(start, differ){
        let ids=[];
        for (let z=4;z>=1;z--){
            ids.push(start);
            start+=differ;
        }
        return ids;
    },
    updateView() {
        for (let x=0;x<=15;x++) {
            if (newNumbers[x]!=0){
                this.tiles[x].text=newNumbers[x].toString();
            }else{
                this.tiles[x].text="";
            }
        }
        numbers=newNumbers;
    },
    isGameOver(){
        if(this.isGridsFull()==true && this.isGridsNotMergeable()==true) return true;
    },
    isGridsFull(){
        if(numbers.indexOf(0)==-1){return true;}
    },
    isGridsNotMergeable(){
        for(let l=0;l<=15;l++){
            if(l<=14){
                if(numbers[l]==numbers[l+1]&&(l+1)%4!=0) return false;
            }
            if(l<=11){
                if(numbers[l]==numbers[l+4]) return false;
            }
        }
        return true;
    },
}
