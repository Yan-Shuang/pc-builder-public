import type { ReactNode } from "react";
import type { Part, Vec3 } from "../types";

function Box({size,position=[0,0,0],color="#53646b",metal=.2,transparent=false,opacity=1}:{size:Vec3;position?:Vec3;color?:string;metal?:number;transparent?:boolean;opacity?:number}){
  return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} metalness={metal} roughness={.48} transparent={transparent} opacity={opacity} depthWrite={!transparent}/></mesh>;
}
function Fan({radius,position=[0,0,0],rotation=[Math.PI/2,0,0]}:{radius:number;position?:Vec3;rotation?:Vec3}){
  return <group position={position} rotation={rotation}><mesh><cylinderGeometry args={[radius,radius,5,28]}/><meshStandardMaterial color="#101820"/></mesh>{Array.from({length:7},(_,i)=><group key={i} rotation={[0,0,i*Math.PI*2/7]}><Box size={[radius*.7,radius*.18,2]} position={[radius*.42,0,4]} color="#455d66"/></group>)}<mesh position={[0,0,6]}><cylinderGeometry args={[radius*.23,radius*.23,6,20]}/><meshStandardMaterial color="#9aacae" metalness={.7}/></mesh></group>;
}
function Cpu({part,selected}:{part:Part;selected:boolean}){
  const copper=part.modelId==="cpu-copper-wide"; return <group><Box size={[part.size[0],2,part.size[2]]} position={[0,1,0]} color={copper?"#47372d":"#244d45"}/><Box size={[part.size[0]-5,part.size[1]-2,part.size[2]-5]} position={[0,4,0]} color={selected?"#d8ef96":copper?"#c59672":"#c2ced0"} metal={.8}/>{copper&&<><Box size={[8,1,32]} position={[-12,7,0]} color="#6e4d39"/><Box size={[8,1,32]} position={[12,7,0]} color="#6e4d39"/></>}</group>;
}
function Board({part,selected}:{part:Part;selected:boolean}){
  const arch=part.modelId==="board-arch-a"; const [w,h,d]=part.size; return <group><Box size={[w,h,d]} color={arch?"#263547":"#24483f"}/>{Array.from({length:arch?10:7},(_,i)=><Box key={i} size={[1,.7,d-34]} position={[-w/2+28+i*22,h/2+1,0]} color={arch?"#69809e":"#648c80"}/>) }<Box size={[58,7,58]} position={[-34,h/2+5,-34]} color={selected?"#d8ef96":"#8e999d"} metal={.6}/>{[38,52].map(x=><Box key={x} size={[7,13,d*.55]} position={[x,h/2+7,-18]} color={arch?"#151d2b":"#182824"}/>)}<Box size={[w*.68,10,10]} position={[-10,h/2+6,d*.31]} color={arch?"#b28266":"#97a6aa"}/>{arch&&<><Box size={[64,22,34]} position={[-w*.32,h/2+12,-d*.35]} color="#3e5068"/><Box size={[38,18,72]} position={[w*.35,h/2+10,d*.3]} color="#465a73"/></>}</group>;
}
function Memory({part,selected}:{part:Part;selected:boolean}){
  const finned=part.modelId==="memory-finned-32"; const tone=selected?"#d8ef96":finned?"#a67fca":"#6f9c91"; return <group><Box size={part.size} position={[0,part.size[1]/2,0]} color="#182126"/><Box size={[part.size[0]+2,3,part.size[2]-8]} position={[0,part.size[1],0]} color={tone}/>{finned&&[-50,-25,0,25,50].map(z=><Box key={z} size={[part.size[0]+4,8,12]} position={[0,part.size[1]+4,z]} color={tone}/>)}{!finned&&<Box size={[part.size[0]+3,2,part.size[2]*.7]} position={[0,part.size[1]+2,0]} color="#9fc5bb"/>}</group>;
}
function Gpu({part,selected}:{part:Part;selected:boolean}){
  const triple=part.modelId==="gpu-triple-long"; const [w,h,d]=part.size; return <group><Box size={[w,h,d]} position={[w/2,h/2,d/2]} color={triple?"#25293a":"#1d2d31"}/><Box size={[w,h,3]} position={[w/2,h/2,d+2]} color={selected?"#d8ef96":triple?"#7067a2":"#668b88"} metal={.5}/>{(triple?[.18,.5,.82]:[.28,.72]).map(x=><Fan key={x} radius={triple?43:38} position={[w*x,h/2,d+5]} rotation={[Math.PI/2,0,0]}/>) }<Box size={[4,h+12,d]} position={[0,h/2,d/2]} color="#a5b2b6" metal={.75}/>{triple&&<Box size={[w*.7,6,8]} position={[w*.55,h+5,d*.55]} color="#bc8a70"/>}</group>;
}
function Ssd({part,selected}:{part:Part;selected:boolean}){
  const ribbed=part.modelId==="ssd-ribbed-2"; const [w,h,d]=part.size; return <group><Box size={[w,h,d]} position={[w/2,h/2,0]} color={ribbed?"#303342":"#183a31"}/>{ribbed?Array.from({length:7},(_,i)=><Box key={i} size={[4,3,d-3]} position={[10+i*10,h+1,0]} color={selected?"#d8ef96":"#74758d"}/>):[18,41,63].map(x=><Box key={x} size={[15,2,16]} position={[x,h+1,0]} color={selected?"#d8ef96":"#30383b"}/>) }<Box size={[5,1,d]} position={[2,h,0]} color="#c4a86d"/></group>;
}
function Cooler({part,selected}:{part:Part;selected:boolean}){
  if(part.modelId==="cooler-loop") return <group><Box size={[40,7,40]} position={[0,4,0]} color="#9da9aa" metal={.7}/><mesh position={[0,22,0]}><cylinderGeometry args={[30,30,22,24]}/><meshStandardMaterial color={selected?"#d8ef96":"#27333b"}/></mesh><Box size={[275,28,120]} position={[0,120,70]} color="#29343b"/>{[-82,0,82].map(x=><Fan key={x} radius={35} position={[x,120,87]} rotation={[Math.PI/2,0,0]}/>) }<mesh position={[-22,60,18]} rotation={[0,0,.12]}><torusGeometry args={[45,3,8,32,Math.PI]}/><meshStandardMaterial color="#6e7e84"/></mesh></group>;
  return <group><Box size={[40,7,40]} position={[0,4,0]} color="#9da9aa" metal={.7}/>{Array.from({length:13},(_,i)=><Box key={i} size={[116,2,62]} position={[0,28+i*8,0]} color={selected?"#d8ef96":"#718286"} metal={.55}/>)}<Box size={[118,118,22]} position={[0,86,43]} color="#202b2f"/><Fan radius={48} position={[0,86,56]} rotation={[Math.PI/2,0,0]}/></group>;
}
function Psu({part,selected}:{part:Part;selected:boolean}){
  const modular=part.modelId==="psu-modular-850"; const [w,h,d]=part.size; return <group><Box size={[w,h,d]} color={modular?"#24273a":"#253431"}/><Fan radius={43} position={[0,h/2+3,0]} rotation={[Math.PI/2,0,0]}/>{Array.from({length:modular?8:4},(_,i)=><Box key={i} size={[16,18,4]} position={[-55+(i%(modular?4:2))*34,-12+Math.floor(i/(modular?4:2))*27,d/2+2]} color={selected?"#d8ef96":"#11191c"}/>)}{modular&&<Box size={[70,3,8]} position={[0,-h/2-2,0]} color="#9d765f"/>}</group>;
}
function Case({part,internal,selected}:{part:Part;internal:boolean;selected:boolean}){
  const arc=part.modelId==="case-arc-a"; const [w,h,d]=part.size; const frame=selected?"#d8ef96":arc?"#35455d":"#334c49"; return <group><Box size={[4,h,d]} position={[-w/2,0,0]} color={frame}/><Box size={[w,4,d]} position={[0,-h/2,0]} color={frame}/><Box size={[w,4,d]} position={[0,h/2,0]} color={frame}/>{[-1,1].flatMap(x=>[-1,1].map(z=><Box key={`${x}${z}`} size={[8,h,8]} position={[x*w/2,0,z*d/2]} color={frame}/>))}<Box size={[w,h,4]} position={[0,0,-d/2]} color={arc?"#4b586e":"#516962"}/>{arc?<><mesh position={[0,0,-d/2-5]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[Math.min(w,h)*.31,7,10,48]}/><meshStandardMaterial color="#9a708f"/></mesh><Fan radius={48} position={[0,95,d/2-5]} rotation={[0,0,0]}/><Fan radius={48} position={[0,-25,d/2-5]} rotation={[0,0,0]}/></>:Array.from({length:9},(_,i)=><Box key={i} size={[w-28,7,3]} position={[0,-h/2+45+i*34,-d/2-4]} color="#213632"/>)}{!internal&&<Box size={[3,h-12,d-12]} position={[w/2+1,0,0]} color="#9cc9c2" transparent opacity={.2}/>}</group>;
}

export function PartModel({part,selected=false,internal=true}:{part:Part;selected?:boolean;internal?:boolean}):ReactNode{
  switch(part.category){
    case"cpu":return <Cpu part={part} selected={selected}/>; case"board":return <Board part={part} selected={selected}/>;
    case"memory":return <Memory part={part} selected={selected}/>; case"gpu":return <Gpu part={part} selected={selected}/>;
    case"ssd":return <Ssd part={part} selected={selected}/>; case"cooler":return <Cooler part={part} selected={selected}/>;
    case"psu":return <Psu part={part} selected={selected}/>; case"case":return <Case part={part} selected={selected} internal={internal}/>;
  }
}
