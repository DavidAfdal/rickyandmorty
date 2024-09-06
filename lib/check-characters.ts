export const CheckStatus = (status:string) => {
   if (status === 'Dead') {
    return "red"
   } else if (status === 'Alive') {
    return "green"
   } else {
     return "neutral"
   }
}