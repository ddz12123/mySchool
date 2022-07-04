let arr=['sb','tmd'];
let reg=/tmd|妈的|sb|tmd|傻逼|他妈的/g;
export default (str)=>{
	if(str instanceof Array){
		let a=[];
		str.forEach((item,index) => {
			if(arr.includes(item)){
				item=item.replace(item,'*');
				a.push(item);
			}else{
				a.push(item);
			}
		})
		return a;
	}
	if(typeof(str)=='string'){
		let res=str.replace(reg,'**');
		return res;
	}
		
}
