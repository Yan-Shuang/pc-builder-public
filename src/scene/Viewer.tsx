import { Bounds, Html, OrbitControls, useBounds } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Component, useLayoutEffect, type ErrorInfo, type ReactNode } from "react";
import { Vector3 } from "three";
import { categoryLabels, validateBuild } from "../recommender";
import type { Category, Selection } from "../types";
import { planAssembly } from "./assembly";
import { PartModel } from "./PartModels";

class Boundary extends Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}>{
  state={failed:false}; static getDerivedStateFromError(){return{failed:true};}
  componentDidCatch(_error:Error,_info:ErrorInfo){}
  render(){return this.state.failed?this.props.fallback:this.props.children;}
}
function Fit({selectionKey}:{selectionKey:string}){
  const bounds=useBounds(); const camera=useThree(state=>state.camera);
  useLayoutEffect(()=>{const direction=camera.getWorldDirection(new Vector3()).negate();bounds.refresh().clip();const{center,distance}=bounds.getSize();bounds.moveTo(center.clone().addScaledVector(direction,distance)).lookAt({target:center});},[bounds,camera,selectionKey]);
  return null;
}
function Label({category,name,waiting,reason}:{category:Category;name:string;waiting:boolean;reason?:string}){
  return <Html center distanceFactor={10} className="model-label-wrap"><div className={`model-callout ${waiting?"waiting":""}`} title={reason}><b>{categoryLabels[category]}{waiting?" · 待安装":""}</b><span>{name}</span></div></Html>;
}
function Scene({selection,highlight,internal,showLabels}:{selection:Selection;highlight:Category|null;internal:boolean;showLabels:boolean}){
  const placements=planAssembly(selection); const issues=validateBuild(selection);
  return <>
    <ambientLight intensity={1.8}/><hemisphereLight args={["#edf3fa","#515766",1.05]}/><directionalLight position={[6,9,5]} intensity={3.1}/><directionalLight position={[-5,3,-6]} intensity={1.8} color="#b9d2f2"/>
    <OrbitControls makeDefault enablePan minDistance={2.4} maxDistance={18}/>
    <Bounds fit clip observe margin={1.5}><group scale={.01}>
      <group><PartModel part={selection.case} internal={internal} selected={highlight==="case"}/>{showLabels&&<group position={[selection.case.size[0]/2,selection.case.size[1]/2,0]}><Label category="case" name={selection.case.name} waiting={false}/></group>}</group>
      {placements.map(node=><group key={node.category} position={node.position}><PartModel part={node.part} selected={highlight===node.category}/>{showLabels&&<group position={[0,node.part.size[1]/2+25,0]}><Label category={node.category} name={node.part.name} waiting={node.waiting} reason={node.reason}/></group>}</group>)}
    </group><Fit selectionKey={`${Object.values(selection).map(p=>p.id).join("|")}:${issues.map(i=>i.message).join("|")}`}/></Bounds>
  </>;
}
export function Viewer({selection,highlight,view,internal,resetId,showLabels}:{selection:Selection;highlight:Category|null;view:"perspective"|"top";internal:boolean;resetId:number;showLabels:boolean}){
  const fallback=<div className="viewer-fallback"><strong>此浏览器暂时无法显示 WebGL</strong><p>配置清单和规则检查仍可使用。</p></div>;
  return <Boundary fallback={fallback}><div className="viewer-shell"><Canvas key={`${view}-${resetId}`} frameloop="demand" dpr={[1,1.5]} camera={{position:view==="top"?[.001,9,.001]:[7,5,8],fov:38,near:.01,far:40}} fallback={fallback} aria-label="无品牌示意配件的实时三维装配"><Scene selection={selection} highlight={highlight} internal={internal} showLabels={showLabels}/></Canvas></div></Boundary>;
}
