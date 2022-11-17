export function loadData() {
  return fetch('https://dummyjson.com/products')
      .then(response => {
        if(response.status === 404){
            throw new Error(`Request data error with ${response.status} status code`)
        }
        return response.json()
      })
      .then(data => data.products)
      .catch(err => console.log(err))
}
