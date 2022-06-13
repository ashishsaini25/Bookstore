import cart from '../models/cart.model';
import Book from '../models/book.model';



export const checkcart=async(userid)=>{
    const  usercart = await cart.findOne({userId:userid})
    console.log("checking cart is present or not",usercart);
    if(usercart){
        return usercart;
    }
    else{
        throw new Error("user cart does not exist");
    }

}
export const addItemToCart=async(userid,_id)=>{
    const book=await  Book.findOne({_id:_id});
   if(book){
       const  usercart = await cart.findOne({userId:userid})
    if(usercart){
        const tempbook={
            bookImage: book.bookImage,
            bookName: book.bookName,
            author:book.author,
            price:book.price,
            quantity:1 
        }
        let currcartbooks=usercart.books;
       let found=false;
        for (var i = 0; i < currcartbooks.length; i++) {
            if (currcartbooks[i].bookName === book.bookName) { 
                found=true;
            }
        }
        if(!found){
        usercart.books.push(tempbook);
        let currTotalPrice=usercart.totalCartPrice+book.price;
        await cart.findOneAndUpdate({userId:userid},{
            books:usercart.books,
            totalCartPrice:currTotalPrice
        });
        const updatedcart=checkcart(userid);
        return updatedcart;
    }
    else{
        throw new Error("This book is already present in the cart");
    }
    }
    else{
        let tempbook={
            bookImage: book.bookImage,
            bookName: book.bookName,
            author:book.author,
            price:book.price, 
            quantity:1
        }
    const newcart={
        userId:userid,
        books:[tempbook],
        totalCartPrice:tempbook.price
    };  
    console.log(newcart+" it the new cart");
    await cart.create(newcart);
    const updatedcart=checkcart(userid);
    return updatedcart;
    }
}
else{
    throw new Error("The book with this id is not present in the store");
}
}


export const removebook=async(userid,_id)=>{
    const book=await  Book.findOne({_id:_id});
    if(book){
        const  usercart = await cart.findOne({userId:userid})
        if(usercart){

            let currcartbooks=usercart.books;
            let found=false;
            for (var i = 0; i < currcartbooks.length; i++) {
                if (currcartbooks[i].bookName === book.bookName) {
                    var spliced = currcartbooks.splice(i, 1);
                    found=true;
                    break;
                }
            }
            console.log(currcartbooks,"remaining books");
            if(found){
                let currTotalPrice=usercart.totalCartPrice-book.price;
                console.log(currTotalPrice);
                await cart.findOneAndUpdate({userId:userid},{
                    books:currcartbooks,
                    totalCartPrice:currTotalPrice
                });
                const updatedcart=checkcart(userid);
                return updatedcart;
            }
            else{
                throw new Error("this book is not present inside  the cart");
            }

        }
        else{
            throw new Error("cart of the user does not exist");
        }
    }
    else{
        throw new Error("The book with this userid is not present in the store");
    }
}


export const updatecart=async(userid,body,_id)=>{
    const  usercart = await cart.findOne({userId:userid})

  
    if(usercart){
        const book=await  Book.findOne({_id:_id});
        if(book){

            let currcartbooks=usercart.books;
            let found=false;
            let currTotalPrice=0;
            for (var i = 0; i < currcartbooks.length; i++) {
                if (currcartbooks[i].bookName === book.bookName) {  

                    if(body.update==="Increase"){
                        currcartbooks[i].quantity=currcartbooks[i].quantity+1;
                        currTotalPrice=usercart.totalCartPrice+book.price;
                        found=true
                    }

                    else if(body.update==="Decrease"){
                        currcartbooks[i].quantity=currcartbooks[i].quantity-1;
                        currTotalPrice=usercart.totalCartPrice-book.price;
                        found=true
                    }
                    break;
                }
            }
            console.log(currcartbooks,"remaining books");
            if(found){
                
                await cart.findOneAndUpdate({userId:userid},{
                    books:currcartbooks,
                    totalCartPrice:currTotalPrice
                });
                const updatedcart=checkcart(userid);
                return updatedcart;
            }
           
            else{
                throw new Error("Enter valid details in body");
            }

        }
        else{
            throw new Error("The book with this userid is not present in the store");
         
        }
    }
    else{
        throw new Error("cart of the user does not exist"); 
    }
}