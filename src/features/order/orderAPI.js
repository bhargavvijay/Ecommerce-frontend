export function createOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://ecommerce-backend-kyew.onrender.com/orders", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://ecommerce-backend-kyew.onrender.com/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders({ pagination, sort }) {
  let queryString = "";
  if (sort["_sort"]) {
    if(sort.order=="desc")
    sort['_sort']=sort["_sort"].slice(1);    
    
  queryString = `_sort=${sort['_sort']}&_order=${sort['order']}`;

  }
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("https://ecommerce-backend-kyew.onrender.com/orders?" + queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
