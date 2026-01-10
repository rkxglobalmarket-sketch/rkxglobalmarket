import Header from "../../User/pages/components/Header"
import React, { useMemo, useState } from "react"
import { FxPairRow } from "../components/FxPairRow";
import Products from "../data/Products.json"

interface Product {
    id: number;
    symbol: string;
    imageUrl: string;
    yahooSymbol: string;
}

function Search() {
    const [searchTerm, setSearchTerm] = useState("");

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) {
            return [];
        }
        return Products.filter((product: Product) =>
            product.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div>
            <Header label="Search" to="/terminal/market" />
            <div className="p-2">
                <input
                    type="text"
                    placeholder="Search Products..."
                    className="w-full p-2 border-2 border-gray-300 rounded-md outline-none focus:border-black"
                    value={searchTerm}
                    onChange={handler}
                />
            </div>
            <div className="p-2">
                {(
                    searchResults.map((product: Product) => (
                        <FxPairRow
                            showPrice={false}
                            imageUrl={product.imageUrl}
                            key={product.id}
                            symbol={product.symbol}
                            price={0.66119}
                            changePercent={-0.47}
                            yahooChartUrl={product.yahooSymbol}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Search
