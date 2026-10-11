import { validateBuild } from "../recommender";
import { categories, type Category, type Part, type Selection, type Vec3 } from "../types";

export type Placement = { category: Category; part: Part; position: Vec3; waiting: boolean; reason?: string };

export function planAssembly(selection: Selection): Placement[] {
  const issues=validateBuild(selection);
  const blocked=new Map<Category,string>();
  for(const issue of issues) for(const category of issue.categories) if(!blocked.has(category)) blocked.set(category,issue.message);
  const casePart=selection.case;
  const baseY=-casePart.size[1]/2+126;
  const installed:Record<Exclude<Category,"case">,Vec3>={
    board:[0,baseY,0], cpu:[-32,baseY+12,-34], memory:[74,baseY+22,-28],
    gpu:[-22,baseY+58,72], ssd:[-48,baseY+13,62], cooler:[-32,baseY+30,-34],
    psu:[0,-casePart.size[1]/2+62,casePart.size[2]/2-92]
  };
  let waitingIndex=0;
  return categories.filter((category):category is Exclude<Category,"case">=>category!=="case").map(category=>{
    const reason=blocked.get(category); const waiting=Boolean(reason);
    const position:Vec3=waiting?[casePart.size[0]/2+185,-casePart.size[1]/2+70+waitingIndex++*88,-casePart.size[2]/2+55]:installed[category];
    return {category,part:selection[category],position,waiting,...(reason?{reason}:{})};
  });
}
