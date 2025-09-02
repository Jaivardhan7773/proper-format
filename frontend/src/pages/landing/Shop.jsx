import products from "../../components/Product.js";
import ProductCard from "../../components/ProductCard.jsx";

const Shop = () => {
    return (
        <>
            <div className="bg-gradient-to-r from-amber-950 to-blue-900 min-h-screen">

                <div className=" mx-2 px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 ">


                    <aside className="bg-white p-4 rounded-xl shadow-md md:col-span-1 max-h-fit  sticky top-2">
                        <h2 className="text-lg font-semibold mb-4">Filters</h2>


                        <div className="mb-6">
                            <h3 className="font-medium mb-2">Category</h3>
                            <ul className="space-y-3">
                                <li><input type="checkbox" className="mr-2" /> Electronics</li>
                                <li><input type="checkbox" className="mr-2" /> Fashion</li>
                                <li><input type="checkbox" className="mr-2" /> Home</li>
                                <li><input type="checkbox" className="mr-2" /> Books</li>
                            </ul>
                        </div>


                        <div className="mb-6">
                            <h3 className="font-medium mb-2">Price</h3>
                            <input type="range" min="0" max="1000" className="w-full" />
                            <p className="text-sm text-gray-500 mt-1">$0 - $1000</p>
                        </div>


                        <div>
                            <h3 className="font-medium mb-2">Ratings</h3>
                            <ul className="space-y-2">
                                <li><input type="radio" name="rating" className="mr-2" /> ⭐⭐⭐⭐⭐</li>
                                <li><input type="radio" name="rating" className="mr-2" /> ⭐⭐⭐⭐ & up</li>
                                <li><input type="radio" name="rating" className="mr-2" /> ⭐⭐⭐ & up</li>
                            </ul>
                        </div>

                        <div className="my-2">
                            <h3 className="font-medium mb-2">Discounts</h3>
                            <ul >
                                <li>10% discount</li>
                                <li>16% discount</li>
                                <li>14% discount</li>
                            </ul>
                        </div>
                    </aside>


                    <main className="md:col-span-3">
                        <h2 className="text-lg text-orange-50 font-bold">Products</h2>
                        <p className="font-light text-orange-50 mb-4">Check each product page for other buying options. Price and other details may vary based on product size and colour.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </main>



                </div>

            </div>
        </>
    )
}

export default Shop