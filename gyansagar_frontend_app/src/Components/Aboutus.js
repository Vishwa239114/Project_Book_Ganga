import './Aboutus.css';

let Aboutus=()=>{


    return(
        <div>
            <div style={{"marginTop":"50px"}} >
            <h2 style={{"color":"blue"}}  > ABOUT US</h2>
            <p style={{"fontSize":"18px","textAlign":"justify","color":"black"}} >
                    Our  platform  allows users to view  all books by languages, authors and categories.
                    Another difficulty for book lovers is that they often cannot find the books they want in bookstores and he/she has to visit
                    all the stores to get a specific book, this site will reduce those efforts. Schools, colleges and libraries needs a platform
                    to buy all the books from one source. This site will help buyers/sellers to buy/sell their books.
                    This whole activity will be taken care virtually. This will provide integrated platform for bulk buyers where they will find all types of book with different offers and discounts based on quantities.
                    Our goal is to provide true and reliable information to buyer community will be fulfilled with the help of online platform.



            </p>
            <a href="/home" style={{"fontSize":"18px","color":"black"}}>Go to Home</a>
            </div> 
        </div>
    )
}
export default Aboutus;