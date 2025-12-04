export function formatCurrency(num:number){
return new Intl.NumberFormat("en-us",{
  style:"currency",
  currency:"Egp"
}).format(num);


}