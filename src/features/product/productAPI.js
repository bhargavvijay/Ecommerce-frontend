export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('https://ecommerce-backend-kyew.onrender.com/products') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      'https://ecommerce-backend-kyew.onrender.com/products/' + update.id,
      {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('https://ecommerce-backend-kyew.onrender.com/products/',{
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    }) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('https://ecommerce-backend-kyew.onrender.com/products/'+id) 
    const data = await response.json()
    resolve({data})
  }
  );
}




export function fetchProductsByFillters({filter,sort,pagination,userType}) {
  let queryString=''
  
  if(filter['brand'])
  {
    if(filter['brand'].length!=0)
    queryString+=`brand=${filter['brand']}&`
  }
  if(filter['category'])
  {
    console.log(filter['category'])
    if(filter['category'].length!=0)
    queryString+=`category=${filter['category']}&`
  }
  if(sort['_sort'])
  {
    let order={'_order':'asc'}
    if(sort['_sort'][0]=='-'){
    order['_order']='desc'   
    sort['_sort']= sort['_sort'].slice(1)
    }    
    queryString+=`_sort=${sort['_sort']}`
    console.log(queryString)
    queryString=queryString+`&_order=${order['_order']}&`
  }
  if(userType=='admin')
  {
    queryString+='admin=true'
  }
  return new Promise(async (resolve) =>{
    const response = await fetch(`https://ecommerce-backend-kyew.onrender.com/products?${queryString}`) 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('https://ecommerce-backend-kyew.onrender.com/categories') 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('https://ecommerce-backend-kyew.onrender.com/brands') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function addBrand(brand) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    console.log("api");
    console.log(brand);
    const response = await fetch('https://ecommerce-backend-kyew.onrender.com/brands/createBrand',{
      method: 'POST',
      body: JSON.stringify(brand),
      headers: { 'content-type': 'application/json' },
    }) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function addCategory(category) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    console.log("api");
    console.log(category);
    const response = await fetch('https://ecommerce-backend-kyew.onrender.com/categories/createCategory',{
      method: 'POST',
      body: JSON.stringify(category),
      headers: { 'content-type': 'application/json' },
    }) 
    const data = await response.json()
    resolve({data})
  }
  );
}