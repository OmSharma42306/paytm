data = [
      {
         id: 1,
         email: null,
         name: 'alice',
         number: '1111111111',
         password: '$2b$10$TS5R6t/7D2SHOxOnWQJ4lOL0BTyj/xym.AuEOv355p399WO/ndzli'
       }
     ]
let x;
const id = data.map((e)=>{
    x = e.id;
})
console.log("id",x);