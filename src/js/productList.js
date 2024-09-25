export function filterProducts(productList) {
    let filteredList = [];
  
    for(let i = 0;i < productList.length;i++){
      if(i < 4) {
        filteredList.push(productList[i]);
      } else {
        break;
      }
    }
  
    return filteredList;
  }