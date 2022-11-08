export async function loadData() {
  const response = await fetch('https://dummyjson.com/products')
  console.log('response.status:', response.status)
  if(response.status !== 200){
    return {data: [], status: response.status}
  }
  const storageData = await response.json()
  return {data: storageData.products, status: response.status}
}
