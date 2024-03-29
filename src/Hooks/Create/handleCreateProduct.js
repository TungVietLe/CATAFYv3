//firebase
import {db,storage} from '../../firebase/config'
import {setDoc, doc, collection} from 'firebase/firestore'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export const handleCreateProduct = (owningStoreid, productName, productPrice, productImgFile) => {
    const productid = productName.replace(/ /g, '-')

    return new Promise((resolve, reject)=>{
        const productStorageRef = ref(storage, `stores/${owningStoreid}/products/${productName}`)
        const storeDoc = doc(db, 'store collection', owningStoreid)
        const storeProductCol = collection(storeDoc, 'products')
    
        uploadBytes(productStorageRef, productImgFile)
        .then(()=>{
            console.log('product image added to storage!')
            getDownloadURL(productStorageRef)
            .then((url)=>{
                console.log('get url done!')
                const newProduct = {
                owningStoreid: owningStoreid,
                name: productName,
                price: productPrice,
                thumbnailLink: url,
                }
                setDoc(doc(storeProductCol, productid),  newProduct)
                .then(()=>{resolve('product added done!')})
                .catch((error)=>{alert(error)})
            })
            .catch((error)=>{alert(error)})
            })
        .catch((error)=>{alert(error)})
    })
}