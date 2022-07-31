export default(()=>{
  
function addLink(rel,href){
const link = document.createElement('link');
link.rel = rel;
link.href = href;
document.head.appendChild(link); 
return link;
}

addLink('shortcut icon','https://cdn.glitch.com/a66c3f5c-9aba-45c0-952e-ccc59d8b0df3%2FCS1_logo_64.png?v=1564891473540')



})()