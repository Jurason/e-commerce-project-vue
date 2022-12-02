import axios from "axios";

export const getCoords = async function(query){
    return await axios.get(`https://restcountries.com/v3.1/name/${query}`)
        .then(res => {
            const [lat, lng] = res.data[0].latlng
            return {
                latitude: lat,
                longitude: lng,
                zoom: 6
            }
        })
        .catch(err => console.log(err.message))
}

//        .then(() => {
//             this.setView()
//             if(this.isAlreadyAdded){
//                 return
//             }
//             this.addMarker()
//             this.addTablePosition()
//         })