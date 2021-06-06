// import { v4 as uuidv4 } from 'uuid';
export default function getButtonInfo({ ref, path, animtype }) {
  return { 
    path: path,
    dom: ref.current,
    outerHTML: ref.current.outerHTML,
    animtype: animtype
  };
}
// scale10 scale20 scale30 scale40 scale50
